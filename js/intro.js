// intro.js: the falling green code behind the welcome box (#6) and its phone care (#11).
// Plain canvas, no library. Colours and font come from css/theme.css.
(() => {
  "use strict";

  // #7, temporary: compare heading fonts with intro.html?font=press or ?font=vt323
  // (default: Orbitron 900). Delete this and the [data-font] rules in intro.css once Eric picks one.
  const HEADING_FONTS = ["press", "vt323"];
  const fontChoice = new URLSearchParams(location.search).get("font");
  if (HEADING_FONTS.includes(fontChoice)) {
    document.documentElement.dataset.font = fontChoice;
  }

  const canvas = document.getElementById("code-rain");
  const ctx = canvas && canvas.getContext("2d");
  if (!ctx) return;

  // Latin letters, numbers and symbols only (no Japanese characters).
  const GLYPHS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+=-<>/\\|{}[]()!?:;";
  const BRIGHT_GLYPHS = 3; // the head plus two glyphs easing into the dim tail
  const MAX_PIXEL_RATIO = 2; // sharp enough on 3x phones at less than half the pixels

  // Phones in portrait or landscape.
  const smallScreen = window.matchMedia("(max-width: 600px), (max-height: 500px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const theme = getComputedStyle(document.documentElement);
  const BRIGHT = theme.getPropertyValue("--green-bright").trim();
  const DIM = theme.getPropertyValue("--green-dim").trim();
  const MONO = theme.getPropertyValue("--hack-mono").trim();

  let drops = []; // one per column slot, left to right
  let rows = 0;
  let cell = 0; // character height in CSS pixels
  let colWidth = 0;
  let fps = 0;
  let rafId = 0;
  let lastFrame = 0;

  const rand = (min, max) => min + Math.random() * (max - min);
  const randomGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

  // Small screens: wider gaps (fewer columns) and a low frame rate. The glyphs move a whole
  // row at a time, so 15 frames a second still looks the same as the desktop's 30.
  function screenSettings() {
    return smallScreen.matches
      ? { fontSize: 14, columnGap: 2, fps: 15 }
      : { fontSize: 16, columnGap: 1.6, fps: 30 };
  }

  // Give a column slot a fresh drop. `wait` keeps many slots empty, which keeps the columns sparse.
  function resetDrop(drop, scatter) {
    drop.trail = Array.from({ length: rand(8, 24) | 0 }, randomGlyph); // trail[0] is the head
    drop.speed = rand(5, 13); // rows per second
    if (scatter) {
      // First paint: spread drops over the whole screen so it is not empty.
      drop.y = rand(0, rows + drop.trail.length);
      drop.wait = Math.random() < 0.45 ? 0 : rand(0, 6);
    } else {
      drop.y = 0;
      drop.wait = Math.random() < 0.4 ? rand(0, 1.5) : rand(2, 7);
    }
    drop.lastRow = Math.floor(drop.y);
    return drop;
  }

  function resize() {
    const settings = screenSettings();
    fps = settings.fps;
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cell = settings.fontSize;
    colWidth = Math.round(settings.fontSize * settings.columnGap); // thin columns, dark gaps
    rows = Math.ceil(height / cell) + 1;

    ctx.font = `${settings.fontSize}px ${MONO}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    drops = Array.from({ length: Math.ceil(width / colWidth) }, () => resetDrop({}, true));
  }

  function update(dt) {
    for (const drop of drops) {
      if (drop.wait > 0) {
        drop.wait -= dt;
        continue;
      }
      drop.y += drop.speed * dt;
      const row = Math.floor(drop.y);
      // Each new row the head enters gets a fresh glyph; the old ones slide down the tail.
      while (drop.lastRow < row) {
        drop.trail.pop();
        drop.trail.unshift(randomGlyph());
        drop.lastRow++;
      }
      // A few tail glyphs flicker to new characters.
      if (Math.random() < 0.3) {
        drop.trail[(Math.random() * drop.trail.length) | 0] = randomGlyph();
      }
      if (drop.y - drop.trail.length > rows) resetDrop(drop, false);
    }
  }

  // Draw trail glyphs [from, to) of every falling drop; alphaFor(i, length) sets each one's fade.
  function drawGlyphs(color, from, to, alphaFor) {
    ctx.fillStyle = color;
    for (let c = 0; c < drops.length; c++) {
      const drop = drops[c];
      if (drop.wait > 0) continue;
      const x = c * colWidth + colWidth / 2;
      const head = Math.floor(drop.y);
      const end = Math.min(to, drop.trail.length);
      for (let i = from; i < end; i++) {
        const row = head - i;
        if (row < 0) break;
        if (row >= rows) continue;
        ctx.globalAlpha = alphaFor(i, drop.trail.length);
        ctx.fillText(drop.trail[i], x, row * cell);
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dim tails, fading out towards the top.
    drawGlyphs(DIM, BRIGHT_GLYPHS, Infinity, (i, length) => Math.max(0.12, 1 - i / length));
    // Bright heads, with the two glyphs behind them easing into the tail.
    drawGlyphs(BRIGHT, 0, BRIGHT_GLYPHS, (i) => (i === 0 ? 1 : 0.75 - i * 0.2));
    ctx.globalAlpha = 1;
  }

  function frame(now) {
    rafId = requestAnimationFrame(frame);
    const elapsed = now - lastFrame;
    if (elapsed < 1000 / fps - 1) return; // hold to the target frame rate
    lastFrame = now;
    update(Math.min(elapsed / 1000, 0.1));
    draw();
  }

  function stop() {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }

  function start() {
    if (reducedMotion.matches) {
      // Reduced motion: one still frame of code, no animation.
      stop();
      draw();
      return;
    }
    if (document.hidden || rafId) return;
    lastFrame = performance.now();
    rafId = requestAnimationFrame(frame);
  }

  // Pause while the tab is hidden; resume where it left off.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  reducedMotion.addEventListener("change", () => {
    stop();
    start();
  });

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      if (reducedMotion.matches) draw();
    }, 150);
  });

  resize();
  start();

  // Canvas text does not trigger a web font download, so ask for it, then redraw the still frame.
  if (document.fonts && document.fonts.load) {
    document.fonts.load(`${cell}px ${MONO}`).then(
      () => {
        if (reducedMotion.matches) draw();
      },
      () => {},
    );
  }
})();
