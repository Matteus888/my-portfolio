// Dictionnaire des traductions
export const translations = {
  fr: {
    home: "ACCUEIL",
    profile: "PROFIL",
    skills: "COMPÉTENCES",
    day: "Jour",
    night: "Nuit",
    welcome: "BIENVENUE SUR MON PORTFOLIO !\nJE SUIS MATTHIEU, DÉVELOPPEUR WEB.",
    profileLocation: "Région lyonnaise",
    downloadBtn: "Télécharger mon CV",
    profileText:
      "Bonjour, je suis <span class='colored-text'>Matthieu Chatelin</span>, développeur web en reconversion professionnelle, basé dans la région lyonnaise et à la recherche d'une alternance.<br /><br />Après plusieurs années dans la production audiovisuelle, j'ai choisi de me réorienter vers le développement web, un secteur qui me passionne depuis longtemps. Pour concrétiser ce projet, j'ai suivi une formation intensive où j'ai acquis des compétences solides en programmation et en conception d'applications web et mobile modernes.<br /><br />Mon expérience passée m'a apporté des qualités essentielles pour ce métier: rigueur, adaptabilité, communication, gestion de projet et travail en équipe. Habitué à résoudre des problèmes et à organiser efficacement mon travail, je mets aujourd'hui ces atouts au service du développement web, en veillant à produire du code clair et maintenable.<br /><br />Curieux et persévérant, j'aime apprendre et relever de nouveaux défis techniques. Je suis à la recherche d'une alternance pour continuer à progresser et mettre mes compétences en pratique dans un environnement dynamique. Mon objectif est d'évoluer en tant que développeur et de contribuer à des projets ambitieux, en apportant mon esprit d'analyse et ma capacité à collaborer efficacement.",
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
    profileLocation: "Lyon Area",
    downloadBtn: "Download my CV",
    profileText:
      "Hi, I'm <span class='colored-text'>Matthieu Chatelin</span>, a web developer in retraining, based in the Lyon area and looking for a work-study placement.<br /><br />After several years in audiovisual production, I decided to move into web development, a sector I've long been passionate about. To make this project a reality, I took an intensive training course where I acquired solid skills in programming and designing modern web and mobile applications.<br/><br />My past experience has given me essential qualities for this job: rigor, adaptability, communication, project management and teamwork. I'm used to solving problems and organizing my work efficiently, and I'm now applying these skills to web development, with a focus on producing clear, maintainable code.<br /><br />Curious and persevering, I enjoy learning and taking on new technical challenges. I'm looking for a work-study placement to continue to progress and put my skills into practice in a dynamic environment. My aim is to evolve as a developer and contribute to ambitious projects, bringing my analytical mind and ability to collaborate effectively.",
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
