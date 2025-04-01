// Fonction pour basculer entre le mode jour et nuit
export function toggleTheme(isDarkMode) {
  document.body.classList.toggle("dark-mode", isDarkMode);
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");

  const logo = document.querySelector(".logo");
  const bcgImage = document.querySelector(".background-image");
  const bcgImageSharp = document.querySelector(".background-image-sharp");
  const arrowBar = document.querySelector("#arrow-bar img");

  const sidebarIcons = document.querySelectorAll(".sidebar img");
  const socialIcons = document.querySelectorAll(".social img");
  const legalIcons = document.querySelectorAll(".modal-content img");
  const profileIdIcons = document.querySelectorAll(".profile-id-item img");
  const profileSocialIcons = document.querySelectorAll(".profile-links img");
  const contactIcons = document.querySelectorAll(".contact-card img");
  const arrowUpIcons = document.querySelectorAll("#arrow-up img");

  const icons = [
    ...sidebarIcons,
    ...socialIcons,
    ...legalIcons,
    ...profileIdIcons,
    ...profileSocialIcons,
    ...contactIcons,
    ...arrowUpIcons,
  ];

  logo.src = `./assets/icons/logo-${isDarkMode ? "light" : "dark"}.png`;
  bcgImage.src = `./assets/images/vscode-${isDarkMode ? "dark" : "light"}.webp`;
  bcgImageSharp.src = `./assets/images/vscode-${isDarkMode ? "light" : "dark"}.webp`;
  arrowBar.src = `./assets/icons/up-arrow-${isDarkMode ? "light" : "dark"}.png`;

  icons.forEach((icon) => {
    const iconName = icon.src.split("/").pop();
    icon.src = `./assets/icons/${iconName.replace(isDarkMode ? "-dark" : "-light", isDarkMode ? "-light" : "-dark")}`;
  });
}
