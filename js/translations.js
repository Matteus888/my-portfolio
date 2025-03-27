// Dictionnaire des traductions
export const translations = {
  fr: {
    home: "ACCUEIL",
    profile: "PROFIL",
    skills: "COMPÉTENCES",
    day: "Jour",
    night: "Nuit",
    welcome: "BIENVENUE SUR MON PORTFOLIO !\nJE SUIS MATTHIEU, DÉVELOPPEUR WEB.",
    copyright: "© 2025 Matthieu Chatelin. Tous droits réservés.",
    legal: "Mentions légales & Confidentialité",
    legalTitle: "Mentions légales",
    legalPublisherTitle: "Éditeur du site",
    legalPublisherText: "Ce site est édité par : Matthieu CHATELIN, Développeur Web",
    legalHostTitle: "Hébergement",
    legalHostText: "Le site est hébergé par :",
    legalLiabilityTitle: "Responsabilité",
    legalLiabilityText:
      "Les informations présentées sur ce site le sont à titre informatif. L'éditeur ne saurait être tenu responsable des erreurs ou omissions. Les liens vers des sites externes ne sont pas sous le contrôle de l'éditeur, qui ne peut être tenu responsable de leur contenu.",
    privacyTitle: "Politique de confidentialité",
    privacyDataTitle: "Données personnelles",
    privacyDataText1: "Ce site ne collecte pas de données personnelles à l’insu des visiteurs.",
    privacyDataText2:
      "Le seul formulaire présent permet de contacter le développeur. Les données saisies (nom, email, message) sont utilisées uniquement pour répondre à la demande envoyée via ce formulaire.",
    privacyDataText3: "Aucune donnée n’est stockée sur un serveur ni partagée avec des tiers.",
    privacyCookiesTitle: "Cookies",
    privacyCookiesText:
      "Ce site ne dépose pas de cookies à des fins de suivi, de publicité ou d’analyse. Seuls des cookies strictement nécessaires au bon fonctionnement du site peuvent être utilisés (par exemple, ceux liés à l’affichage ou à la navigation).",
    privacyRightsTitle: "Vos droits",
    privacyRightsText1:
      "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d’un droit d’accès, de rectification ou de suppression des données vous concernant.",
    privacyRightsText2: 'Pour exercer ce droit, vous pouvez écrire à : <a href="mailto:matthieu888@gmail.com">matthieu888@gmail.com</a>',
  },
  en: {
    home: "HOME",
    profile: "PROFILE",
    skills: "SKILLS",
    day: "Day",
    night: "Night",
    welcome: "WELCOME TO MY PORTFOLIO !\nI'M MATTHIEU, WEB DEVELOPPER.",
    copyright: "© 2025 Matthieu Chatelin. All rights reserved.",
    legal: "Terms of use & Privacy Policy",
    legalTitle: "Terms of use",
    legalPublisherTitle: "Site Publisher",
    legalPublisherText: "This site is published by: Matthieu CHATELIN, Web Developper",
    legalHostTitle: "Hosting",
    legalHostText: "This site is hosted by:",
    legalLiabilityTitle: "Liability",
    legalLiabilityText:
      "The information provided on this site is for informational purposes only. The publisher cannot be held responsible for any errors or omissions. Links to external websites are beyond the control of the publisher, who cannot be held liable for their content.",
    privacyTitle: "Privacy Policy",
    privacyDataTitle: "Personal Data",
    privacyDataText1: "This site does not collect personal data without the visitor’s knowledge.",
    privacyDataText2:
      "The only form on the site allows users to contact the developer. The data entered (name, email, message) is used solely to respond to the inquiry submitted through the form.",
    privacyDataText3: "No data is stored on a server or shared with third parties.",
    privacyCookiesTitle: "Cookies",
    privacyCookiesText:
      "This site does not use cookies for tracking, advertising, or analytics purposes. Only cookies strictly necessary for the proper functioning of the site may be used (e.g., for display or navigation).",
    privacyRightsTitle: "Your Rights",
    privacyRightsText1:
      "In accordance with the General Data Protection Regulation (GDPR), you have the right to access, correct, or delete your personal data.",
    privacyRightsText2: 'To exercise this right, please contact: <a href="mailto:matthieu888@gmail.com">matthieu888@gmail.com</a>',
  },
};

// Fonction pour switcher la langue
export function changeLanguage(lang) {
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  document.dispatchEvent(new Event("languageChanged"));
}

// Fonction pour récupérer langue actuelle
export function getCurrentLanguage() {
  return localStorage.getItem("lang") || "fr";
}
