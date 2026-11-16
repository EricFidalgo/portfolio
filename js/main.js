/* main.js */
document.addEventListener("DOMContentLoaded", () => {
  // --- Set Viewport Height CSS Variable ---
  // Fallback for browsers that don't support dvh units. This fixes the 100vh
  // issue on mobile browsers where the address bar causes a jump.
  const setViewportHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };
  setViewportHeight(); // Set it on initial load
  window.addEventListener("resize", setViewportHeight); // Reset on resize

  // --- Project Sorting and Rendering Logic ---
  const projectsGrid = document.querySelector(".projects-grid");
  const sortPreferenceBtn = document.getElementById("sort-preference");
  const sortDateBtn = document.getElementById("sort-date");

  // Convert the projectsData object into an array for sorting and iteration
  // and add the 'link' property for the main page display.
  const projectsArray = Object.entries(projectsData).map(([id, project]) => ({
    id,
    link: `./projects/project.html?id=${id}`,
    // Join the 'tools' array with a pipe separator
    technologies: project.tools ? project.tools.join(" · ") : "",
    ...project, // Spread the rest of the project properties (title, description, date, preference, etc.)
  }));

  /**
   * Renders the projects into the projects-grid container.
   * @param {string} sortCriteria - The criteria to sort projects by ('preference' or 'date').
   */
  const renderProjects = (sortCriteria) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      date.setUTCDate(date.getUTCDate() + 1);
      return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    };

    // --- Helper function to automatically grab an image or YouTube thumbnail ---
    const getThumbnailUrl = (project) => {
  // 1. Prioritize your explicitly defined thumbnail
  if (project.thumbnail) return project.thumbnail;
  
  // 2. Fallback to auto-finding an image if a thumbnail isn't provided
  if (project.contentBlocks) {
    for (let block of project.contentBlocks) {
      if (block.type === "image" && block.src) return block.src;
      if (block.type === "slideshow" && block.slides) {
        for (let slide of block.slides) {
          if (slide.type === "image" && slide.src) return slide.src;
          if (slide.type === "video" && slide.videoId) return `https://img.youtube.com/vi/${slide.videoId}/maxresdefault.jpg`;
        }
      }
    }
  }
  return "images/logo.ico"; 
};

    projectsGrid.innerHTML = "";

    const sortedProjects = [...projectsArray].sort((a, b) => {
      if (sortCriteria === "preference") return a.preference - b.preference;
      return new Date(b.date) - new Date(a.date);
    });

    sortedProjects.forEach((project, index) => {
      const projectCard = document.createElement("div");
      projectCard.classList.add("project-card");
      
      // Make the very first project a massive Featured Card
      if (index === 0) {
        projectCard.classList.add("featured-project");
      }

      // Extract image and adjust the path so index.html can find it inside the projects folder
      let thumbSrc = getThumbnailUrl(project);
      if (thumbSrc.startsWith("./images/")) {
        thumbSrc = "projects" + thumbSrc.substring(1); 
      }

      projectCard.innerHTML = `
        <div class="project-card-image">
            <img src="${thumbSrc}" alt="${project.title} Thumbnail" loading="lazy">
        </div>
        <div class="project-card-content">
            <p class="project-card-date">${project.displayDate ? project.displayDate : formatDate(project.date)}</p>
            <h3>${project.title}</h3>
            <p class="project-card-description">${project.description}</p>
            <p class="technologies">${project.technologies}</p>
            <a href="${project.link}" class="btn btn-primary project-link">View Details</a>
        </div>
      `;
      projectsGrid.appendChild(projectCard);
    });
  };

  // --- Event Listeners for Sort Buttons ---
  sortPreferenceBtn.addEventListener("click", () => {
    renderProjects("preference");
    sortPreferenceBtn.classList.add("active");
    sortDateBtn.classList.remove("active");
  });

  sortDateBtn.addEventListener("click", () => {
    renderProjects("date");
    sortDateBtn.classList.add("active");
    sortPreferenceBtn.classList.remove("active");
  });

  // Initial render of projects, sorted by preference.
  renderProjects("preference");
});
