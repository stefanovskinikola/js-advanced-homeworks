export function initNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");
  const header = document.querySelector("header");
  const linkMap = new Map();

  const headerHeight = header.offsetHeight;
  let isScrollingManual = false;

  navLinks.forEach((link) => {
    const id = link.getAttribute("href").replace("#", "");
    if (id) linkMap.set(id, link);

    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      isScrollingManual = true;

      const targetPosition = targetSection.offsetTop - headerHeight;
      window.scrollTo({ top: targetPosition });

      navLinks.forEach((link) => link.classList.remove("active"));
      link.classList.add("active");

      setTimeout(() => {
        isScrollingManual = false;
      }, 500);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      if (isScrollingManual) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetLink = linkMap.get(entry.target.id);
          if (targetLink) {
            navLinks.forEach((link) => link.classList.remove("active"));
            targetLink.classList.add("active");
          }
        }
      });
    },
    {
      root: null,
      rootMargin: `-${headerHeight}px 0px -60% 0px`,
      threshold: 0,
    },
  );

  sections.forEach((section) => observer.observe(section));
}
