import { createElement, icon, clearElement } from "../utils/dom.js";
import { formatPrice } from "../utils/formatters.js";

// Cart items
const renderCartItemsList = (items) => {
  const itemsWrapper = createElement("div", {
    className: "flex-grow-1 overflow-auto",
  });

  for (const cartItem of items) {
    const quantityControl = createElement(
      "div",
      {
        className: "qty-control qty-control-sm btn-group align-items-stretch",
        role: "group",
        "aria-label": `Quantity controls for ${cartItem.product.name}`,
      },
      createElement(
        "button",
        {
          type: "button",
          className: "qty-dec-cart btn btn-sm btn-outline-secondary",
          dataset: { id: cartItem.product.id },
          "aria-label": "Decrease",
        },
        "\u2212",
      ),
      createElement(
        "span",
        {
          className:
            "qty-value d-inline-flex align-items-center justify-content-center px-2 bg-body-tertiary border-top border-bottom fw-semibold small",
        },
        String(cartItem.quantity),
      ),
      createElement(
        "button",
        {
          type: "button",
          className: "qty-inc-cart btn btn-sm btn-outline-secondary",
          dataset: { id: cartItem.product.id },
          "aria-label": "Increase",
        },
        "+",
      ),
    );

    const infoSection = createElement(
      "div",
      { className: "flex-grow-1 overflow-hidden" },
      createElement(
        "div",
        {
          className: "fw-semibold small text-truncate",
          title: cartItem.product.name,
        },
        cartItem.product.name,
      ),
      createElement(
        "div",
        { className: "fw-bold text-primary small" },
        formatPrice(cartItem.product.price),
      ),
      createElement(
        "div",
        { className: "d-flex align-items-center gap-2 mt-1" },
        quantityControl,
        createElement(
          "span",
          { className: "ms-auto fw-semibold small" },
          cartItem.formattedTotal,
        ),
      ),
    );

    const removeButton = createElement(
      "button",
      {
        className:
          "btn btn-sm btn-outline-danger border-0 ms-2 flex-shrink-0 btn-remove",
        dataset: { id: cartItem.product.id },
        "aria-label": "Remove item",
        title: "Remove",
      },
      icon("fa-solid fa-trash-can"),
    );

    itemsWrapper.appendChild(
      createElement(
        "div",
        {
          className: "d-flex gap-3 p-3 border-bottom align-items-start",
          dataset: { productId: cartItem.product.id },
        },
        createElement("img", {
          src: cartItem.product.image,
          alt: cartItem.product.name,
          width: "70",
          height: "70",
          className:
            "bg-body-secondary rounded-2 object-fit-contain p-1 flex-shrink-0",
        }),
        infoSection,
        removeButton,
      ),
    );
  }

  return itemsWrapper;
};

// Cart footer
const renderCartFooter = (totals) => {
  const shippingContent =
    totals.shipping === 0
      ? createElement("span", { className: "text-success fw-semibold" }, "Free")
      : document.createTextNode(formatPrice(totals.shipping));

  const footer = createElement(
    "div",
    { className: "border-top border-2 p-3 bg-white mt-auto" },
    createElement(
      "div",
      { className: "d-flex justify-content-between mb-1 small" },
      createElement("span", { className: "text-muted" }, "Subtotal"),
      createElement("span", {}, formatPrice(totals.subtotal)),
    ),
  );

  const shippingRow = createElement(
    "div",
    { className: "d-flex justify-content-between mb-2 small" },
    createElement("span", { className: "text-muted" }, "Shipping"),
  );
  const shippingValue = createElement("span", {});
  shippingValue.appendChild(shippingContent);
  shippingRow.appendChild(shippingValue);
  footer.appendChild(shippingRow);

  footer.appendChild(createElement("hr", { className: "my-2" }));
  footer.appendChild(
    createElement(
      "div",
      { className: "d-flex justify-content-between fw-bold fs-5 mb-3" },
      createElement("span", {}, "Total"),
      createElement(
        "span",
        { className: "text-primary" },
        formatPrice(totals.total),
      ),
    ),
  );
  footer.appendChild(
    createElement(
      "button",
      { className: "btn btn-success w-100 btn-checkout" },
      icon("fa-solid fa-lock me-2"),
      " Proceed to Checkout",
    ),
  );
  footer.appendChild(
    createElement(
      "button",
      { className: "btn btn-outline-danger btn-sm w-100 mt-2 btn-clear-cart" },
      icon("fa-solid fa-trash me-1"),
      " Clear Cart",
    ),
  );

  return footer;
};

// Empty cart message
const renderEmptyCart = (container) => {
  clearElement(container);

  container.appendChild(
    createElement(
      "div",
      {
        className:
          "d-flex flex-column align-items-center justify-content-center text-center flex-grow-1 py-5 px-4",
      },
      icon("fa-solid fa-cart-shopping fa-4x text-body-tertiary mb-3"),
      createElement(
        "h5",
        { className: "fw-bold text-muted" },
        "Your cart is empty",
      ),
      createElement(
        "p",
        { className: "text-muted small mb-3" },
        "Looks like you haven't added anything yet.",
      ),
      createElement(
        "button",
        {
          type: "button",
          className: "btn btn-outline-primary btn-sm btn-browse-products-empty",
          "aria-label": "Browse products",
        },
        icon("fa-solid fa-arrow-left me-2"),
        "Browse Products",
      ),
    ),
  );
};

// Renders the cart panel
export const renderCartPanel = (items, totals, container) => {
  clearElement(container);

  if (!items.length) {
    renderEmptyCart(container);
    return;
  }

  container.appendChild(renderCartItemsList(items));
  container.appendChild(renderCartFooter(totals));
};

// Updates the cart badge count
export const updateCartBadge = (count) => {
  document.querySelectorAll(".cart-badge").forEach((badgeElement) => {
    badgeElement.textContent = count;
    badgeElement.classList.toggle("d-none", count === 0);
  });
};
