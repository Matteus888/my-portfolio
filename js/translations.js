// Dictionnaire des traductions
export const translations = {
  fr: {
    home: "ACCUEIL",
    profile: "PROFIL",
    skills: "COMPÉTENCES",
    day: "Jour",
    night: "Nuit",
    welcome: "BIENVENUE SUR MON PORTFOLIO !\nJE SUIS MATTHIEU, DÉVELOPPEUR WEB.",
    copyright: "@ 2025 Matthieu Chatelin. Tous droits réservés.",
    legal: "Mentions légales & Confidentialité",
  },
  en: {
    home: "HOME",
    profile: "PROFILE",
    skills: "SKILLS",
    day: "Day",
    night: "Night",
    welcome: "WELCOME TO MY PORTFOLIO !\nI'M MATTHIEU, WEB DEVELOPPER.",
    copyright: "@ 2025 Matthieu Chatelin. All rights reserved.",
    legal: "Terms & Legal Notices",
  },
};

// Fonction pour switcher la langue
export function changeLanguage(lang) {
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.dispatchEvent(new Event("languageChanged"));
}

// Fonction pour récupérer langue actuelle
export function getCurrentLanguage() {
  return localStorage.getItem("lang") || "fr";
}
