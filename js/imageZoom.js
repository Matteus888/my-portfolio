// Fonction pour rendre net au survol l'image de fond
let imgLoaded = false;
let image = new Image(); // Contient l’image qui sera utilisée dans la loupe
let lastX = 0;
let lastY = 0;

function loadSharpImage(src, callback) {
  imgLoaded = false;
  image = new Image();
  image.src = src;
  image.onload = () => {
    imgLoaded = true;
    callback?.();
  };
}

// Fonction pour mettre en place l'effet de loupe sur l'image de fond
export function setupImageZoom() {
  const container = document.querySelector(".background-image-container");
  const canvas = document.querySelector("#zoom-canvas");
  const sharpImg = document.querySelector(".background-image-sharp");

  if (!container || !canvas || !sharpImg) return;

  const ctx = canvas.getContext("2d");

  // Redimensionne le canvas pour qu’il couvre le container
  function resizeCanvas() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }

  // Dessine l’image zoomée dans un cercle autour de la souris
  function draw(x, y) {
    if (!imgLoaded || !image.naturalWidth) return;

    const radius = 60;
    const containerAspect = canvas.width / canvas.height;
    const imageAspect = image.naturalWidth / image.naturalHeight;

    let renderWidth, renderHeight, offsetX, offsetY;

    // Calcul des dimensions et décalages pour bien centrer l’image dans le canvas
    if (containerAspect > imageAspect) {
      // Le container est plus large que l'image → image rognée en haut/bas
      renderWidth = canvas.width;
      renderHeight = canvas.width / imageAspect;
      offsetX = 0;
      offsetY = (canvas.height - renderHeight) / 2;
    } else {
      // L'image est plus large que le container → image rognée à gauche/droite
      renderWidth = canvas.height * imageAspect;
      renderHeight = canvas.height;
      offsetX = (canvas.width - renderWidth) / 2;
      offsetY = 0;
    }

    // Efface le précédent dessin
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Commence un nouveau chemin de dessin
    ctx.save(); // Sauvegarde le contexte actuel
    ctx.beginPath(); // Début du cercle de zoom
    ctx.arc(x, y, radius, 0, Math.PI * 2); // Cercle centré sur la souris
    ctx.clip(); // Tout dessin suivant sera limité à ce cercle

    // Dessine l’image nette
    ctx.drawImage(image, offsetX, offsetY, renderWidth, renderHeight);

    ctx.restore(); // Restaure le contexte (enlève le clip)
    lastX = x;
    lastY = y;
  }

  // Efface le contenu du canvas (utile lors du mouseleave)
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  resizeCanvas();

  window.addEventListener("resize", () => {
    resizeCanvas();

    draw(lastX, lastY);
  });

  // Initialisation de l'image nette en chargeant l'image de fond
  loadSharpImage(sharpImg.src);

  container.addEventListener("mousemove", (e) => {
    // On récupère les coordonnées du container par rapport à la fenêtre
    const rect = container.getBoundingClientRect();
    // Calcul des coordonnées de la souris par rapport au container
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    draw(x, y);
  });

  container.addEventListener("mouseleave", () => {
    clearCanvas();
  });

  // Observation des changements de thème
  const observer = new MutationObserver(() => {
    loadSharpImage(sharpImg.src, () => {
      draw(lastX, lastY);
    });
  });

  observer.observe(sharpImg, { attributes: true, attributeFilter: ["src"] });
}
