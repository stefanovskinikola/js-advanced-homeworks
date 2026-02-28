import { sendContactEmail } from "../services/email.js";

export function initContactForm() {
  const form = document.querySelector("#contact form");
  const formElements = form.querySelectorAll("input, textarea");
  const submitBtn = form.querySelector(".btn-submit");
  const resetBtn = document.querySelector(".btn-reset");
  const formMsg = document.querySelector(".form-message");

  const resetModal = document.getElementById("reset-modal");
  const confirmResetBtn = document.getElementById("confirm-reset-btn");
  const cancelResetBtn = document.getElementById("cancel-reset-btn");

  const messageInput = document.getElementById("message");
  const charCurrent = document.querySelector(".char-current");
  const charCounter = document.querySelector(".char-counter");

  function showError(input, message) {
    const wrapper = input.closest(".input-group");
    wrapper.classList.add("error");

    const errorField = wrapper.querySelector(".errorField");
    const li = document.createElement("li");
    li.textContent = message;
    errorField.appendChild(li);
  }

  function clearFieldError(input) {
    const wrapper = input.closest(".input-group");
    wrapper.classList.remove("error");

    const errorField = wrapper.querySelector(".errorField");
    if (errorField) errorField.textContent = "";
  }

  function validateField(input) {
    const id = input.id;
    const value = input.value.trim();

    clearFieldError(input);

    if (id === "first-name") {
      if (!value) {
        showError(input, "First name is required");
        return false;
      } else if (value.length < 2) {
        showError(input, "First name must be at least 2 characters");
        return false;
      }
    }

    if (id === "last-name") {
      if (value.length > 0 && value.length < 2) {
        showError(input, "Last name must be at least 2 characters");
        return false;
      }
    }

    if (id === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        showError(input, "Email is required");
        return false;
      } else if (!emailRegex.test(value)) {
        showError(input, "Please enter a valid email address");
        return false;
      }
    }

    if (id === "phone") {
      const phoneRegex = /^[\d\s\-\+\(\)]*$/;
      if (value.length > 0 && !phoneRegex.test(value)) {
        showError(input, "Please enter a valid phone number");
        return false;
      }
    }

    if (id === "message") {
      if (!value) {
        showError(input, "Message is required");
        return false;
      } else if (value.length > 2000) {
        showError(input, "Message cannot exceed 2000 characters");
        return false;
      }
    }

    return true;
  }

  formElements.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => clearFieldError(input));
  });

  // Modal handlers
  resetBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const hasData = Array.from(formElements).some(
      (input) => input.value.trim() !== "",
    );

    if (!hasData) return;

    resetModal.classList.add("active");
  });

  cancelResetBtn.addEventListener("click", () => {
    resetModal.classList.remove("active");
  });

  confirmResetBtn.addEventListener("click", () => {
    form.reset();
    charCurrent.textContent = "0";
    charCounter.classList.remove("warning", "error");
    formElements.forEach((input) => clearFieldError(input));
    resetModal.classList.remove("active");
  });

  // Character counter
  messageInput.addEventListener("input", () => {
    const currentLength = messageInput.value.length;
    charCurrent.textContent = currentLength;
    messageInput.scrollTop = messageInput.scrollHeight;

    if (currentLength > 1800 && currentLength < 2000) {
      charCounter.classList.remove("error");
      charCounter.classList.add("warning");
    } else if (currentLength >= 2000) {
      charCounter.classList.remove("warning");
      charCounter.classList.add("error");
    } else {
      charCounter.classList.remove("warning");
      charCounter.classList.remove("error");
    }
  });

  // Submit handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isFormValid = true;

    formElements.forEach((input) => {
      if (!validateField(input)) isFormValid = false;
    });

    if (isFormValid) {
      submitBtn.disabled = true;
      resetBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      try {
        await sendContactEmail(form);
        formMsg.textContent =
          "Your message has been sent successfully! I will get back to you as soon as possible";
        formMsg.classList.add("success");
        form.reset();

        setTimeout(() => {
          formMsg.textContent = "";
          formMsg.classList.remove("success");
        }, 5000);
      } catch (error) {
        formMsg.textContent =
          "An error occurred while sending your message. Please try again";
        formMsg.classList.add("error");
        console.error("EmailJS Error:", error);

        setTimeout(() => {
          formMsg.textContent = "";
          formMsg.classList.remove("error");
        }, 5000);
      } finally {
        submitBtn.disabled = false;
        resetBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    }
  });
}
