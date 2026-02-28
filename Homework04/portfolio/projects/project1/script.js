const orderType = document.getElementById("order-type");
const dateInput = document.getElementById("delivery-date");
const timeInput = document.getElementById("delivery-time");
const textArea = document.getElementById("notes");
const noteEl = document.getElementById("delivery-note");
const tipSelect = document.getElementById("tip");
const customTipContainer = document.getElementById("custom-tip-container");
const customTipInput = document.getElementById("custom-tip");
const form = document.getElementById("order-form");
const resetBtn = document.querySelector(".reset-btn");
const modal = document.getElementById("reset-modal");
const confirmReset = document.getElementById("confirm-reset");
const cancelReset = document.getElementById("cancel-reset");

// ==================================================
// Dynamic Required Fields Based on Order Type
// ==================================================
const deliveryFields = [
  {
    input: document.getElementById("address"),
    marker: document.querySelector('label[for="address"] .required'),
  },
  {
    input: document.getElementById("apartment"),
    marker: document.querySelector('label[for="apartment"] .required'),
  },
  {
    input: document.getElementById("delivery-date"),
    marker: document.querySelector('label[for="delivery-date"] .required'),
  },
  {
    input: document.getElementById("delivery-time"),
    marker: document.querySelector('label[for="delivery-time"] .required'),
  },
];

function updateRequiredFields() {
  const ifDelivery = orderType.value === "delivery";

  deliveryFields.forEach(({ input, marker }) => {
    input.required = ifDelivery;
    marker.textContent = ifDelivery ? "*" : "";
  });
}

// Listener for dropdown change
orderType.addEventListener("change", updateRequiredFields);
updateRequiredFields();

// ==================================================
// Add or remove the "empty" class based on whether the input has a value
// ==================================================
function updateEmptyClass(input) {
  if (input.value === "") {
    input.classList.add("empty");
  } else {
    input.classList.remove("empty");
  }
}

// Initial run
updateEmptyClass(dateInput);
updateEmptyClass(timeInput);

// Listener for any changes in the inputs
["input", "change"].forEach((eventName) => {
  dateInput.addEventListener(eventName, () => updateEmptyClass(dateInput));
  timeInput.addEventListener(eventName, () => updateEmptyClass(timeInput));
});

// ==================================================
// Date and Time Restrictions
// ==================================================
// Get today's date in YYYY-MM-DD format
function getTodayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Get time + 30 minutes in HH:MM
function getTimePlus30() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 30);
  return now.toTimeString().slice(0, 5);
}

// Update the displayed message
function updateEarliestMessage() {
  const earliest = getTimePlus30();
  noteEl.textContent = `Earliest possible delivery: ${earliest} today.`;
}

// Update restrictions on both date and time
function updateRestrictions() {
  const today = getTodayDate();
  const earliest = getTimePlus30();

  if (dateInput.value === today) {
    timeInput.min = earliest;
  } else {
    timeInput.min = "";
  }
}

// Set min date
dateInput.min = getTodayDate();

// Listener for date change
dateInput.addEventListener("change", updateRestrictions);

// Initial run
updateEarliestMessage();
updateRestrictions();

// Auto-update every minute
setInterval(() => {
  updateEarliestMessage();
  updateRestrictions();
}, 60 * 1000);

// =================================================
// Show/Hide Custom Tip Input
// =================================================
// Listener for changes on the Tip dropdown
tipSelect.addEventListener("change", function () {
  // If user selects "Custom", show the custom tip input and make it required
  if (this.value === "custom") {
    customTipContainer.classList.remove("hidden");
    customTipInput.required = true;
  } else {
    customTipContainer.classList.add("hidden");
    customTipInput.required = false;
    customTipInput.value = "";
  }
});

// =================================================
// Proper Form Reset Handling
// =================================================
form.addEventListener("reset", function () {
  setTimeout(() => {
    // Recalculate "empty" class states for all fields that use it
    [dateInput, timeInput, textArea].forEach(
      (input) => input && updateEmptyClass(input)
    );

    // Hide custom tip field if it was visible
    customTipContainer.classList.add("hidden");
    customTipInput.required = false;
  }, 0);
});

// =================================================
// Custom Modal for Form Reset
// =================================================
/* Open Modal */
resetBtn.addEventListener("click", function (e) {
  e.preventDefault();
  modal.classList.add("show");
});

/* Close Modal */
function closeModal() {
  modal.classList.remove("show");
}

/* Confirm Reset */
confirmReset.addEventListener("click", function () {
  closeModal();
  form.reset();
});

/* Cancel Button */
cancelReset.addEventListener("click", closeModal);

/* Click Outside to Close */
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

/* Click ESC Key to Close */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});
