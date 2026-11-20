const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".links");
const serviceList = document.querySelector("#service-list");
const serviceTabs = document.querySelector("#service-tabs");
const perkList = document.querySelector("#perk-list");

function applyTicketLinks() {
  document.querySelectorAll("[data-ticket-link]").forEach((link) => {
    link.href = ECLIPSE_CONFIG.discordTicketUrl;
  });
  document.querySelectorAll("[data-vouch-link]").forEach((link) => { link.href = ECLIPSE_CONFIG.vouchUrl; });
}

function renderServices(category) {
  const services = ECLIPSE_CONFIG.services.filter((service) => service.category === category);
  serviceList.innerHTML = services.map((service) => `<article class="service-flip reveal-item"><div class="service-flip-inner"><div class="service-flip-face service-flip-front"><h3>${service.name}</h3><span class="tag">${service.tag}</span><p class="service-flip-hint">Hover or hold to reveal price ↗</p></div><div class="service-flip-face service-flip-back"><p>Service price</p><strong class="service-price">${service.price}</strong><a class="service-action" data-ticket-link target="_blank" rel="noopener">Open ticket ↗</a></div><button class="service-flip-toggle" type="button" aria-label="Hold to show price for ${service.name}" aria-expanded="false"></button></div></article>`).join("") || "<p>No services have been added yet.</p>";
  applyTicketLinks();
}

let holdTimer;
let heldToggle;

serviceList.addEventListener("pointerdown", (event) => {
  if (!window.matchMedia("(max-width: 760px), (hover: none), (pointer: coarse)").matches) return;
  const toggle = event.target.closest(".service-flip-toggle");
  if (!toggle || event.target.closest("a")) return;
  heldToggle = toggle;
  holdTimer = window.setTimeout(() => {
    const card = heldToggle?.closest(".service-flip");
    if (!card) return;
    serviceList.querySelectorAll(".service-flip.is-flipped").forEach((openCard) => {
      openCard.classList.remove("is-flipped");
      openCard.querySelector(".service-flip-toggle").setAttribute("aria-expanded", "false");
    });
    card.classList.add("is-flipped");
    heldToggle.setAttribute("aria-expanded", "true");
  }, 450);
});

function cancelCardHold() {
  window.clearTimeout(holdTimer);
  heldToggle = null;
}

serviceList.addEventListener("pointerup", cancelCardHold);
serviceList.addEventListener("pointerleave", cancelCardHold);
serviceList.addEventListener("pointercancel", cancelCardHold);

function renderPerks() {
  perkList.innerHTML = `<article class="perks-showcase reveal-item"><div class="perks-top"><div class="perks-moon" aria-hidden="true">☾</div><div><h3>ECLIPSE OFFICIAL — SUPPORTER PERKS</h3><p>Thank you for supporting Eclipse Official.</p></div></div><div class="perk-columns">${ECLIPSE_CONFIG.perks.map((perk) => `<section class="perk-group"><h4>${perk.title}</h4><ul>${perk.items.map((item) => `<li>${item}</li>`).join("")}</ul></section>`).join("")}</div><p class="perks-footer"><strong>Important:</strong> Booster perks are removed if you stop boosting the server.</p></article>`;
}

function initScrollAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const revealElements = document.querySelectorAll(".hero, .section, .footer");
  revealElements.forEach((element) => element.classList.add("reveal"));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
}

serviceTabs.innerHTML = ECLIPSE_CONFIG.categories.map((category, index) => `<button class="tab" type="button" role="tab" aria-selected="${index === 0}" data-category="${category.id}">${category.label}</button>`).join("");

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  navLinks.classList.toggle("open", !expanded);
});

navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navToggle.setAttribute("aria-expanded", "false");
  navLinks.classList.remove("open");
}));

serviceTabs.querySelectorAll(".tab").forEach((tab) => tab.addEventListener("click", () => {
  serviceTabs.querySelectorAll(".tab").forEach((item) => item.setAttribute("aria-selected", "false"));
  tab.setAttribute("aria-selected", "true");
  renderServices(tab.dataset.category);
}));

renderServices(ECLIPSE_CONFIG.categories[0].id);
renderPerks();
applyTicketLinks();
initScrollAnimations();
