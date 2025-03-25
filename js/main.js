import { toggleTheme } from "./themeToggle.js";
import { changeLanguage, getCurrentLanguage } from "./translations.js";
import { updateTerminalText } from "./terminalAnimation.js";
import { handleSidebar } from "./sidebar.js";

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

  // Mise à jour de l'animation
  updateTerminalText();

  // Gestion de la sidebar
  handleSidebar();
});
