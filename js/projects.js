const projects = [
  {
    title: "My Social App",
    description: "Une application de réseau social type Facebook...",
    images: ["./assets/images/mySocialApp_home.webp", "./assets/images/mySocialApp_profile.webp"],
  },
  {
    title: "My 80's Store",
    description: "Une boutique en ligne rétro sur les années 80...",
    images: ["./assets/images/my80store_home.webp", "./assets/images/my80store_products.webp"],
  },
];

export function focusOnProject() {
  const thumbnails = document.querySelectorAll(".projects-thumbnail");
  const focusedTitle = document.querySelector(".projects-focused-title");
  const focusedDescription = document.querySelector(".projects-focused-description");
  const focusedImages = document.querySelector(".projects-focused-images");

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      const project = projects[index];

      focusedTitle.textContent = project.title;
      focusedDescription.textContent = project.description;
      focusedImages.innerHTML = "";

      project.images.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = project.title;
        focusedImages.appendChild(img);
      });
    });
  });
}
