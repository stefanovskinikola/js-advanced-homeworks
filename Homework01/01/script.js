// DOM elements selection
const form = document.querySelector("#studentForm");
const inputs = form.querySelectorAll("input");
const studentList = document.querySelector("#studentList");

// state
const database = [];

// student generator
function generateStudent(firstName, lastName, age, email) {
  return {
    firstName,
    lastName,
    age: +age,
    email,

    toString() {
      return `<b>${this.firstName} ${this.lastName}</b> (${this.age}) - ${this.email}`;
    },
  };
}

// UI handlers
function clearFieldError(inputId) {
  const input = document.querySelector(`#${inputId}`);
  const group = input.closest(".input-group");
  const errorList = document.querySelector(`#${inputId}Error`);

  group.classList.remove("error");
  errorList.innerHTML = "";
}

function addError(inputId, message) {
  const input = document.querySelector(`#${inputId}`);
  const group = input.closest(".input-group");
  const errorList = document.querySelector(`#${inputId}Error`);

  group.classList.add("error");

  if (errorList.innerHTML === "") {
    const li = document.createElement("li");
    li.textContent = message;
    errorList.appendChild(li);
  }
}

function renderDatabase() {
  studentList.innerHTML = "";
  database.forEach((student) => {
    const li = document.createElement("li");
    li.innerHTML = student.toString();
    studentList.appendChild(li);
  });
}

// validation helpers
const isValidLength = (value) => value && value.trim().length >= 2;
const isValidAge = (age) => +age >= 15 && +age <= 45;
const isValidEmail = (email) =>
  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email);

// validation controller
function validateField(input) {
  const value = input.value.trim();
  const id = input.id;
  let valid = true;
  let message = "";

  clearFieldError(id);

  if (id === "firstName") {
    if (!isValidLength(value)) {
      valid = false;
      message = "First name must be at least 2 characters.";
    }
  } else if (id === "lastName") {
    if (!isValidLength(value)) {
      valid = false;
      message = "Last name must be at least 2 characters.";
    }
  } else if (id === "age") {
    if (!isValidAge(value)) {
      valid = false;
      message = "Age must be between 15 and 45.";
    }
  } else if (id === "email") {
    if (!isValidEmail(value)) {
      valid = false;
      message = "Please enter a valid email address.";
    }
  }

  if (!valid) {
    addError(id, message);
    return false;
  }

  return true;
}

// handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  let isFormValid = true;

  inputs.forEach((input) => {
    const isFieldValid = validateField(input);
    if (!isFieldValid) {
      isFormValid = false;
    }
  });

  if (isFormValid) {
    const firstName = document.querySelector("#firstName").value.trim();
    const lastName = document.querySelector("#lastName").value.trim();
    const age = document.querySelector("#age").value;
    const email = document.querySelector("#email").value.trim();

    const newStudent = generateStudent(firstName, lastName, age, email);
    database.push(newStudent);
    renderDatabase();
    form.reset();
  }
}

// event listeners
inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    validateField(input);
  });

  input.addEventListener("input", () => {
    clearFieldError(input.id);
  });
});

form.addEventListener("submit", handleFormSubmit);
