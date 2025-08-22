export const prefersReducedMotion = () => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const findCurrentTab = (tabs) => {
  return tabs.find((t) => t.getAttribute("aria-selected") === "true") || null;
};

export const getPanelForTab = (tab) => {
  if (!tab) return null;
  const id = tab.getAttribute("aria-controls");
  return id ? document.getElementById(id) : null;
};

export const applyTabSelection = (tabs, newActiveTab, newPanel) => {
  tabs.forEach((t) => {
    const selected = t === newActiveTab;
    t.setAttribute("aria-selected", String(selected));
    t.tabIndex = selected ? 0 : -1;
    if (selected && newPanel) newPanel.setAttribute("aria-labelledby", t.id);
  });
};

export const computeNextIndex = (currentIndex, key, length) => {
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
      return (currentIndex + 1) % length;
    case "ArrowLeft":
    case "ArrowUp":
      return (currentIndex - 1 + length) % length;
    case "Home":
      return 0;
    case "End":
      return length - 1;
    default:
      return null;
  }
};

// Immediate hide of previous panel
export const animateOut = (oldPanel) => {
  if (!oldPanel) return;
  oldPanel.hidden = true;
};

// Simple enter: appear from slight X offset & fade in
export const animateIn = (newPanel) => {
  if (!newPanel) return;

  newPanel.hidden = false;

  if (prefersReducedMotion()) return; // show instantly

  newPanel.classList.add("opacity-0", "translate-x-4");

  requestAnimationFrame(() => {
    newPanel.classList.remove("opacity-0", "translate-x-4");
    newPanel.classList.add("opacity-100", "translate-x-0");
  });
};

export const focusTab = (tab) => {
  if (tab) tab.focus();
};
