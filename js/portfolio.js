// Scripts principaux du site

// Animation terminal
let typingInProgress = false;
let typingTimeout;

function typeText(text) {
  if (typingInProgress) return;

  const textContainer = document.querySelector("#text");
  textContainer.innerHTML = "";
  let index = 0;
  typingInProgress = true;

  function typing() {
    if (index <= text.length) {
      let displayedText = text.slice(0, index);
      let cursor = '<span class="cursor"></span>';
      textContainer.innerHTML = displayedText.replace(/\n/g, "<br>") + cursor;

      index++;
      typingTimeout = setTimeout(typing, 150);
    } else {
      typingInProgress = false;
      document.querySelector("#terminalBtn").classList.add("visible");
    }
  }

  typing();
}

function updateTerminalText() {
  const currentLang = localStorage.getItem("lang") || "fr";
  const text = translations[currentLang]["welcome"];

  const terminal = document.querySelector(".terminal");
  const terminalBtn = document.querySelector("#terminalBtn");

  terminalBtn.classList.remove("visible");
  document.querySelector("#text").innerHTML = "";

  if (typingInProgress) {
    clearTimeout(typingTimeout);
    typingInProgress = false;
  }

  setTimeout(() => {
    typeText(text);
  }, 500);
}

document.addEventListener("DOMContentLoaded", updateTerminalText);
document.addEventListener("languageChanged", updateTerminalText);

// Sidebar visible/invisible
const header = document.querySelector(".header-container");
const sidebar = document.querySelector("#sidebar");

let lastScrollY = window.scrollY;
let headerHidden = false;

window.addEventListener("scroll", () => {
  const headerHeight = header.offsetHeight;

  if (window.scrollY > lastScrollY && !headerHidden) {
    if (window.scrollY > headerHeight) {
      header.style.top = `-${headerHeight}px`;
      sidebar.style.display = "flex";
      headerHidden = true;
    }
  } else if (window.scrollY < lastScrollY && headerHidden) {
    if (window.scrollY <= 0) {
      header.style.top = "0";
      sidebar.style.display = "none";
      headerHidden = false;
    }
  }

  lastScrollY = window.scrollY;
});

// Sidebar soulignement des icônes
const sections = document.querySelectorAll("section");
const sidebarLinks = document.querySelectorAll(".sidebar a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute("id");
    }
  });

  sidebarLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("active");
    }
  });
});
