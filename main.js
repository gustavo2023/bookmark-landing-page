// DOM elements
const body = document.body;
const openMenuButton = document.getElementById("mobile-menu-toggle");
const closeMenuButton = document.getElementById("close-mobile-menu");
const mainNav = document.getElementById("main-nav");
const logoColored = document.getElementById("logo-colored");
const logoWhite = document.getElementById("logo-white");

// Logo functions
const showWhiteLogo = () => {
  if (window.innerWidth < 768) {
    logoColored?.classList.add("hidden");
    logoWhite?.classList.remove("hidden");
  }
};

const showColoredLogo = () => {
  logoWhite?.classList.add("hidden");
  logoColored?.classList.remove("hidden");
};

// Helpers
const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

const syncNavA11y = () => {
  const desktop = isDesktop();
  const isOpen = openMenuButton.getAttribute("aria-expanded") === "true";
  if (desktop || isOpen) {
    mainNav.removeAttribute("inert");
    mainNav.setAttribute("aria-hidden", "false");
  } else {
    mainNav.setAttribute("inert", "");
    mainNav.setAttribute("aria-hidden", "true");
  }
};

// Navigation functions
const openNavbar = () => {
  mainNav.classList.remove(
    "opacity-0",
    "pointer-events-none",
    "-translate-y-2"
  );
  mainNav.classList.add("opacity-90", "pointer-events-auto", "translate-y-0");
  body.classList.add("overflow-hidden");

  openMenuButton.setAttribute("aria-expanded", "true");
  openMenuButton.classList.add("invisible");

  showWhiteLogo();
  closeMenuButton.focus();

  syncNavA11y();
};

const closeNavbar = () => {
  openMenuButton.classList.remove("invisible");
  openMenuButton.setAttribute("aria-expanded", "false");
  openMenuButton.focus();

  syncNavA11y();

  mainNav.classList.remove(
    "opacity-90",
    "pointer-events-auto",
    "translate-y-0"
  );
  mainNav.classList.add("opacity-0", "pointer-events-none", "-translate-y-2");
  body.classList.remove("overflow-hidden");

  showColoredLogo();
};

const handleResize = () => {
  if (isDesktop()) {
    // Ensure desktop is always usable and mobile overlay isn't "stuck open"
    showColoredLogo();
    body.classList.remove("overflow-hidden");
    mainNav.classList.remove(
      "opacity-90",
      "pointer-events-auto",
      "translate-y-0"
    );
    mainNav.classList.add("opacity-0", "pointer-events-none", "-translate-y-2");
    openMenuButton.classList.remove("invisible");
    openMenuButton.setAttribute("aria-expanded", "false");
  }
  syncNavA11y();
};

// Event listeners
mainNav.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && window.innerWidth < 768) closeNavbar();
});

openMenuButton.addEventListener("click", openNavbar);
closeMenuButton.addEventListener("click", closeNavbar);
window.addEventListener("resize", handleResize);
syncNavA11y();
