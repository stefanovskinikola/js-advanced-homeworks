import { icon, clearElement } from "../utils/dom.js";

// Toast Notifications
const ICONS = {
  success: "fa-circle-check",
  warning: "fa-triangle-exclamation",
  danger: "fa-circle-xmark",
  info: "fa-circle-info",
};

export const showToast = (message, type = "success") => {
  const toastElement = document.getElementById("appToast");
  const toastBody = document.getElementById("toastBody");
  if (!toastElement || !toastBody) return;

  toastElement.className = `toast align-items-center border-0 text-bg-${type}`;

  clearElement(toastBody);
  toastBody.appendChild(icon(`fa-solid ${ICONS[type] ?? ICONS.info} me-2`));
  toastBody.appendChild(document.createTextNode(` ${message}`));

  const toast = bootstrap.Toast.getOrCreateInstance(toastElement, {
    delay: 5000,
  });
  toast.show();
};

// Error Toggle
export const toggleError = (show) => {
  document.getElementById("errorState")?.classList.toggle("d-none", !show);
};
