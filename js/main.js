import { toggleTheme } from "./themeToggle.js";
import { changeLanguage, getCurrentLanguage } from "./translations.js";
import { updateTerminalText } from "./terminalAnimation.js";
import { handleSidebar } from "./sidebar.js";
import { setupImageZoom } from "./imageZoom.js";
import { setupModals } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
  // Gestion du thème
  const themeToggle = document.querySelector("#theme-toggle");

  if (!themeToggle) return;

  const savedTheme = localStorage.getItem("theme");
  const isDarkMode = savedTheme !== "light";

  themeToggle.checked = isDarkMode;
  toggleTheme(isDarkMode);

  themeToggle.addEventListener("change", () => {
    toggleTheme(themeToggle.checked);
  });

  // Gestion de la traduction
  const langToggle = document.querySelector("#lang-toggle");

  if (langToggle) {
    const currentLang = getCurrentLanguage();
    langToggle.checked = currentLang === "en";
    changeLanguage(currentLang);

    langToggle.addEventListener("change", () => {
      const newLang = langToggle.checked ? "en" : "fr";
      changeLanguage(newLang);
    });
  }

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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          arrowUp.classList.add("visible");
        } else {
          arrowUp.classList.remove("visible");
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(footer);

  // Gestion des modales
  setupModals();
});
