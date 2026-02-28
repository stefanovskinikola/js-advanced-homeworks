import { getCurrentUser } from "../helpers/storage.js";

export function updateAuthUI() {
  const currentUser = getCurrentUser();
  const btnLogin = document.querySelector(".btn-login");
  const btnSignup = document.querySelector(".btn-signup");
  const btnLogout = document.querySelector(".btn-logout");

  if (currentUser) {
    btnLogin.classList.add("hidden");
    btnSignup.classList.add("hidden");
    btnLogout.classList.remove("hidden");
  } else {
    btnLogin.classList.remove("hidden");
    btnSignup.classList.remove("hidden");
    btnLogout.classList.add("hidden");
  }
}
