import { applyTheme, initTheme } from "./themeToggle.js";
import { changeLanguage, getCurrentLanguage, getTranslation } from "./translations.js";
import { updateTerminalText } from "./terminalAnimation.js";
import { handleSidebar } from "./sidebar.js";
import { setupImageZoom } from "./imageZoom.js";
import { setupModals, reattachModalListeners } from "./modal.js";
import { setupEmailForm } from "./email.js";
import { focusOnProject } from "./projects.js";
import { setupTimeline } from "./timeline.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  // Gestion du thème
  const themeToggles = document.querySelectorAll(".theme-toggle");

  if (themeToggles.length === 0) return;

  const savedTheme = localStorage.getItem("theme");
  const isDarkMode = savedTheme === "dark";

  // Applique visuellement le thème
  applyTheme(isDarkMode);

  // Synchronise l'état de l'interrupteur
  themeToggles.forEach((toggle) => {
    toggle.checked = isDarkMode;
    toggle.addEventListener("change", () => {
      applyTheme(toggle.checked);
      themeToggles.forEach((t) => (t.checked = toggle.checked));
    });
  });

  // Gestion de la traduction
  const langToggles = document.querySelectorAll(".lang-toggle");

  if (langToggles.length > 0) {
    const currentLang = getCurrentLanguage();
    const isEnglish = currentLang === "en";

    langToggles.forEach((toggle) => (toggle.checked = isEnglish));

    changeLanguage(currentLang);

    langToggles.forEach((toggle) => {
      toggle.addEventListener("change", () => {
        const newLang = toggle.checked ? "en" : "fr";
        if (newLang !== getCurrentLanguage()) {
          changeLanguage(newLang);
          langToggles.forEach((t) => (t.checked = toggle.checked));
          reattachModalListeners();
        }
      });
    });
  }

  // Gestion de la mise à jour des toasts sur changement de langue
  document.addEventListener("languageChanged", () => {
    const activeToasts = document.querySelectorAll(".toast");
    activeToasts.forEach((toast) => {
      const messageKey = toast.getAttribute("data-key");
      if (messageKey) {
        toast.textContent = getTranslation(messageKey);
      }
    });
  });

  // Mise à jour de l'animation du terminal
  updateTerminalText();

  // Gestion de la "loupe" nette
  setupImageZoom();

  // Gestion de la sidebar
  handleSidebar();

  // Gestion de l'apparition des cards
  const profileTitle = document.querySelector(".profile-title");
  const profileCards = document.querySelectorAll(".profile-card");
  const formationsTitle = document.querySelector(".formation-title");
  const timeline = document.querySelector(".timeline");
  const skillsTitle = document.querySelector(".skills-title");
  const skillsHardTitle = document.querySelector(".skills-hard-title");
  const skillsSoftTitle = document.querySelector(".skills-soft-title");
  const skillsNextTitle = document.querySelector(".skills-next-title");
  const skillsHardContent = document.querySelector(".skills-hard-content");
  const skillsSoftContent = document.querySelector(".skills-soft-content");
  const skillsNextContent = document.querySelector(".skills-next-content");
  const projectsTitle = document.querySelector(".projects-title");
  const contactTitle = document.querySelector(".contact-title");
  const projectsThumbnails = document.querySelector(".projects-thumbnail-container");
  const projectsFocused = document.querySelector(".projects-focused");
  const contactCard = document.querySelector(".contact-card");
  const formCard = document.querySelector(".form-card");

  const totalCards = [
    ...profileCards,
    profileTitle,
    formationsTitle,
    timeline,
    skillsTitle,
    skillsHardTitle,
    skillsSoftTitle,
    skillsNextTitle,
    skillsHardContent,
    skillsSoftContent,
    skillsNextContent,
    projectsTitle,
    projectsThumbnails,
    projectsFocused,
    contactTitle,
    contactCard,
    formCard,
  ];

  function checkScroll() {
    totalCards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 1 && rect.bottom > 0) {
        card.classList.add("show");
      } else {
        card.classList.remove("show");
      }
    });
  }
  window.addEventListener("scroll", checkScroll);
  checkScroll();

  // Gestion de la flêche vers le top du footer
  const arrowUp = document.querySelector("#arrow-up");
  const footer = document.querySelector(".footer");

  window.addEventListener("scroll", () => {
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (footerRect.top < windowHeight) {
        arrowUp.classList.add("visible");
      } else {
        arrowUp.classList.remove("visible");
      }
    }
  });

  // Gestion des modales
  setupModals();

  // Contact
  setupEmailForm();

  // Projects focused
  focusOnProject();

  // Timeline
  setupTimeline();

  // Retournement automatique aléatoire des .skills-card
  const skillCards = document.querySelectorAll(".skills-card");

  function flipRandomSkillCard() {
    const randomIndex = Math.floor(Math.random() * skillCards.length);
    const card = skillCards[randomIndex];

    // Ne pas flipper une carte déjà retournée ou survolée
    if (card.classList.contains("flip") || card.matches(":hover")) return;

    card.classList.add("flip");

    setTimeout(() => {
      card.classList.remove("flip");
    }, 2000); // reste retournée 2 secondes
  }

  setInterval(flipRandomSkillCard, 2000); // une carte toutes les 2 secondes

  // Menu burger pour petit écran
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".nav-menu");

  if (burger && navMenu) {
    burger.addEventListener("click", () => {
      const expanded = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!expanded));
      navMenu.classList.toggle("show");
      burger.classList.toggle("show");
    });

    // Accessibilité clavier
    burger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        burger.click();
      }
    });
  }
});
