export function setupTimeline() {
  const section = document.querySelector(".formation");
  const progressLine = section.querySelector(".progress-line");
  const items = [...section.querySelectorAll(".formation-item")];

  const ACTIVATION_OFFSET = 0.05; // Active l'étape un peu en avance

  function handleScroll() {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const visibleRatio = 0.5; // Début quand 50% de la section est visible
    const triggerStart = sectionTop - windowHeight * (1 - visibleRatio);
    const triggerEnd = sectionTop + sectionHeight - windowHeight * visibleRatio;

    let progress = 0;

    if (scrollY < triggerStart) {
      progress = 0;
    } else if (scrollY > triggerEnd) {
      progress = 1;
    } else {
      const scrollRange = triggerEnd - triggerStart;
      progress = (scrollY - triggerStart) / scrollRange;
    }

    // Mise à jour directe de la barre de progression
    progressLine.style.height = `${progress * 100}%`;

    // Affichage des étapes
    items.forEach((item, index) => {
      const itemTrigger = (index + 1) / items.length;
      if (progress + ACTIVATION_OFFSET >= itemTrigger) {
        item.classList.add("visible");
      } else {
        item.classList.remove("visible");
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleScroll);
  handleScroll();
}
