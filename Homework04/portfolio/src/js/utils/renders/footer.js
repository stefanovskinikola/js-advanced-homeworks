export function renderFooter() {
  const yearEl = document.getElementById("current-year");
  yearEl.textContent = new Date().getFullYear();
}
