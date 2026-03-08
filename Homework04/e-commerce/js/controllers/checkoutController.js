import * as cart from "../services/cartService.js";
import {
  renderShippingSummary,
  renderOrderItems,
  renderOrderTotals,
} from "../renders/checkoutRenders.js";
import { showToast } from "../renders/feedback.js";
import { clearElement, createElement, icon } from "../utils/dom.js";
import {
  formatPrice,
  formatDate,
  generateOrderId,
} from "../utils/formatters.js";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from "../config.js";
import { state } from "../state.js";
import {
  $checkoutSection,
  $productsSection,
  $heroSection,
  $aboutSection,
  $bestDealsSection,
} from "../utils/domRefs.js";

// Checkout Section Toggle
const togglePageSections = (showCheckout) => {
  $heroSection?.classList.toggle("d-none", showCheckout);
  $productsSection?.classList.toggle("d-none", showCheckout);
  $aboutSection?.classList.toggle("d-none", showCheckout);
  $bestDealsSection?.classList.toggle("d-none", showCheckout);
  $checkoutSection?.classList.toggle("d-none", !showCheckout);
};

export const showProducts = () => {
  togglePageSections(false);
};

export const showCheckout = () => {
  if (!cart.hasItems()) {
    showToast("Your cart is empty.", "warning");
    return;
  }

  togglePageSections(true);
  setCheckoutStep(1);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Checkout Steps
export const setCheckoutStep = (step) => {
  document.querySelectorAll(".checkout-step").forEach((stepElement) => {
    const stepNumber = parseInt(stepElement.dataset.step, 10);
    const isActive = stepNumber === step;
    const isCompleted = stepNumber < step;

    stepElement.classList.toggle("active", isActive);
    stepElement.classList.toggle("completed", isCompleted);
    stepElement.classList.toggle("bg-primary", isActive);
    stepElement.classList.toggle("text-white", isActive || isCompleted);
    stepElement.classList.toggle("bg-success", isCompleted);
    stepElement.classList.toggle(
      "bg-body-secondary",
      !isActive && !isCompleted,
    );
    stepElement.classList.toggle(
      "text-body-secondary",
      !isActive && !isCompleted,
    );
  });

  document.querySelectorAll(".step-connector").forEach((connector, index) => {
    const isActive = index + 1 < step;
    connector.classList.toggle("bg-primary", isActive);
    connector.classList.toggle("bg-body-secondary", !isActive);
  });

  for (let index = 1; index <= 3; index++) {
    document
      .getElementById(`checkoutStep${index}`)
      ?.classList.toggle("d-none", index !== step);
  }
};

// Order Review
export const populateOrderReview = () => {
  const shippingContainer = document.getElementById("shippingSummary");
  const itemsContainer = document.getElementById("orderItemsList");
  const totalsContainer = document.getElementById("orderTotals");

  if (!shippingContainer || !itemsContainer || !totalsContainer) return;
  if (!state.shippingInfo) return;

  const items = cart.getItems();
  const totals = cart.getTotals();

  renderShippingSummary(state.shippingInfo, shippingContainer);
  renderOrderItems(items, itemsContainer);
  renderOrderTotals(totals, totalsContainer);
};

// Place Order
const trySendConfirmationEmail = async (orderId, totals) => {
  const isEmailSdkAvailable = typeof emailjs !== "undefined";

  if (!isEmailSdkAvailable || !state.shippingInfo?.email) {
    return;
  }

  try {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: state.shippingInfo.email,
      to_name: `${state.shippingInfo.firstName} ${state.shippingInfo.lastName}`,
      order_id: orderId,
      order_total: formatPrice(totals.total),
      order_summary: cart
        .getItems()
        .map((cartItem) => `${cartItem.product.name} x${cartItem.quantity}`)
        .join(", "),
    });
  } catch (error) {
    console.warn("Confirmation email failed:", error);
  }
};

const renderConfirmationDetails = (orderId, totals) => {
  const emailElement = document.getElementById("confirmationEmail");
  if (emailElement) {
    emailElement.textContent = `A confirmation was sent to ${state.shippingInfo.email}.`;
  }

  const detailsElement = document.getElementById("confirmationDetails");
  if (!detailsElement) return;

  clearElement(detailsElement);
  detailsElement.appendChild(
    createElement(
      "h6",
      { className: "fw-bold mb-2" },
      icon("fa-solid fa-receipt me-2 text-primary"),
      "Order Summary",
    ),
  );
  detailsElement.appendChild(
    createElement("p", { className: "mb-1 small" }, `Order ID: ${orderId}`),
  );
  detailsElement.appendChild(
    createElement(
      "p",
      { className: "mb-1 small" },
      `Date: ${formatDate(new Date())}`,
    ),
  );
  detailsElement.appendChild(
    createElement(
      "p",
      { className: "mb-0 fw-semibold" },
      `Total Paid: ${formatPrice(totals.total)}`,
    ),
  );
};

export const placeOrder = async () => {
  if (!state.shippingInfo) {
    showToast("Please complete shipping information first.", "warning");
    setCheckoutStep(1);
    return;
  }

  const items = cart.getItems();
  if (!items.length) {
    showToast("Your cart is empty.", "warning");
    showProducts();
    return;
  }

  const totals = cart.getTotals();
  const orderId = generateOrderId();

  await trySendConfirmationEmail(orderId, totals);
  renderConfirmationDetails(orderId, totals);

  cart.clearCart();
  setCheckoutStep(3);
  showToast("Order placed successfully!", "success");
};
