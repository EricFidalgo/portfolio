/* nav.js: the phone menu button, shared by every page with the navbar. */
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".hamburger");
  const menu = document.querySelector(".nav-menu");
  if (!button || !menu) return;

  const setOpen = (open) => {
    button.classList.toggle("active", open);
    menu.classList.toggle("active", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  button.addEventListener("click", () => {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });

  // Close the menu after a link is tapped.
  menu.querySelectorAll(".nav-link").forEach((link) =>
    link.addEventListener("click", () => setOpen(false))
  );

  // Escape closes the menu and puts focus back on the button.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      button.focus();
    }
  });
});
