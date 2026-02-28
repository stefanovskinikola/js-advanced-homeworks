import { SUN_SVG, MOON_SVG } from "../../svg/icons.js";

function applyTheme(theme, themeToggleBtn) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggleBtn) themeToggleBtn.innerHTML = SUN_SVG;
  } else {
    document.body.classList.remove("dark-mode");
    if (themeToggleBtn) themeToggleBtn.innerHTML = MOON_SVG;
  }
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) return savedTheme;

  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function initTheme() {
  const themeToggleBtn = document.querySelector(".theme-toggle");

  applyTheme(getInitialTheme(), themeToggleBtn);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-mode");
      const newTheme = isDark ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme, themeToggleBtn);
    });
  }
}
