// DOM elements selection
const form = document.querySelector("#reminderForm");
const inputs = form.querySelectorAll("input, textarea");
const tableContainer = document.querySelector("#tableContainer");
const tableBody = document.querySelector("#reminderTableBody");
const showBtn = document.querySelector("#showBtn");
const separator = document.querySelector(".separator");
const remainderHeading = document.querySelector("h2");

// state
const reminders = [];

// reminder generator
function generateReminder(title, priority, color, description) {
  return {
    title,
    priority: +priority,
    color,
    description,
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

function renderReminders() {
  tableBody.innerHTML = "";

  reminders.forEach((reminder) => {
    const tr = document.createElement("tr");

    const titleTd = document.createElement("td");
    titleTd.textContent = reminder.title;
    titleTd.style.color = reminder.color;

    const priorityTd = document.createElement("td");
    priorityTd.textContent = reminder.priority;

    const descTd = document.createElement("td");
    descTd.textContent = reminder.description;

    tr.appendChild(titleTd);
    tr.appendChild(priorityTd);
    tr.appendChild(descTd);

    tableBody.appendChild(tr);
  });
}

// validation helpers
const isValidLength = (value) => value && value.trim().length >= 5;
const isValidPriority = (prio) => +prio >= 1 && +prio <= 5;

// validation controller
function validateField(input) {
  const value = input.value.trim();
  const id = input.id;
  let valid = true;
  let message = "";

  if (id === "color") return true;

  clearFieldError(id);

  if (id === "title") {
    if (!isValidLength(value)) {
      valid = false;
      message = "Title must be at least 5 characters.";
    }
  } else if (id === "priority") {
    if (!isValidPriority(value)) {
      valid = false;
      message = "Priority must be between 1 and 5.";
    }
  } else if (id === "description") {
    if (!isValidLength(value)) {
      valid = false;
      message = "Description must be at least 5 characters.";
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
    const title = document.querySelector("#title").value.trim();
    const priority = document.querySelector("#priority").value;
    const color = document.querySelector("#color").value;
    const description = document.querySelector("#description").value.trim();

    const newReminder = generateReminder(title, priority, color, description);
    reminders.push(newReminder);

    if (!tableContainer.classList.contains("hidden")) {
      renderReminders();
    }

    form.reset();
  }
}

// handle show button click
function handleShowTable() {
  renderReminders();
  separator.classList.remove("hidden");
  remainderHeading.classList.remove("hidden");
  tableContainer.classList.remove("hidden");
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
showBtn.addEventListener("click", handleShowTable);
