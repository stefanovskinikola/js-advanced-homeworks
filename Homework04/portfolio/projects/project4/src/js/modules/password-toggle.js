export function initPasswordToggles() {
  document.querySelectorAll(".password-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const input = button.closest(".input-wrapper").querySelector("input");
      input.type = input.type === "password" ? "text" : "password";
      button.querySelector(".password-show").classList.toggle("hidden");
      button.querySelector(".password-hide").classList.toggle("hidden");
      input.focus();
    });
  });
}
