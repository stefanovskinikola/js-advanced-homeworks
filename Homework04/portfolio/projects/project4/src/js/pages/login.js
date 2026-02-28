import { getStoredUsers, setCurrentUser } from "../helpers/storage.js";
import { createLoginErrors } from "../state/errors.js";

let loginErrors = createLoginErrors();

function populateErrors(form, errors) {
  form.querySelectorAll(".errorField").forEach((el) => (el.innerHTML = ""));
  form
    .querySelectorAll(".input-group")
    .forEach((el) => el.classList.remove("error"));

  for (let key in errors) {
    const element = form.querySelector(`[name="${key}"]`);
    if (!element) continue;

    const inputGroup = element.closest(".input-group");

    if (errors[key].length > 0) {
      const errorField = inputGroup.querySelector(".errorField");
      inputGroup.classList.add("error");

      errors[key].forEach((error) => {
        const li = document.createElement("li");
        li.textContent = error;
        errorField.appendChild(li);
      });
    }
  }
}

function validateLoginInputs(input, loginForm) {
  const users = getStoredUsers();
  const inputName = input.name;
  const inputValue = input.value.trim();

  loginErrors[inputName] = [];

  if (inputName === "email") {
    if (!inputValue) {
      loginErrors[inputName].push("Email is required.");
    } else {
      const userExists = users.some((u) => u.email === inputValue);
      if (!userExists) {
        loginErrors[inputName].push("No account found with this email.");
      }
    }
  }

  if (inputName === "password") {
    if (!inputValue) {
      loginErrors.password.push("Password is required.");
    } else {
      const emailValue = loginForm.querySelector("#email").value.trim();
      const user = users.find((u) => u.email === emailValue);

      if (user && user.password !== inputValue) {
        loginErrors.password.push("Incorrect password.");
      }
    }
  }
}

export function initLoginPage() {
  const loginForm = document.querySelector(".login-form");

  if (!loginForm) return;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputs = loginForm.querySelectorAll("input");

    inputs.forEach((input) => validateLoginInputs(input, loginForm));
    populateErrors(loginForm, loginErrors);

    const hasErrors = Object.values(loginErrors).some((arr) => arr.length > 0);

    if (!hasErrors) {
      const emailValue = loginForm.querySelector("#email").value.trim();
      const users = getStoredUsers();
      const user = users.find((u) => u.email === emailValue);
      const rememberMe = loginForm.querySelector("#remember-me");

      setCurrentUser(user, rememberMe.checked);

      location.href = "index.html";
    }
  });

  loginForm.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      const inputGroup = input.closest(".input-group");
      const errorField = inputGroup.querySelector(".errorField");

      inputGroup.classList.remove("error");
      if (errorField) errorField.innerHTML = "";
      loginErrors[input.name] = [];
    });
  });
}
