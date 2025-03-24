// Mode jour/nuit
const themeToggle = document.querySelector("#theme-toggle");

const logo = document.querySelector(".logo");
const bcgImage = document.querySelector(".background-image");

// Fonction pour basculer entre le mode jour et nuit
function toggleTheme(isDarkMode) {
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    logo.src = "./assets/images/logo-light.png";
    bcgImage.src = "./assets/images/vscode-dark.png";
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
    logo.src = "./assets/images/logo-dark.png";
    bcgImage.src = "./assets/images/vscode-light.png";
  }
}

// Vérification du thème du localStorage au chargement
const savedTheme = localStorage.getItem("theme");

// Par défaut, on est en dark mode
const isDarkMode = savedTheme !== "light";

themeToggle.checked = isDarkMode;
toggleTheme(isDarkMode);

themeToggle.addEventListener("change", () => {
  toggleTheme(themeToggle.checked);
});
