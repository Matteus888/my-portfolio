// Gestion des modales

// Fonction pour ré-attacher les événements aux nouveaux éléments
export function reattachModalListeners() {
  document.querySelectorAll("[data-modal-target]").forEach((span) => {
    span.removeEventListener("click", handleModalClick); // Supprime l'ancien écouteur
    span.addEventListener("click", handleModalClick);
  });
}

// Fonction pour gérer l'ouverture d'une modale
function handleModalClick(event) {
  event.preventDefault();
  event.stopPropagation();
  const targetSelector = event.currentTarget.getAttribute("data-modal-target");
  const modal = document.querySelector(targetSelector);
  if (modal) {
    modal.style.display = "flex";
    const modalContent = modal.querySelector(".modal-content");
    if (modalContent) modalContent.scrollTop = 0;
  }
}

// Fonction de départ pour la modale légale
export function setupModals() {
  reattachModalListeners();

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
