// Gestion des langues

// Dictionnaire des traductions
const translations = {
  fr: {
    about: "À PROPOS",
    skills: "COMPÉTENCES",
    day: "Jour",
    night: "Nuit",
    welcome: "Bienvenue sur mon portfolio",
  },
  en: {
    about: "ABOUT",
    skills: "SKILLS",
    day: "Day",
    night: "Night",
    welcome: "Welcome to my portfolio",
  },
};

const toggle = document.querySelector("#lang-toggle");

// Fonction pour switcher la langue
function changeLanguage(lang) {
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key !== "welcome") {
      el.textContent = translations[lang][key];
    }
  });

  toggle.checked = lang === "en";

  document.dispatchEvent(new Event("languageChanged"));
}

// Détection de la langue enregistrée
const currentLang = localStorage.getItem("lang") || "fr";
changeLanguage(currentLang);

// Evènement sur le switch
toggle.addEventListener("change", () => {
  const newLang = toggle.checked ? "en" : "fr";
  changeLanguage(newLang);
});
