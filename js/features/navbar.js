// Navbar module: all open/close behavior and listeners
import {
  showWhiteLogo,
  showColoredLogo,
  isDesktop,
} from "../utils/navbar-helpers.js";
import { syncNavA11y } from "../utils/a11y.js";

const body = document.body;
const mainNav = document.getElementById("main-nav");
const openMenuButton = document.getElementById("mobile-menu-toggle");
const closeMenuButton = document.getElementById("close-mobile-menu");
const logoColored = document.getElementById("logo-colored");
const logoWhite = document.getElementById("logo-white");

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

  showWhiteLogo(logoColored, logoWhite);
  closeMenuButton?.focus();

  syncNavA11y({ mainNav, openMenuButton });
};

const closeNavbar = () => {
  openMenuButton.classList.remove("invisible");
  openMenuButton.setAttribute("aria-expanded", "false");
  openMenuButton.focus();

  syncNavA11y({ mainNav, openMenuButton });

  mainNav.classList.remove(
    "opacity-90",
    "pointer-events-auto",
    "translate-y-0"
  );
  mainNav.classList.add("opacity-0", "pointer-events-none", "-translate-y-2");
  body.classList.remove("overflow-hidden");

  showColoredLogo(logoColored, logoWhite);
};

const handleResize = () => {
  if (isDesktop()) {
    // Ensure desktop is always usable and mobile overlay isn't "stuck open"
    showColoredLogo(logoColored, logoWhite);
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
  syncNavA11y({ mainNav, openMenuButton });
};

export const initNavbar = () => {
  // Guard
  const required = { body, mainNav, openMenuButton, closeMenuButton };
  for (const [name, el] of Object.entries(required)) {
    if (!el) throw new Error(`[navbar] Missing required element: ${name}`);
  }

  mainNav.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && window.innerWidth < 768) closeNavbar();
  });

  openMenuButton.addEventListener("click", openNavbar);
  closeMenuButton.addEventListener("click", closeNavbar);
  window.addEventListener("resize", handleResize);

  syncNavA11y({ mainNav, openMenuButton });
};
