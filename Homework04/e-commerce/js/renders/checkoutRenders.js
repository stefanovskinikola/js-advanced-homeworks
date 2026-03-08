import { createElement, icon, clearElement } from "../utils/dom.js";
import { formatPrice } from "../utils/formatters.js";

// Shipping summary
export const renderShippingSummary = (shippingInfo, container) => {
  clearElement(container);

  container.appendChild(
    createElement(
      "h6",
      { className: "fw-bold mb-2" },
      icon("fa-solid fa-location-dot text-primary me-2"),
      "Shipping To",
    ),
  );
  container.appendChild(
    createElement(
      "p",
      { className: "mb-1" },
      `${shippingInfo.firstName} ${shippingInfo.lastName}`,
    ),
  );
  container.appendChild(
    createElement(
      "p",
      { className: "mb-1 text-muted small" },
      shippingInfo.address,
    ),
  );
  container.appendChild(
    createElement(
      "p",
      { className: "mb-1 text-muted small" },
      `${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}`,
    ),
  );
  container.appendChild(
    createElement(
      "p",
      { className: "mb-0 text-muted small" },
      `${shippingInfo.email} · ${shippingInfo.phone}`,
    ),
  );
};

// Order items
export const renderOrderItems = (items, container) => {
  clearElement(container);
  const fragment = document.createDocumentFragment();

  for (const cartItem of items) {
    const image = createElement("img", {
      src: cartItem.product.image,
      alt: cartItem.product.name,
      width: "48",
      height: "48",
      className: "rounded object-fit-contain bg-light p-1",
    });

    const infoSection = createElement(
      "div",
      { className: "flex-grow-1" },
      createElement(
        "div",
        { className: "fw-semibold small" },
        cartItem.product.name,
      ),
      createElement(
        "div",
        { className: "text-muted small" },
        `Quantity: ${cartItem.quantity} × ${formatPrice(cartItem.product.price)}`,
      ),
    );

    const total = createElement(
      "div",
      { className: "fw-bold small" },
      cartItem.formattedTotal,
    );

    fragment.appendChild(
      createElement(
        "div",
        { className: "d-flex align-items-center gap-3 py-2 border-bottom" },
        image,
        infoSection,
        total,
      ),
    );
  }

  container.appendChild(fragment);
};

// Order totals
export const renderOrderTotals = (totals, container) => {
  clearElement(container);

  const shippingLabel =
    totals.shipping === 0
      ? createElement("span", { className: "text-success" }, "Free")
      : document.createTextNode(formatPrice(totals.shipping));

  const shippingValue = createElement("span", {});
  shippingValue.appendChild(shippingLabel);

  container.appendChild(
    createElement(
      "div",
      { className: "d-flex justify-content-between small mb-1" },
      createElement("span", {}, "Subtotal"),
      createElement("span", {}, formatPrice(totals.subtotal)),
    ),
  );
  container.appendChild(
    createElement(
      "div",
      { className: "d-flex justify-content-between small mb-2" },
      createElement("span", {}, "Shipping"),
      shippingValue,
    ),
  );
  container.appendChild(
    createElement(
      "div",
      { className: "d-flex justify-content-between fw-bold fs-5" },
      createElement("span", {}, "Total"),
      createElement(
        "span",
        { className: "text-primary" },
        formatPrice(totals.total),
      ),
    ),
  );
};
