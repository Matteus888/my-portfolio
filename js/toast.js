import { getTranslation } from "./translations.js";

export function showToast(messageKey, type = "success", duration = 4000) {
  const toastContainer = document.querySelector("#toastContainer");

  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = getTranslation(messageKey);

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, duration);

  const updateToastText = () => {
    toast.textContent = getTranslation(messageKey);
  };

  document.addEventListener("languageChanged", updateToastText);

  setTimeout(() => {
    document.removeEventListener("languageChanged", updateToastText);
  }, duration);
}
