// Fonction pour masquer/afficher sidebar
export function handleSidebar() {
  const header = document.querySelector(".header-container");
  const sidebar = document.querySelector("#sidebar");

  let lastScrollY = window.scrollY;
  let headerHidden = false;

  window.addEventListener("scroll", () => {
    const headerHeight = header.offsetHeight;

    if (window.scrollY > lastScrollY && !headerHidden) {
      if (window.scrollY > headerHeight) {
        header.style.top = `-${headerHeight}px`;
        sidebar.classList.add("show");
        headerHidden = true;
      }
    } else if (window.scrollY < lastScrollY && headerHidden) {
      if (window.scrollY <= 0) {
        header.style.top = "0";
        sidebar.classList.remove("show");
        headerHidden = false;
      }
    }

    lastScrollY = window.scrollY;
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
