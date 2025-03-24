// Scripts principaux du site

let typingInProgress = false;

function typeText(text) {
  if (typingInProgress) return;

  const textContainer = document.querySelector("#text");
  textContainer.textContent = "";
  let index = 0;
  typingInProgress = true;

  function typing() {
    if (index < text.length) {
      textContainer.textContent += text.charAt(index);
      index++;
      setTimeout(typing, 300);
    } else {
      typingInProgress = false;
    }
  }

  typing();
}

function updateTerminalText() {
  const currentLang = localStorage.getItem("lang") || "fr";
  const text = translations[currentLang]["welcome"];
  typeText(text);
}

document.addEventListener("DOMContentLoaded", updateTerminalText);
document.addEventListener("languageChanged", updateTerminalText);
