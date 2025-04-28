export function setupTimeline() {
  const section = document.querySelector("#formations");
  const wrapper = document.querySelector(".formation-scroll-wrapper");
  const steps = document.querySelectorAll(".formation-item");
  const progressLine = document.querySelector(".progress-line");

  if (!section || !wrapper || !steps.length || !progressLine) return;

  let ticking = false;

  function handleScroll() {
    const wrapperTop = wrapper.offsetTop;
    const wrapperHeight = wrapper.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    const start = wrapperTop;
    const end = start + wrapperHeight - windowHeight;
    const totalScrollableDistance = end - start;

    // On vérifie si on est dans la zone de la section
    if (scrollY >= start && scrollY <= end) {
      // Fixer la section en haut de la page
      section.classList.add("sticky");
    } else {
      // Relâcher la section dès que l'on sort de la zone sticky
      section.classList.remove("sticky");
    }

    // Calcul de la progression de la barre de progression
    if (scrollY < start) {
      // Avant la section : réinitialiser la barre et les étapes
      progressLine.style.width = `0%`;
      steps.forEach((step) => step.classList.remove("active"));
    } else if (scrollY >= end) {
      // Après la section : barre pleine et toutes les étapes activées
      progressLine.style.width = `100%`;
      steps.forEach((step) => step.classList.add("active"));
    } else {
      // Pendant la section : calculer la progression
      const scrolled = scrollY - start;
      const progress = scrolled / totalScrollableDistance;
      progressLine.style.width = `${progress * 100}%`;

      const progressWidth = progressLine.offsetWidth;

      // Activation progressive des étapes
      steps.forEach((step) => {
        const circleLeft = step.offsetLeft + step.offsetWidth / 2;
        if (progressWidth >= circleLeft) {
          step.classList.add("active");
        } else {
          step.classList.remove("active");
        }
      });
    }

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });

  // Lancer au chargement
  handleScroll();
}
