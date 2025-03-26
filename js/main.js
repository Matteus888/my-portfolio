import { toggleTheme } from "./themeToggle.js";
import { changeLanguage, getCurrentLanguage } from "./translations.js";
import { updateTerminalText } from "./terminalAnimation.js";
import { handleSidebar } from "./sidebar.js";
import { setupImageZoom } from "./imageZoom.js";

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
    { threshold: 0.5 } // L’élément doit être entièrement visible
  );

  observer.observe(footer);
});
