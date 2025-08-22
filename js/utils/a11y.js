import { isDesktop } from "./helpers.js";

export const syncNavA11y = ({ mainNav, openMenuButton }) => {
  const desktop = isDesktop();
  const isOpen = openMenuButton.getAttribute("aria-expanded") === "true";
  if (desktop || isOpen) {
    mainNav?.removeAttribute("inert");
    mainNav?.setAttribute("aria-hidden", "false");
  } else {
    mainNav?.setAttribute("inert", "");
    mainNav?.setAttribute("aria-hidden", "true");
  }
};
