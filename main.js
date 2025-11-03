document.addEventListener("DOMContentLoaded", () => {
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
    // Join the 'tools' array into a comma-separated string for display on the main page
    technologies: project.tools ? project.tools.join(", ") : "", // Renamed from 'technologies' to 'tools' for consistency
    ...project, // Spread the rest of the project properties (title, description, date, preference, etc.)
  }));

  /**
   * Renders the projects into the projects-grid container.
   * @param {string} sortCriteria - The criteria to sort projects by ('preference' or 'date').
   */
  const renderProjects = (sortCriteria) => {
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
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <p class="technologies"><strong>Tools:</strong> ${project.technologies}</p>
                    <a href="${project.link}" class="btn btn-primary project-link">View Project</a>
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
