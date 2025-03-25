// Fonction pour basculer entre le mode jour et nuit
export function toggleTheme(isDarkMode) {
  document.body.classList.toggle("dark-mode", isDarkMode);
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");

  const logo = document.querySelector(".logo");
  const bcgImage = document.querySelector(".background-image");
  const sidebarIcons = document.querySelectorAll(".sidebar img");

  logo.src = `./assets/icons/logo-${isDarkMode ? "light" : "dark"}.png`;
  bcgImage.src = `./assets/images/vscode-${isDarkMode ? "dark" : "light"}.png`;

  sidebarIcons.forEach((icon) => {
    const iconName = icon.src.split("/").pop();
    icon.src = `./assets/icons/${iconName.replace(isDarkMode ? "-dark" : "-light", isDarkMode ? "-light" : "-dark")}`;
  });
}
