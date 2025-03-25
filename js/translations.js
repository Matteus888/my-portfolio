// Gestion des langues

// Dictionnaire des traductions
const translations = {
  fr: {
    home: "ACCUEIL",
    profile: "PROFIL",
    skills: "COMPÉTENCES",
    day: "Jour",
    night: "Nuit",
    welcome: "BIENVENUE SUR MON PORTFOLIO !\nJE SUIS MATTHIEU, DÉVELOPPEUR WEB.",
  },
  en: {
    home: "HOME",
    profile: "PROFILE",
    skills: "SKILLS",
    day: "Day",
    night: "Night",
    welcome: "WELCOME TO MY PORTFOLIO !\nI'M MATTHIEU, WEB DEVELOPPER.",
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
