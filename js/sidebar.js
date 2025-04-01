// Fonction pour masquer/afficher sidebar, option-bar et arrow-bar
export function handleSidebar() {
  const header = document.querySelector(".header-container");
  const sidebar = document.querySelector("#sidebar");
  const optionBar = document.querySelector("#option-bar");
  const arrowBar = document.querySelector("#arrow-bar");
  const footer = document.querySelector("footer");

  let lastScrollY = window.scrollY;
  let headerHidden = false;

  window.addEventListener("scroll", () => {
    const headerHeight = header.offsetHeight;

    if (window.scrollY > lastScrollY && !headerHidden) {
      if (window.scrollY > headerHeight) {
        header.style.top = `-${headerHeight}px`;
        sidebar.classList.add("show");
        optionBar.classList.add("show");
        arrowBar.classList.add("show");
        headerHidden = true;
      }
    } else if (window.scrollY < lastScrollY && headerHidden) {
      if (window.scrollY <= 0) {
        header.style.top = "0";
        sidebar.classList.remove("show");
        optionBar.classList.remove("show");
        arrowBar.classList.remove("show");
        headerHidden = false;
      }
    }

    lastScrollY = window.scrollY;

    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (footerRect.top < windowHeight) {
        arrowBar.classList.remove("show");
      } else if (window.scrollY > headerHeight) {
        arrowBar.classList.add("show");
      }
    }
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
}
