import { validateEmail, validateUrl } from "../helpers/validations.js";
import { getStoredUsers, setStoredUsers } from "../helpers/storage.js";
import { createRegisterErrors } from "../state/errors.js";

let errors = createRegisterErrors();

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

function validateRegisterInputs(input, registerForm) {
  const inputName = input.name;
  const inputValue = input.value.trim();

  errors[inputName] = [];

  if (inputName !== "phone") {
    if (input.type === "checkbox" && !input.checked) {
      errors[inputName].push(
        "You must agree to the Terms of Service and Privacy Policy.",
      );
    }

    if (input.type === "radio") {
      const isChecked = registerForm.querySelector(
        `input[name="${inputName}"]:checked`,
      );
      if (!isChecked) {
        errors[inputName].push("Please select a gender.");
      }
    } else if (input.type !== "checkbox" && input.type !== "radio") {
      if (inputValue === "") {
        errors[inputName].push("This field is required.");
      }
    }
  }

  if (inputName === "firstName" || inputName === "lastName") {
    if (inputValue !== "" && inputValue.length < 2) {
      errors[inputName].push("This field must have more than 2 characters.");
    }
  }

  if (inputName === "email" && inputValue !== "") {
    if (!validateEmail(inputValue)) {
      errors[inputName].push("Please enter a valid email address.");
    } else {
      const users = getStoredUsers();
      const emailExists = users.some((user) => user.email === inputValue);

      if (emailExists) {
        errors[inputName].push("This email is already registered.");
      }
    }
  }

  if (inputName === "password" && inputValue !== "") {
    if (inputValue.length < 8) {
      errors[inputName].push("Password must be at least 8 characters.");
    }

    const hasLower = /(?=.*[a-z])/.test(inputValue);
    const hasUpper = /(?=.*[A-Z])/.test(inputValue);
    const hasNumber = /(?=.*\d)/.test(inputValue);
    const hasSpecial = /(?=.*[\W_])/.test(inputValue);

    if (!hasLower)
      errors[inputName].push("Must include at least one lowercase letter.");
    if (!hasUpper)
      errors[inputName].push("Must include at least one uppercase letter.");
    if (!hasNumber) errors[inputName].push("Must include at least one number.");
    if (!hasSpecial)
      errors[inputName].push("Must include at least one special character.");
  }

  if (inputName === "confirmPassword") {
    const passwordInput = registerForm.querySelector("#password");
    if (inputValue !== passwordInput.value) {
      errors[inputName].push("Passwords do not match.");
    }
  }

  if (inputName === "website" && inputValue !== "") {
    if (!validateUrl(inputValue)) {
      errors[inputName].push("Please enter a valid URL");
    }
  }
}

export function initRegisterPage() {
  const registerForm = document.querySelector(".register-form");

  if (!registerForm) return;

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputs = registerForm.querySelectorAll("input, select");

    inputs.forEach((input) => validateRegisterInputs(input, registerForm));
    populateErrors(registerForm, errors);

    const hasErrors = Object.values(errors).some((arr) => arr.length > 0);

    if (!hasErrors) {
      const formData = new FormData(registerForm);
      const newUser = {
        id: `${Date.now()}`,
        firstname: formData.get("firstName"),
        lastname: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
        website: formData.get("website"),
        country: formData.get("country"),
        city: formData.get("city"),
        phone: formData.get("phone"),
        gender: formData.get("gender"),
      };

      const existingUsers = getStoredUsers();
      existingUsers.push(newUser);
      setStoredUsers(existingUsers);

      const successMessage = registerForm.querySelector(".success-message");
      successMessage.textContent =
        "Registration successful! Redirecting to login...";
      successMessage.classList.remove("hidden");
      setTimeout(() => {
        location.href = "login.html";
      }, 2000);
    }
  });

  registerForm.querySelectorAll("input, select").forEach((input) => {
    input.addEventListener("input", () => {
      const inputGroup = input.closest(".input-group");

      inputGroup.classList.remove("error");
      const errorField = inputGroup.querySelector(".errorField");
      if (errorField) errorField.innerHTML = "";

      errors[input.name] = [];
    });

    input.addEventListener("change", (event) => {
      validateRegisterInputs(event.target, registerForm);
      populateErrors(registerForm, errors);
    });
  });
}
