export function handleSidebar() {
  const header = document.querySelector(".header-container");
  const sidebar = document.querySelector("#sidebar");
  const optionBar = document.querySelector("#option-bar");
  const arrowBar = document.querySelector("#arrow-bar");
  const footer = document.querySelector("footer");

  const isMobile = window.innerWidth <= 1024;
  if (isMobile) {
    header.style.top = "0";

    sidebar?.classList.remove("show");
    optionBar?.classList.remove("show");
    arrowBar?.classList.remove("show");

    return; // ⛔ stop ici, on ne met pas de scroll listener
  }

  let lastScrollY = window.scrollY;
  let headerHidden = false;

  function checkScrollPosition() {
    const headerHeight = header.offsetHeight;

    if (window.scrollY > headerHeight) {
      header.style.top = `-${headerHeight}px`;
      sidebar.classList.add("show");
      optionBar.classList.add("show");
      arrowBar.classList.add("show");
      headerHidden = true;
    } else {
      header.style.top = "0";
      sidebar.classList.remove("show");
      optionBar.classList.remove("show");
      arrowBar.classList.remove("show");
      headerHidden = false;
    }

    // ArrowBar masquée si le footer est visible
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (footerRect.top < windowHeight) {
        arrowBar.classList.remove("show");
      } else if (window.scrollY > headerHeight) {
        arrowBar.classList.add("show");
      }
    }
  }

  window.addEventListener("scroll", () => {
    checkScrollPosition();
    lastScrollY = window.scrollY;
  });

  checkScrollPosition(); // 👈 appel immédiat au chargement

  // Gestion de la surbrillance dans la sidebar
  const sections = document.querySelectorAll("section");
  const sidebarLinks = document.querySelectorAll(".sidebar a");

  function updateActiveLink() {
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
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink(); // 👈 appel immédiat aussi pour la surbrillance
}
