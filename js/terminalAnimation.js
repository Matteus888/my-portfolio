import { translations, getCurrentLanguage } from "./translations.js";

let typingInProgress = false;
let typingTimeout;

// Fonction pour l'animation de saisie
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
      document.querySelector("#terminalImg").classList.add("visible");
      document.querySelector("#terminalBtn").classList.add("visible");
    }
  }

  typing();
}

// Fonction pour mettre à jour le texte du terminal
export function updateTerminalText() {
  const currentLang = getCurrentLanguage();
  const text = translations[currentLang]["welcome"];

  const terminalBtn = document.querySelector("#terminalBtn");
  const terminalImg = document.querySelector("#terminalImg");
  terminalBtn.classList.remove("visible");
  terminalImg.classList.remove("visible");
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
