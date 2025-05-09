// Fonction pour basculer entre le mode jour et nuit
export function applyTheme(isDarkMode) {
  document.body.classList.toggle("dark-mode", isDarkMode);
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");

  document.dispatchEvent(new CustomEvent("themeChanged"));

  const logo = document.querySelector(".logo");
  const bcgImage = document.querySelector(".background-image");
  const bcgImageSharp = document.querySelector(".background-image-sharp");
  const arrowBar = document.querySelector("#arrow-bar img");
  const projectsLinkImg = document.querySelector(".projects-link img");
  const projectsLinkAnchor = document.querySelector(".projects-link a");

  const sidebarIcons = document.querySelectorAll(".sidebar img");
  const socialIcons = document.querySelectorAll(".social img");
  const legalIcons = document.querySelectorAll(".modal-content img");
  const profileIdIcons = document.querySelectorAll(".profile-id-item img");
  const profileSocialIcons = document.querySelectorAll(".profile-links img");
  const projectsGitHubIcons = document.querySelectorAll(".projects-techno-item img");
  const contactIcons = document.querySelectorAll(".contact-card img");
  const arrowUpIcons = document.querySelectorAll("#arrow-up img");

  const icons = [
    ...sidebarIcons,
    ...socialIcons,
    ...legalIcons,
    ...profileIdIcons,
    ...profileSocialIcons,
    ...projectsGitHubIcons,
    ...contactIcons,
    ...arrowUpIcons,
  ];

  logo.src = `./assets/icons/logo-${isDarkMode ? "light" : "dark"}.png`;
  bcgImage.src = `./assets/images/vscode-${isDarkMode ? "dark" : "light"}.webp`;
  bcgImageSharp.src = `./assets/images/vscode-${isDarkMode ? "light" : "dark"}.webp`;
  arrowBar.src = `./assets/icons/up-arrow-${isDarkMode ? "light" : "dark"}.png`;

  const currentProject = document.querySelector(".projects-thumbnail.active");
  const isMobileProject = !projectsLinkAnchor?.getAttribute("href");

  if (currentProject && !isMobileProject) {
    projectsLinkImg.src = `./assets/icons/www-${isDarkMode ? "light" : "dark"}.png`;
  }

  icons.forEach((icon) => {
    const iconName = icon.src.split("/").pop();
    icon.src = `./assets/icons/${iconName.replace(isDarkMode ? "-dark" : "-light", isDarkMode ? "-light" : "-dark")}`;
  });
}

// Initialisation du thème
export function initTheme() {
  let savedTheme = localStorage.getItem("theme");

  // Si aucun thème n'est enregistré, on utilise la préférence système
  if (!savedTheme) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    savedTheme = prefersDark ? "dark" : "light";
    localStorage.setItem("theme", savedTheme);
  }

  const isDarkMode = savedTheme === "dark";
  applyTheme(isDarkMode);
}

export function isDarkModeActive() {
  return document.body.classList.contains("dark-mode");
}
