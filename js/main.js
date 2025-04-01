import { toggleTheme } from "./themeToggle.js";
import { changeLanguage, getCurrentLanguage, getTranslation } from "./translations.js";
import { updateTerminalText } from "./terminalAnimation.js";
import { handleSidebar } from "./sidebar.js";
import { setupImageZoom } from "./imageZoom.js";
import { setupModals, reattachModalListeners } from "./modal.js";
import { setupEmailForm } from "./email.js";

document.addEventListener("DOMContentLoaded", () => {
  // Gestion du thème
  const themeToggles = document.querySelectorAll(".theme-toggle");

  if (themeToggles.length === 0) return;

  const savedTheme = localStorage.getItem("theme");
  const isDarkMode = savedTheme !== "light";

  themeToggles.forEach((toggle) => {
    toggle.checked = isDarkMode;
    toggle.addEventListener("change", () => {
      toggleTheme(toggle.checked);
      themeToggles.forEach((t) => (t.checked = toggle.checked));
    });
  });

  toggleTheme(isDarkMode);

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

  // Gestion de l'apparition des profile-card
  const profileCards = document.querySelectorAll(".profile-card");

  function checkScroll() {
    profileCards.forEach((card) => {
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
});
