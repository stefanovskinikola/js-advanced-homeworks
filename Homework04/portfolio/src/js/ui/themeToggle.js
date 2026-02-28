export function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");

  const updateIcon = () => {
    themeToggle.innerHTML = document.body.classList.contains("dark-mode")
      ? `<i class="fa-regular fa-sun"></i>`
      : `<i class="fa-regular fa-moon"></i>`;
  };

  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return userPrefersDark ? "dark" : "light";
  };

  if (getInitialTheme() === "dark") {
    document.body.classList.add("dark-mode");
  }
  updateIcon();

  themeToggle.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    updateIcon();
  });
}
