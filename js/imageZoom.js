// Fonction pour rendre net au survol l'image de fond
export function setupImageZoom() {
  const container = document.querySelector(".background-image-container");
  const sharpImage = document.querySelector(".background-image-sharp");
  const blurMask = document.querySelector(".blur-mask");

  if (!container || !sharpImage || !blurMask) return;

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    blurMask.style.left = `${x}px`;
    blurMask.style.top = `${y}px`;

    sharpImage.style.clipPath = `circle(50px at ${x}px ${y}px)`;
    blurMask.style.opacity = "1";
  });

  container.addEventListener("mouseleave", () => {
    sharpImage.style.clipPath = "circle(0px at 0px 0px)";
    blurMask.style.opacity = "0";
  });
}
