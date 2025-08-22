import {
  prefersReducedMotion,
  findCurrentTab,
  getPanelForTab,
  applyTabSelection,
  computeNextIndex,
  animateOut,
  animateIn,
  focusTab,
} from "../utils/feature-tabs-helpers.js";

export const initFeaturesTabs = () => {
  const tablist = document.getElementById("features-tabs");
  if (!tablist) return;

  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  if (!tabs.length) return;

  const reduceMotion = prefersReducedMotion();

  const activate = (nextTab) => {
    if (!nextTab || nextTab.getAttribute("aria-selected") === "true") return;

    const currentTab = findCurrentTab(tabs);
    const oldPanel = getPanelForTab(currentTab);
    const newPanel = getPanelForTab(nextTab);
    if (!newPanel) return;

    applyTabSelection(tabs, nextTab, newPanel);

    if (reduceMotion) {
      if (oldPanel && oldPanel !== newPanel) oldPanel.hidden = true;
      newPanel.hidden = false;
      focusTab(nextTab);
      return;
    }

    if (oldPanel && oldPanel !== newPanel) animateOut(oldPanel);
    animateIn(newPanel);

    focusTab(nextTab);
  };

  // Click delegation for all tabs
  tablist.addEventListener("click", (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab || !tablist.contains(tab)) return;
    activate(tab);
  });

  // Keyboard navigation
  tablist.addEventListener("keydown", (e) => {
    const currentIndex = tabs.findIndex(
      (t) => t.getAttribute("aria-selected") === "true"
    );
    if (currentIndex === -1) return;
    const nextIndex = computeNextIndex(currentIndex, e.key, tabs.length);
    if (nextIndex == null) return;
    e.preventDefault();
    activate(tabs[nextIndex]);
  });
};
