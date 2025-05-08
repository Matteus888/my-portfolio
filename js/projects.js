import { translations, getCurrentLanguage } from "./translations.js";
import { isDarkModeActive } from "./themeToggle.js";

const projects = [
  {
    title: "My Social App",
    type: "web",
    descriptionKey: "project1_description",
    front: "React/Next/JSX/CSS",
    frontLink: "https://github.com/Matteus888/my-social-app-frontend",
    back: "NodeJS/Express",
    backLink: "https://github.com/Matteus888/my-social-app-backend",
    bdd: "MongoDB/Cloudinary",
    pack: "FontAwesome, Redux, Moment.js, Mongoose, bcrypt, jsonwebtoken, uuid",
    link: "https://my-social-app-frontend.vercel.app/",
    images: [
      "./assets/images/projects/mySocialApp/mySocialApp_home.webp",
      "./assets/images/projects/mySocialApp/mySocialApp_pic.webp",
      "./assets/images/projects/mySocialApp/mySocialApp_profile.webp",
    ],
  },
  {
    title: "My 80's Store",
    type: "web",
    descriptionKey: "project2_description",
    front: "React/Vite/JSX/CSS",
    frontLink: "https://github.com/Matteus888/my-80store-frontend",
    back: "NodeJS/Express",
    backLink: "https://github.com/Matteus888/my-80store-backend",
    bdd: "MongoDB",
    pack: "Material UI, Redux, Date-fns, Stripe, Prop-types, React-slider, Mongoose, bcrypt, jsonwebtoken, Slugify, uuid",
    link: "https://my-80store-frontend.vercel.app/",
    images: [
      "./assets/images/projects/my80store/my80store_home.webp",
      "./assets/images/projects/my80store/my80store_products.webp",
      "./assets/images/projects/my80store/my80store_cart.webp",
    ],
  },
  {
    title: "Roll-In New-York",
    type: "mobile",
    descriptionKey: "project3_description",
    front: "React Native/Expo/JSX/CSS",
    frontLink: "https://github.com/Matteus888/Roll-in-NewYork-Frontend",
    back: "NodeJS/Express",
    backLink: "https://github.com/Matteus888/Roll-in-NewYork-Backend",
    bdd: "MongoDB/Cloudinary",
    pack: "FontAwesome, React-Navigation, Redux, Camera, File-System, Font, Image-Picker, Expo-Location, Moment, Masonry-List, Modal, Paper, Vector Icons, Toastify, bcrypt, Mongoose, uid2",
    qrcode: "./assets/images/projects/rollinnewyork/rollinnewyork_qrcode.png",
    images: [
      "./assets/images/projects/rollinnewyork/rollinnewyork1.webp",
      "./assets/images/projects/rollinnewyork/rollinnewyork2.webp",
      "./assets/images/projects/rollinnewyork/rollinnewyork3.webp",
    ],
  },
];

// Fonction pour focus sur un projet en particulier (avec changement de langue)
export function focusOnProject() {
  const thumbnails = document.querySelectorAll(".projects-thumbnail");
  const clickMessage = document.querySelector(".projects-click-message");
  const projectDetails = document.querySelector(".projects-details");
  const focusedTitle = document.querySelector(".projects-focused-title");
  const focusedImages = document.querySelector(".projects-focused-images");
  const focusedDescription = document.querySelector(".projects-description-text");
  const focusedFront = document.querySelector(".projects-front");
  const focusedBack = document.querySelector(".projects-back");
  const focusedBDD = document.querySelector(".projects-bdd");
  const focusedPack = document.querySelector(".projects-pack");
  const focusedLink = document.querySelector(".projects-link a");
  const frontGitHubLink = document.querySelector("#frontGitHubLink");
  const backGitHubLink = document.querySelector("#backGitHubLink");

  if (projectDetails) projectDetails.classList.add("hidden");
  if (clickMessage) clickMessage.classList.remove("hidden");

  let currentProjectIndex = null;

  function updateProjectDescription(projectIndex) {
    currentProjectIndex = projectIndex;
    const currentLang = getCurrentLanguage();
    const project = projects[projectIndex];

    if (clickMessage) clickMessage.classList.add("hidden");
    if (projectDetails) projectDetails.classList.remove("hidden");

    focusedTitle.textContent = project.title;
    focusedDescription.textContent = translations[currentLang][project.descriptionKey];
    focusedFront.textContent = project.front;
    focusedBack.textContent = project.back;
    focusedBDD.textContent = project.bdd;
    focusedPack.textContent = project.pack;
    frontGitHubLink.href = project.frontLink;
    backGitHubLink.href = project.backLink;

    focusedLink.innerHTML = "";
    focusedLink.removeAttribute("href");
    focusedLink.removeEventListener("click", openModal);

    if (project.type === "web") {
      focusedLink.href = project.link;
      const webIcon = document.createElement("img");
      const isDarkMode = isDarkModeActive();
      webIcon.src = `./assets/icons/www-${isDarkMode ? "light" : "dark"}.png`;
      webIcon.alt = "Website logo";
      focusedLink.appendChild(webIcon);
    } else if (project.type === "mobile") {
      const qrImg = document.createElement("img");
      qrImg.src = project.qrcode;
      qrImg.alt = `${project.title} QR Code`;
      focusedLink.appendChild(qrImg);
      focusedLink.addEventListener("click", openModal);
    }

    focusedImages.innerHTML = "";
    project.images.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = project.title;
      focusedImages.appendChild(img);
    });
  }

  document.addEventListener("languageChanged", () => {
    if (currentProjectIndex !== null) {
      updateProjectDescription(currentProjectIndex);
    }
  });

  document.addEventListener("themeChanged", () => {
    if (currentProjectIndex !== null) {
      updateProjectDescription(currentProjectIndex);
    }
  });

  function openModal(e) {
    if (e.target.tagName === "IMG") {
      modal.style.display = "flex";
      modalImg.src = e.target.src;
      modalImg.alt = e.target.alt;
    }
  }

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      thumbnails.forEach((t) => t.classList.remove("active"));
      thumbnail.classList.add("active");

      updateProjectDescription(index);
    });
  });

  const modal = document.querySelector("#image-modal");
  const modalImg = document.querySelector("#modal-image");
  const modalClose = document.querySelector(".close");

  focusedImages.addEventListener("click", openModal);

  modalClose.addEventListener("click", (e) => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  document.addEventListener("languageChanged", () => {
    const activeThumbnail = document.querySelector(".projects-thumbnail.active");
    const activeIndex = Array.from(thumbnails).indexOf(activeThumbnail);
    if (activeIndex !== -1) {
      updateProjectDescription(activeIndex);
    }
  });
}
