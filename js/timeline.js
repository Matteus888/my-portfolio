export function setupTimeline() {
  const section = document.querySelector("#formations");
  const steps = document.querySelectorAll(".formation-item");
  const wrapper = document.querySelector(".formation-scroll-wrapper");

  if (!section || steps.length === 0 || !wrapper) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const wrapperTop = wrapper.offsetTop;
    const wrapperHeight = wrapper.offsetHeight;

    const inSection = scrollTop >= wrapperTop && scrollTop <= wrapperTop + wrapperHeight - window.innerHeight;

    if (inSection) {
      section.classList.add("visible");

      const progress = (scrollTop - wrapperTop) / (wrapperHeight - window.innerHeight);
      const stepIndex = Math.floor(progress * steps.length);

      steps.forEach((step, i) => {
        step.classList.toggle("active", i <= stepIndex);
      });
    } else {
      section.classList.remove("visible");
      steps.forEach((step) => step.classList.remove("active"));
      steps[0].classList.add("active");
    }
  });
}
