import { clearCurrentUser } from "../helpers/storage.js";

export function initLogout() {
  const btnLogout = document.querySelector(".btn-logout");

  if (btnLogout) {
    btnLogout.addEventListener("click", (event) => {
      event.preventDefault();
      clearCurrentUser();
      location.href = "index.html";
    });
  }
}
