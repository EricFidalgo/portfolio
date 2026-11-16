// globe.js: the Dynamic Portfolio globe.
// MapLibre globe with OpenFreeMap tiles (#12), painted from css/theme.css (#13),
// slow auto-turn and fly-to (#15), target pins (#16) and one terminal window (#17).
// Pin text lives in js/pins-data.js.
(function () {
  "use strict";

  const TILES_URL = "https://tiles.openfreemap.org/planet"; // free, no key; terms on issue #12
  const IDLE_MS = 5000; // auto-turn starts after this long with no touch
  const TURN_DEG_PER_SEC = 4;
  const FLY_ZOOM = 3;
  const MAX_ZOOM = 6;
  const TYPE_MS_PER_CHAR = 16;
  const TYPE_PAUSE_MS = 110; // between lines
  const TILE_SIZE = 512; // MapLibre's world size at zoom 0

  const pins = window.GLOBE_PINS || [];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // ---------- Colours (#13): read the theme variables, never hard-code them ----------

  const css = getComputedStyle(document.documentElement);
  const theme = {
    bright: css.getPropertyValue("--green-bright").trim(),
    dim: css.getPropertyValue("--green-dim").trim(),
    black: css.getPropertyValue("--hack-black").trim(),
  };

  // Any CSS colour (hex, rgb(), a name) to [r, g, b], resolved by the browser itself.
  function toRgb(color) {
    const probe = document.createElement("i");
    probe.style.color = color;
    document.body.appendChild(probe);
    const rgb = getComputedStyle(probe).color.match(/[\d.]+/g).slice(0, 3).map(Number);
    probe.remove();
    return rgb;
  }

  // Mix two theme colours: share = how much of `a` to keep (0..1).
  function mix(a, b, share) {
    const ca = toRgb(a);
    const cb = toRgb(b);
    const c = ca.map((v, i) => Math.round(v * share + cb[i] * (1 - share)));
    return "rgb(" + c.join(",") + ")";
  }

  // Land is the dim green pushed halfway towards black, so the bright borders stand out.
  const land = mix(theme.dim, theme.black, 0.5);

  // OpenMapTiles has no land layer: the background is land and the water layer paints the ocean.
  // No symbol layers and no glyphs, so no text label can ever show.
  const style = {
    version: 8,
    projection: { type: "globe" },
    sources: {
      openmaptiles: { type: "vector", url: TILES_URL },
    },
    layers: [
      { id: "land", type: "background", paint: { "background-color": land } },
      {
        id: "ocean",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "water",
        filter: ["!=", ["get", "brunnel"], "tunnel"],
        paint: { "fill-color": theme.black, "fill-antialias": true },
      },
      {
        id: "coast",
        type: "line",
        source: "openmaptiles",
        "source-layer": "water",
        filter: ["==", ["get", "class"], "ocean"],
        paint: {
          "line-color": theme.dim,
          "line-width": ["interpolate", ["linear"], ["zoom"], 0, 0.4, 6, 1],
        },
      },
      {
        id: "borders",
        type: "line",
        source: "openmaptiles",
        "source-layer": "boundary",
        filter: ["all", ["==", ["get", "admin_level"], 2], ["!=", ["get", "maritime"], 1]],
        layout: { "line-join": "round" },
        paint: {
          "line-color": theme.bright,
          "line-width": ["interpolate", ["linear"], ["zoom"], 0, 0.5, 6, 1.2],
        },
      },
    ],
  };

  // ---------- Terminal window (#17) ----------

  const term = (function () {
    const el = document.getElementById("term");
    const titleEl = document.getElementById("term-title");
    const bodyEl = document.getElementById("term-body");
    const closeBtn = document.getElementById("term-close");
    let run = 0; // bumps on every open, close or skip so an old typing loop stops
    let opener = null;
    let onClose = null;
    let lines = []; // { el, out, text }: out is the node the text is typed into
    let typed = 0; // lines fully typed so far

    // Every line goes in at full length first, so the window opens at its final size
    // and does not grow while it types.
    function addLine(block, cls, text, href) {
      const p = document.createElement("p");
      p.className = "term-line term-waiting " + cls;
      let out = p;
      if (href) {
        out = document.createElement("a");
        out.href = href;
        out.target = "_blank";
        out.rel = "noopener";
        p.appendChild(out);
      }
      out.textContent = text;
      block.appendChild(p);
      lines.push({ el: p, out: out, text: text });
    }

    function build(pin) {
      bodyEl.textContent = "";
      lines = [];
      typed = 0;
      pin.blocks.forEach(function (data) {
        const block = document.createElement("div");
        block.className = "term-block";
        bodyEl.appendChild(block);
        addLine(block, "term-heading", data.heading);
        data.lines.forEach(function (t) {
          addLine(block, "term-text", t);
        });
        if (data.link) addLine(block, "term-link", data.link.text, data.link.href);
      });
    }

    // Ends typing (or skips it): every line at full text, sizes free to reflow again.
    function showAll() {
      run++;
      lines.forEach(function (line) {
        line.out.textContent = line.text;
        line.el.classList.remove("term-waiting", "term-cursor");
        line.el.style.minHeight = "";
      });
      typed = lines.length;
      // While typing, aria-busy tells screen readers to wait for the finished text.
      bodyEl.setAttribute("aria-busy", "false");
    }

    function typeLine(myRun) {
      if (myRun !== run) return;
      if (typed >= lines.length) {
        showAll();
        return;
      }
      const line = lines[typed];
      line.el.classList.remove("term-waiting");
      line.el.classList.add("term-cursor");
      line.el.scrollIntoView({ block: "nearest" });
      let i = 0;
      (function tick() {
        if (myRun !== run) return;
        i++;
        line.out.textContent = line.text.slice(0, i);
        if (i < line.text.length) {
          setTimeout(tick, TYPE_MS_PER_CHAR);
          return;
        }
        line.el.classList.remove("term-cursor");
        typed++;
        setTimeout(function () {
          typeLine(myRun);
        }, TYPE_PAUSE_MS);
      })();
    }

    function open(pin, fromEl) {
      opener = fromEl || null;
      titleEl.textContent = pin.title;
      build(pin);
      el.hidden = false;
      document.body.classList.add("term-open");
      closeBtn.focus({ preventScroll: true });
      bodyEl.scrollTop = 0;
      if (reducedMotion.matches) {
        showAll();
        return;
      }
      // Lock each line at its full height, then empty it for typing.
      lines.forEach(function (line) {
        line.el.style.minHeight = line.el.offsetHeight + "px";
        line.out.textContent = "";
      });
      bodyEl.setAttribute("aria-busy", "true");
      run++;
      typeLine(run);
    }

    function close() {
      if (el.hidden) return;
      run++;
      el.hidden = true;
      document.body.classList.remove("term-open");
      if (onClose) onClose();
      if (opener && opener.isConnected) opener.focus({ preventScroll: true });
      opener = null;
    }

    closeBtn.addEventListener("click", close);
    // Tap the text to skip the typing.
    bodyEl.addEventListener("click", function (e) {
      if (typed < lines.length && !e.target.closest("a")) showAll();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    return {
      rect: function () {
        return el.getBoundingClientRect();
      },
      open: open,
      close: close,
      isOpen: function () {
        return !el.hidden;
      },
      set onClose(fn) {
        onClose = fn;
      },
    };
  })();

  // ---------- Map ----------

  const mapEl = document.getElementById("map");
  const fxEl = document.querySelector(".fx");

  const RAD = Math.PI / 180;

  // The globe's radius on screen in px. MapLibre grows the globe as the centre nears a pole.
  function globeRadius(zoom, lat) {
    return (TILE_SIZE * Math.pow(2, zoom)) / (2 * Math.PI) / Math.cos(lat * RAD);
  }

  // The zoom that fits the whole globe on screen: a radius of 42% of the short side.
  function fitZoom(lat) {
    const short = Math.min(mapEl.clientWidth, mapEl.clientHeight);
    return Math.max(0, Math.log2((short * 0.42) / globeRadius(0, lat)));
  }

  // Start looking at the middle of all the pins (a circular mean, so it copes with the date line).
  function pinsMiddle() {
    if (!pins.length) return [0, 20];
    let x = 0;
    let y = 0;
    let lat = 0;
    pins.forEach(function (pin) {
      x += Math.cos(pin.lngLat[0] * RAD);
      y += Math.sin(pin.lngLat[0] * RAD);
      lat += pin.lngLat[1];
    });
    return [Math.atan2(y, x) / RAD, lat / pins.length];
  }

  const startCenter = pinsMiddle();
  let map;
  try {
    map = new maplibregl.Map({
      container: mapEl,
      style: style,
      center: startCenter,
      zoom: fitZoom(startCenter[1]),
      minZoom: 0,
      maxZoom: MAX_ZOOM,
      maxPitch: 0,
      touchPitch: false,
      dragRotate: false,
      renderWorldCopies: false,
      attributionControl: { compact: true },
      cooperativeGestures: false,
    });
  } catch (err) {
    showFallback();
    return;
  }

  // Keep the halo and radar sweep the same size as the globe on screen (#14).
  function syncFx() {
    const radius = globeRadius(map.getZoom(), map.getCenter().lat);
    fxEl.style.setProperty("--globe-d", Math.round(radius * 2) + "px");
  }
  map.on("move", syncFx);
  map.on("resize", syncFx);
  syncFx();

  // ---------- Auto-turn (#15) ----------

  let idleTimer = null;
  let turning = false;
  let lastFrame = 0;

  function stopTurn() {
    turning = false;
    clearTimeout(idleTimer);
  }

  // Any touch stops the turn; it starts again after IDLE_MS of quiet,
  // unless a pin window is open or the visitor asked for reduced motion.
  function scheduleTurn() {
    stopTurn();
    if (reducedMotion.matches || term.isOpen()) return;
    idleTimer = setTimeout(function () {
      turning = true;
      lastFrame = performance.now();
      requestAnimationFrame(turnFrame);
    }, IDLE_MS);
  }

  function turnFrame(now) {
    if (!turning) return;
    const dt = Math.min(now - lastFrame, 100) / 1000;
    lastFrame = now;
    if (!map.isMoving()) {
      const c = map.getCenter();
      // Earth turns west to east, so the view drifts west.
      map.jumpTo({ center: [c.lng - TURN_DEG_PER_SEC * dt, c.lat] });
    }
    requestAnimationFrame(turnFrame);
  }

  ["pointerdown", "wheel", "touchstart", "keydown"].forEach(function (type) {
    mapEl.addEventListener(type, scheduleTurn, { passive: true });
  });
  map.on("moveend", function (e) {
    if (e.originalEvent) scheduleTurn();
  });
  reducedMotion.addEventListener("change", scheduleTurn);

  // ---------- Pins (#16) and fly-to (#15) ----------

  function coordText(lngLat) {
    const lng = lngLat[0];
    const lat = lngLat[1];
    return (
      Math.abs(lat).toFixed(2) + "°" + (lat >= 0 ? "N" : "S") + " " +
      Math.abs(lng).toFixed(2) + "°" + (lng >= 0 ? "E" : "W")
    );
  }

  const pinButtons = [];

  // Shift the target so the pin lands in the open part of the screen, not under the window.
  function flyOffset() {
    const r = term.rect();
    if (window.innerWidth >= 768) return [-Math.round(r.width / 2), 0];
    return [0, -Math.round(r.height / 2)];
  }

  function openPin(pin, button) {
    stopTurn();
    pinButtons.forEach(function (b) {
      b.setAttribute("aria-expanded", String(b === button));
    });
    term.open(pin, button);
    const view = {
      center: pin.lngLat,
      zoom: Math.max(map.getZoom(), FLY_ZOOM),
      offset: flyOffset(),
      // We handle reduced motion here: MapLibre's own fallback would drop the offset.
      essential: true,
    };
    if (reducedMotion.matches) map.easeTo(Object.assign(view, { duration: 0 }));
    else map.flyTo(Object.assign(view, { duration: 2200 }));
  }

  term.onClose = function () {
    pinButtons.forEach(function (b) {
      b.setAttribute("aria-expanded", "false");
    });
    scheduleTurn();
  };

  pins.forEach(function (pin) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pin";
    button.setAttribute("aria-label", "Open " + pin.place);
    button.setAttribute("aria-controls", "term");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = '<span class="pin-ring"></span><span class="pin-dot"></span>';
    const coords = document.createElement("span");
    coords.className = "pin-coords";
    coords.setAttribute("aria-hidden", "true");
    coords.textContent = coordText(pin.lngLat);
    button.appendChild(coords);

    button.addEventListener("click", function (e) {
      e.stopPropagation();
      openPin(pin, button);
    });

    new maplibregl.Marker({ element: button, anchor: "center" }).setLngLat(pin.lngLat).addTo(map);
    pinButtons.push(button);
  });

  scheduleTurn();

  // ---------- No WebGL: a plain list so the stories still open ----------

  function showFallback() {
    const box = document.createElement("div");
    box.className = "globe-fallback";
    const msg = document.createElement("p");
    msg.textContent = "The globe needs WebGL, which this browser has turned off. The stories are here:";
    box.appendChild(msg);
    pins.forEach(function (pin) {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = pin.place;
      b.addEventListener("click", function () {
        term.open(pin, b);
      });
      box.appendChild(b);
    });
    document.body.insertBefore(box, document.querySelector(".globe-bar"));
    fxEl.hidden = true;
    document.getElementById("globe-hint").hidden = true;
  }
})();
