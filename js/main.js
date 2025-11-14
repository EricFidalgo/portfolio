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

  // --- Navbar Hamburger Logic ---
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  // Toggle 'active' class on hamburger and nav-menu when hamburger is clicked.
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close the mobile menu when a navigation link is clicked.
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    })
  );

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
    /**
     * Formats a date string (e.g., "YYYY-MM-DD") into a more readable format ("Month Year").
     * @param {string} dateString - The date string to format.
     * @returns {string} The formatted date.
     */
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      // Adjust for timezone to prevent off-by-one day errors
      date.setUTCDate(date.getUTCDate() + 1);
      return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    };

    // Clear the existing projects before rendering new ones.
    projectsGrid.innerHTML = "";

    // Create a sorted copy of the projects array based on the sort criteria.
    const sortedProjects = [...projectsArray].sort((a, b) => {
      if (sortCriteria === "preference") {
        // Sort by preference number in ascending order.
        return a.preference - b.preference;
      } else {
        // Sort by date in descending order (newest first).
        return new Date(b.date) - new Date(a.date);
      }
    });

    // Create and append a card for each project.
    sortedProjects.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.classList.add("project-card");
      projectCard.innerHTML = `
        <div class="project-card-content">
            <p class="project-card-date">${
              project.displayDate
                ? project.displayDate
                : formatDate(project.date)
            }</p>
            <h3>${project.title}</h3>
            <p class="project-card-description">${project.description}</p>
            <p class="technologies">${project.technologies}</p>
            <a href="${
              project.link
            }" class="btn btn-primary project-link">View Details</a>
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
