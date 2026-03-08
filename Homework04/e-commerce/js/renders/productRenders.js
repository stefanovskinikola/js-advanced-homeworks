import {
  createElement,
  icon,
  clearElement,
  createStarRating,
} from "../utils/dom.js";
import { capitalize } from "../utils/formatters.js";

// Product Card
const createProductCardImageWrapper = (product, showDealBadge) => {
  const imageWrapper = createElement(
    "div",
    { className: "card-img-top-wrapper position-relative overflow-hidden" },
    createElement(
      "div",
      { className: "ratio ratio-4x3 bg-body-secondary" },
      createElement("img", {
        src: product.image,
        alt: product.name,
        loading: "lazy",
        className: "w-100 h-100 object-fit-contain p-3",
      }),
    ),
    createElement(
      "span",
      {
        className:
          "badge bg-primary badge-category position-absolute top-0 start-0 mt-2 ms-2 z-2 text-capitalize small",
      },
      capitalize(product.category),
    ),
  );

  if (showDealBadge && product.discountPercentage > 0) {
    imageWrapper.appendChild(
      createElement(
        "span",
        {
          className:
            "badge bg-danger badge-deal fw-bold fs-6 position-absolute top-0 end-0 mt-2 me-2 z-2 px-2 py-1",
        },
        `-${Math.round(product.discountPercentage)}%`,
      ),
    );
  } else {
    imageWrapper.appendChild(
      createElement(
        "span",
        {
          className: `badge ${product.stockBadgeClass} badge-stock position-absolute top-0 end-0 mt-2 me-2 z-2 small`,
        },
        product.stockLabel,
      ),
    );
  }

  return imageWrapper;
};

const createProductCardRatingSection = (product) => {
  const ratingSection = createElement("div", {
    className: "star-rating text-warning mb-2",
    "aria-label": `Rating: ${product.rating.toFixed(1)} out of 5`,
  });

  ratingSection.appendChild(createStarRating(product.rating));
  ratingSection.appendChild(
    createElement(
      "small",
      { className: "text-muted ms-1" },
      `(${product.rating.toFixed(1)})`,
    ),
  );

  return ratingSection;
};

const createProductCardPriceRow = (product) => {
  const priceRow = createElement(
    "div",
    {
      className: "d-flex align-items-center justify-content-between mt-auto",
    },
    createElement(
      "span",
      { className: "text-primary fw-bold fs-5" },
      product.formattedPrice,
    ),
  );

  if (product.discountPercentage > 0) {
    priceRow.appendChild(
      createElement(
        "small",
        { className: "text-decoration-line-through text-muted" },
        product.formattedOriginalPrice,
      ),
    );
  }

  return priceRow;
};

const createProductCardAddToCartButton = (product) => {
  const addToCartButtonAttributes = {
    className: "btn btn-primary btn-sm btn-add-cart mt-2 py-2 w-100",
    dataset: { productId: product.id },
  };
  if (!product.isInStock) addToCartButtonAttributes.disabled = true;

  return createElement(
    "button",
    addToCartButtonAttributes,
    icon("fa-solid fa-cart-plus me-1"),
    product.isInStock ? " Add to Cart" : " Out of Stock",
  );
};

const renderProductCard = (product, { showDealBadge = false } = {}) => {
  const cardBody = createElement(
    "div",
    { className: "card-body d-flex flex-column p-3" },
    createElement(
      "h3",
      { className: "card-title text-truncate-2 fw-semibold mb-1" },
      product.name,
    ),
    createProductCardRatingSection(product),
    createElement(
      "p",
      { className: "text-muted small mb-2 text-truncate-2" },
      product.shortDescription,
    ),
    createProductCardPriceRow(product),
    createProductCardAddToCartButton(product),
  );

  const article = createElement(
    "article",
    {
      className:
        "card product-card h-100 border-0 rounded-3 overflow-hidden shadow",
      dataset: { productId: product.id },
      tabindex: "0",
      role: "button",
      "aria-label": `View ${product.name} — ${product.formattedPrice}`,
    },
    createProductCardImageWrapper(product, showDealBadge),
    cardBody,
  );

  return createElement(
    "div",
    { className: "col-6 col-md-4 col-lg-3" },
    article,
  );
};

// Empty state
const renderProductGridEmptyState = (emptyText) =>
  createElement(
    "div",
    { className: "col-12 text-center py-5" },
    icon("fa-solid fa-box-open fa-3x text-muted mb-3"),
    createElement("h5", { className: "text-muted" }, emptyText.title),
    createElement("p", { className: "text-muted" }, emptyText.message),
  );

// Product Grid
const EMPTY_DEFAULTS = {
  title: "No products found",
  message: "Try adjusting your search or filter.",
};

export const renderProductGrid = (products, container, options = {}) => {
  const { showDealBadge = false, emptyText = EMPTY_DEFAULTS } = options;

  clearElement(container);

  if (!products.length) {
    container.appendChild(renderProductGridEmptyState(emptyText));
    return;
  }

  const fragment = document.createDocumentFragment();

  for (const product of products) {
    fragment.appendChild(renderProductCard(product, { showDealBadge }));
  }

  container.appendChild(fragment);
};

// Skeletons
export const renderSkeletons = (count, container) => {
  clearElement(container);
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < count; index++) {
    const cardBody = createElement(
      "div",
      { className: "card-body p-3 placeholder-wave" },
      createElement("span", { className: "placeholder col-10 mb-2" }),
      createElement("span", { className: "placeholder col-6 mb-2" }),
      createElement("span", {
        className: "placeholder col-4 placeholder-lg mt-3 mb-2",
      }),
      createElement("span", {
        className: "placeholder col-12 placeholder-lg rounded",
      }),
    );

    const card = createElement(
      "div",
      {
        className: "card border-0 rounded-3 overflow-hidden shadow",
        "aria-hidden": "true",
      },
      createElement("div", {
        className: "ratio ratio-4x3 bg-body-secondary",
      }),
      cardBody,
    );

    fragment.appendChild(
      createElement("div", { className: "col-6 col-md-4 col-lg-3" }, card),
    );
  }

  container.appendChild(fragment);
};

// Category Options
export const renderCategoryOptions = (categories, selectElement) => {
  clearElement(selectElement);

  selectElement.appendChild(
    createElement("option", { value: "all" }, "All Categories"),
  );

  for (const category of categories) {
    selectElement.appendChild(
      createElement(
        "option",
        { value: category },
        capitalize(category.replace(/-/g, " ")),
      ),
    );
  }
};

// Results Count
export const updateResultsCount = (shown, total) => {
  const resultsCountElement = document.getElementById("resultsCount");
  if (resultsCountElement) {
    resultsCountElement.textContent = `Showing ${shown} of ${total} products`;
  }
};
