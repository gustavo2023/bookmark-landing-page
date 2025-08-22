import { prefersReducedMotion } from "../utils/motion.js";

// Config: set true to allow multiple panels open simultaneously
const ALLOW_MULTIPLE = false;

// Expand a panel (height animation unless reduced motion)
const expand = (trigger, panel) => {
  trigger.setAttribute("aria-expanded", "true");
  panel.hidden = false;
  // Visual state
  const icon = trigger.querySelector('.faq-icon');
  icon?.classList.add('rotate-180','text-red-500');

  if (prefersReducedMotion()) {
    panel.style.height = "auto";
    return;
  }

  panel.style.height = "0px";
  void panel.offsetHeight; // reflow
  const target = panel.scrollHeight;
  panel.style.height = target + "px";
  panel.addEventListener(
    "transitionend",
    (e) => {
      if (e.target !== panel) return;
      panel.style.height = "auto";
    },
    { once: true }
  );
};

// Collapse a panel
const collapse = (trigger, panel) => {
  trigger.setAttribute("aria-expanded", "false");
  trigger.classList.remove('text-red-500');
  const icon = trigger.querySelector('.faq-icon');
  icon?.classList.remove('rotate-180','text-red-500');

  if (prefersReducedMotion()) {
    panel.hidden = true;
    panel.style.height = "";
    return;
  }

  const current = panel.scrollHeight;
  panel.style.height = current + "px";
  void panel.offsetHeight;
  panel.style.height = "0px";
  panel.addEventListener(
    "transitionend",
    (e) => {
      if (e.target !== panel) return;
      panel.hidden = true;
      panel.style.height = "";
    },
    { once: true }
  );
};

// Toggle a single item
const toggle = (trigger) => {
  const expanded = trigger.getAttribute("aria-expanded") === "true";
  const panelId = trigger.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;
  if (!panel) return;

  if (expanded) {
    collapse(trigger, panel);
  } else {
    if (!ALLOW_MULTIPLE) {
      const root = trigger.closest("#faq-accordion");
      root
        ?.querySelectorAll('.faq-trigger[aria-expanded="true"]')
        .forEach((openTrigger) => {
          if (openTrigger === trigger) return;
          const otherId = openTrigger.getAttribute("aria-controls");
          const otherPanel = otherId ? document.getElementById(otherId) : null;
          if (otherPanel) collapse(openTrigger, otherPanel);
        });
    }
    expand(trigger, panel);
  }
};

export const initFaqAccordion = () => {
  const container = document.getElementById("faq-accordion");
  if (!container) return;

  const triggers = container.querySelectorAll(".faq-trigger");
  triggers.forEach((btn) => {
    btn.setAttribute("aria-expanded", "false");
    const id = btn.getAttribute("aria-controls");
    const panel = id ? document.getElementById(id) : null;
    if (panel) {
      panel.hidden = true;
  panel.style.height = "0px";
    }
  });

  container.addEventListener("click", (e) => {
    const trigger = e.target.closest(".faq-trigger");
    if (!trigger || !container.contains(trigger)) return;
    toggle(trigger);
  });

  container.addEventListener("keydown", (e) => {
    if (e.key !== " " && e.key !== "Enter") return;
    const trigger = e.target.closest(".faq-trigger");
    if (!trigger) return;
    e.preventDefault();
    toggle(trigger);
  });
};
