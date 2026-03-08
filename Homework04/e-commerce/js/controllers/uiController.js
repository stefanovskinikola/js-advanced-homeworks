import { createElement, icon } from "../utils/dom.js";

// Navigation Highlighting
const updateActiveNavLink = (navLinks) => {
  const navHeight = document.getElementById("mainNav")?.offsetHeight ?? 0;
  const scrollPosition = window.scrollY + navHeight + 24;
  const nearPageBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 100;

  let activeSectionId = "";

  if (nearPageBottom) {
    const lastVisibleSectionId = [...navLinks]
      .map((navLink) => navLink.getAttribute("href")?.slice(1))
      .filter(Boolean)
      .reverse()
      .find((sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        return sectionElement && !sectionElement.classList.contains("d-none");
      });

    activeSectionId = lastVisibleSectionId ?? "";
  }

  if (!activeSectionId) {
    navLinks.forEach((navLink) => {
      const sectionId = navLink.getAttribute("href")?.slice(1);
      if (!sectionId) return;

      const sectionElement = document.getElementById(sectionId);
      if (!sectionElement || sectionElement.classList.contains("d-none"))
        return;

      const sectionTop = sectionElement.offsetTop;
      const sectionBottom = sectionTop + sectionElement.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSectionId = sectionId;
      }
    });
  }

  navLinks.forEach((navLink) => {
    const isActive = navLink.getAttribute("href") === `#${activeSectionId}`;
    navLink.classList.toggle("active", isActive);
    navLink.setAttribute("aria-current", isActive ? "page" : "false");
  });
};

// Back to Top
let backToTopButton = null;

const updateBackToTopVisibility = () => {
  if (!backToTopButton) return;
  const isVisible = window.scrollY > 300;
  backToTopButton.classList.toggle("opacity-0", !isVisible);
  backToTopButton.classList.toggle("invisible", !isVisible);
  backToTopButton.classList.toggle("opacity-100", isVisible);
  backToTopButton.classList.toggle("visible", isVisible);
};

export const createBackToTopButton = () => {
  if (document.querySelector(".back-to-top")) return;

  backToTopButton = createElement(
    "button",
    {
      type: "button",
      className:
        "back-to-top btn btn-primary shadow border-0 position-fixed bottom-0 end-0 m-3 rounded-circle d-inline-flex align-items-center justify-content-center p-0 opacity-0 invisible z-3",
      title: "Back to top",
      style: {
        width: "48px",
        height: "48px",
      },
    },
    icon("fa-solid fa-arrow-up"),
  );

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.body.appendChild(backToTopButton);
};

// Single scroll listener for navigation highlighting and back-to-top
export const initializeScrollListeners = () => {
  const navLinks = Array.from(
    document.querySelectorAll('#mainNav .nav-link[href^="#"]'),
  );
  if (!navLinks.length) return;

  if (document.body.dataset.navHighlightInitialized === "true") {
    updateActiveNavLink(navLinks);
    return;
  }

  const onScroll = () => {
    updateActiveNavLink(navLinks);
    updateBackToTopVisibility();
  };

  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", () => {
      navLinks.forEach((linkElement) => {
        linkElement.classList.toggle("active", linkElement === navLink);
        linkElement.setAttribute(
          "aria-current",
          linkElement === navLink ? "page" : "false",
        );
      });
    });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("hashchange", () => updateActiveNavLink(navLinks));

  document.body.dataset.navHighlightInitialized = "true";
  onScroll();
};

// Search Helpers
export const clearSearchInputs = () => {
  const input = document.getElementById("searchInput");
  if (input) input.value = "";
};
