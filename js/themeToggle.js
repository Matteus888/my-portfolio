// Mode jour/nuit
const themeToggle = document.querySelector("#theme-toggle");

const logo = document.querySelector(".logo");

// Fonction pour basculer entre le mode jour et nuit
function toggleTheme(isDarkMode) {
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    logo.src = "./assets/images/logo-white.png";
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
    logo.src = "./assets/images/logo-blue.png";
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
