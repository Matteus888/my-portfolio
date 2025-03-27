// Fonction pour ouvrir une modale
export function setupModals() {
  // Ouverture modale
  document.querySelectorAll("[data-modal-target]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetSelector = trigger.getAttribute("data-modal-target");
      const modal = document.querySelector(targetSelector);
      if (modal) modal.style.display = "flex";
    });
  });

  // Fermeture modale au clic sur X
  document.querySelectorAll(".modal .close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      const modal = closeBtn.closest(".modal");
      if (modal) modal.style.display = "none";
    });
  });

  // Fermeture modale au clic sur le bouton OK
  document.querySelectorAll(".modal .btn").forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      const modal = closeBtn.closest(".modal");
      if (modal) modal.style.display = "none";
    });
  });

  // Fermeture modale au clic en dehors du contenu
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });
}
