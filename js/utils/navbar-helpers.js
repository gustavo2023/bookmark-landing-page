export const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

export const showWhiteLogo = (logoColored, logoWhite) => {
  if (window.innerWidth < 768) {
    logoColored?.classList.add("hidden");
    logoWhite?.classList.remove("hidden");
  }
};

export const showColoredLogo = (logoColored, logoWhite) => {
  logoWhite?.classList.add("hidden");
  logoColored?.classList.remove("hidden");
};
