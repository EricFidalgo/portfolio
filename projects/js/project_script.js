document.addEventListener("DOMContentLoaded", () => {
  // --- Dynamic Page Content Generation ---
  const generateProjectPage = () => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("id");

    if (!projectId || !projectsData[projectId]) {
      // Handle project not found
      document.getElementById("project-title").innerText = "Project Not Found";
      document.getElementById("project-main-content").innerHTML =
        '<p>The project you are looking for does not exist. Please check the URL or <a href="../index.html#projects">return to the projects list</a>.</p>';
      return;
    }

    const project = projectsData[projectId];

    // --- Populate Header ---
    document.title = `${project.title} - Eric Fidalgo`;
    document.getElementById("project-title").innerText = project.title;
    document.getElementById("project-meta").innerText = project.meta;

    // --- Build Main Content ---
    const mainContent = document.getElementById("project-main-content");
    let contentHtml = "";

    // Project Content Blocks (Sections and Images)
    const contentSource = project.contentBlocks || project.sections;
    if (contentSource) {
      contentSource.forEach((block) => {
        // Default to 'section' type if not specified, for backward compatibility
        const type = block.type || "section";

        if (type === "section") {
          // Wrap content in a <p> tag if it's not a list, otherwise use a div.
          const contentWrapper = block.content.trim().startsWith("<ul>")
            ? `<div>${block.content}</div>`
            : `<p>${block.content}</p>`;
          const extraClass = block.className ? ` ${block.className}` : "";
          contentHtml += `
            <section class="project-section${extraClass}">
              <h2>${block.title}</h2>
              ${contentWrapper}
            </section>`;
        } else if (type === "image") {
          contentHtml += `<img src="${block.src}" alt="${block.alt}" class="project-image">`;
        } else if (
          type === "slideshow" &&
          block.slides &&
          block.slides.length > 0
        ) {
          const slidesHtml = block.slides
            .map((slide) => {
              if (slide.type === "video") {
                return `
                  <div class="slide">
                    <div class="video-container" id="videoContainer-${slide.videoId}">
                      <img src="https://img.youtube.com/vi/${slide.videoId}/maxresdefault.jpg" alt="Video Thumbnail" class="video-thumbnail" />
                      <div class="play-button"></div>
                    </div>
                  </div>`;
              }
              return `<div class="slide"><img src="${slide.src}" alt="${slide.alt}" /></div>`;
            })
            .join("");

          const dotsHtml = block.slides
            .map(
              (_, index) =>
                `<span class="dot ${
                  index === 0 ? "active" : ""
                }" onclick="currentSlide(${index + 1})"></span>`
            )
            .join("");

          contentHtml += `
            <div class="slideshow-container">
              <div class="slides-wrapper">${slidesHtml}</div>
              <button class="prev" onclick="changeSlide(-1)">❮</button>
              <button class="next" onclick="changeSlide(1)">❯</button>
              <div class="dots">${dotsHtml}</div>
            </div>`;
        }
      });
    }

    // Deprecated properties check
    if (project.slides) {
      console.warn(
        "The 'slides' property at the root of the project is deprecated. Please move it into a 'slideshow' block inside 'contentBlocks'."
      );
    }
    if (project.extraImages) {
      console.warn(
        "The 'extraImages' property is deprecated. Please move images into the 'contentBlocks' array."
      );
    }

    // Tools Used
    if (project.tools && project.tools.length > 0) {
      const toolsHtml = project.tools
        .map((tool) => `<li>${tool}</li>`)
        .join("");
      contentHtml += `
        <section class="project-section">
          <h2>Tools Used</h2>
          <ul class="tool-list">${toolsHtml}</ul>
        </section>`;
    }

    // Project Files / Download Section
    if (project.repoName) {
      const repoUrl = `https://github.com/EricFidalgo/${project.repoName}`;
      contentHtml += `
        <section class="project-section download-section">
          <h2>Project Files</h2>
          <div class="download-buttons">
            <a href="${repoUrl}/archive/refs/heads/main.zip" class="btn btn-primary" download>Download ZIP</a>
            <a href="${repoUrl}" class="btn btn-secondary" target="_blank">View on GitHub</a>
          </div>
          <div class="clone-section">
            <p>Or clone the repository:</p>
            <div class="clone-command-container">
              <pre><code>git clone ${repoUrl}.git</code></pre>
              <button class="copy-btn" title="Copy to clipboard"><i class="far fa-copy"></i></button>
            </div>
          </div>
        </section>`;
    }

    mainContent.innerHTML = contentHtml;
  };

  // Generate the page content first
  generateProjectPage();

  // --- Navbar Hamburger Logic ---
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      if (hamburger) {
        hamburger.classList.remove("active");
      }
      if (navMenu) {
        navMenu.classList.remove("active");
      }
    })
  );

  // --- Slideshow & Video Player Logic ---
  let slideIndex = 1;
  const slidesWrapper = document.querySelector(".slides-wrapper");

  // Exit if slideshow doesn't exist on the page
  if (!slidesWrapper) {
    // We still need the copy to clipboard logic to run
  } else {
    // Function to show a specific slide
    window.showSlides = function (n) {
      const slides = document.getElementsByClassName("slide");
      const dots = document.getElementsByClassName("dot");

      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }

      // Update dots
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
      }
      if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add("active");
      }

      // Move the slides wrapper
      if (slidesWrapper) {
        slidesWrapper.style.transform = `translateX(-${
          (slideIndex - 1) * 100
        }%)`;
      }
    };

    // Next/previous controls
    window.changeSlide = function (n) {
      showSlides((slideIndex += n));
    };

    // Thumbnail image controls
    window.currentSlide = function (n) {
      showSlides((slideIndex = n));
    };

    // Initialize the first slide
    if (document.querySelector(".slideshow-container")) {
      showSlides(slideIndex);
    }
  } // End of slideshow-related logic block

  // Video click handler
  // Use querySelectorAll to handle multiple video containers if they exist
  const videoContainers = document.querySelectorAll(".video-container");
  videoContainers.forEach((container) => {
    container.addEventListener("click", function () {
      // Get the video ID from the thumbnail image source
      const img = this.querySelector("img");
      if (!img) return; // Exit if img is already gone

      const videoUrl = img.src.match(/vi\/([^\/]+)\//);
      if (videoUrl && videoUrl[1]) {
        // Use the unique ID from the container
        const videoId = videoUrl[1];
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        iframe.title = "Project Video";
        iframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        iframe.style.width = "100%";
        iframe.style.height = "100%";

        this.innerHTML = "";
        this.appendChild(iframe);
      }
    });
  });

  // --- Copy to Clipboard Logic for Clone Command ---
  const allCopyButtons = document.querySelectorAll(".copy-btn");

  allCopyButtons.forEach((copyButton) => {
    copyButton.addEventListener("click", () => {
      // Find the <pre> element within the same container
      const commandContainer = copyButton.closest(".clone-command-container");
      const commandElement = commandContainer.querySelector("code");

      if (commandElement) {
        navigator.clipboard
          .writeText(commandElement.innerText)
          .then(() => {
            const originalTitle = copyButton.title;

            copyButton.classList.add("copied");
            copyButton.title = "Copied!";

            setTimeout(() => {
              copyButton.classList.remove("copied");
              copyButton.title = originalTitle;
            }, 2000);
          })
          .catch((err) => console.error("Failed to copy text: ", err));
      }
    });
  });
});
