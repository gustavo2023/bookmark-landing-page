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
  mainNav.setAttribute("aria-hidden", "false");
  showWhiteLogo();
};

const closeNavbar = () => {
  mainNav.classList.remove(
    "opacity-90",
    "pointer-events-auto",
    "translate-y-0"
  );
  mainNav.classList.add("opacity-0", "pointer-events-none", "-translate-y-2");
  body.classList.remove("overflow-hidden");
  openMenuButton.setAttribute("aria-expanded", "false");
  openMenuButton.classList.remove("invisible");
  mainNav.setAttribute("aria-hidden", "true");
  showColoredLogo();
};

// Event listeners
mainNav.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && window.innerWidth < 768) closeNavbar();
});

openMenuButton.addEventListener("click", openNavbar);
closeMenuButton.addEventListener("click", closeNavbar);
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    showColoredLogo();
  }
});
