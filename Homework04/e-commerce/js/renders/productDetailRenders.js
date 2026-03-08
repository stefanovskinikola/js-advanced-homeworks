import {
  createElement,
  icon,
  createStarRating,
  clearElement,
} from "../utils/dom.js";
import { capitalize } from "../utils/formatters.js";

// Product Details Info
const createProductDetailBadges = (product) => {
  const badgeElements = [
    createElement(
      "span",
      { className: "badge bg-primary mb-2" },
      capitalize(product.category),
    ),
  ];

  if (product.brand) {
    badgeElements.push(
      createElement(
        "span",
        { className: "badge bg-secondary ms-1 mb-2" },
        product.brand,
      ),
    );
  }

  return badgeElements;
};

const createProductDetailRatingSection = (product) => {
  const ratingSection = createElement("div", {
    className: "star-rating text-warning mb-2",
  });
  ratingSection.appendChild(createStarRating(product.rating));
  ratingSection.appendChild(
    createElement(
      "span",
      { className: "text-muted ms-1" },
      `${product.rating.toFixed(1)} / 5`,
    ),
  );

  return ratingSection;
};

const createProductDetailPriceBlock = (product) => {
  const priceBlock = createElement(
    "div",
    { className: "d-flex align-items-center gap-2 mb-3" },
    createElement(
      "span",
      { className: "fs-3 fw-bold text-primary" },
      product.formattedPrice,
    ),
  );

  if (product.discountPercentage > 0) {
    priceBlock.appendChild(
      createElement(
        "span",
        { className: "text-decoration-line-through text-muted" },
        product.formattedOriginalPrice,
      ),
    );
    priceBlock.appendChild(
      createElement(
        "span",
        { className: "badge bg-danger" },
        `${Math.round(product.discountPercentage)}% OFF`,
      ),
    );
  }

  return priceBlock;
};

const createProductDetailStockRow = (product) => {
  const stockIcon = product.isInStock ? "fa-circle-check" : "fa-circle-xmark";
  const stockRow = createElement(
    "div",
    { className: "d-flex align-items-center gap-2 mb-3" },
    createElement(
      "span",
      { className: `badge ${product.stockBadgeClass} px-3 py-2` },
      icon(`fa-solid ${stockIcon} me-1`),
      ` ${product.stockLabel}`,
    ),
  );

  if (product.stock > 0) {
    stockRow.appendChild(
      createElement(
        "small",
        { className: "text-muted" },
        `(${product.stock} units)`,
      ),
    );
  }

  return stockRow;
};

const createProductDetailActionRow = (product) => {
  const quantityControl = createElement(
    "div",
    {
      className: "qty-control btn-group align-items-stretch",
      dataset: { productId: product.id },
      role: "group",
      "aria-label": "Product quantity controls",
    },
    createElement(
      "button",
      {
        type: "button",
        className: "qty-dec btn btn-outline-secondary",
        "aria-label": "Decrease quantity",
      },
      "\u2212",
    ),
    createElement(
      "span",
      {
        className:
          "qty-value d-inline-flex align-items-center justify-content-center px-3 bg-body-tertiary border-top border-bottom fw-semibold small",
        id: "detailQty",
        "aria-live": "polite",
        "aria-label": "Quantity",
      },
      "1",
    ),
    createElement(
      "button",
      {
        type: "button",
        className: "qty-inc btn btn-outline-secondary",
        "aria-label": "Increase quantity",
      },
      "+",
    ),
  );

  const addToCartButtonAttributes = {
    className: "btn btn-primary btn-lg flex-grow-1 btn-add-cart-detail",
    dataset: { productId: product.id },
  };
  if (!product.isInStock) addToCartButtonAttributes.disabled = true;

  const addToCartButton = createElement(
    "button",
    addToCartButtonAttributes,
    icon("fa-solid fa-cart-plus me-2"),
    product.isInStock ? "Add to Cart" : "Out of Stock",
  );

  return createElement(
    "div",
    { className: "d-flex align-items-center gap-3 mt-4" },
    quantityControl,
    addToCartButton,
  );
};

const renderProductDetailInfo = (product) => {
  const infoColumn = createElement(
    "div",
    { className: "col-md-7" },
    ...createProductDetailBadges(product),
    createElement("h4", { className: "fw-bold mb-1" }, product.name),
    createProductDetailRatingSection(product),
    createProductDetailPriceBlock(product),
    createElement("p", { className: "text-muted mb-3" }, product.description),
    createProductDetailStockRow(product),
  );

  infoColumn.appendChild(createProductDetailActionRow(product));
  return infoColumn;
};

// Product Details Gallery
const renderProductDetailGallery = (product) => {
  const galleryImages = (product.images ?? []).map((image, index) => {
    const imageAttributes = {
      src: image,
      alt: `${product.name} view ${index + 1}`,
      width: "60",
      height: "60",
      className: `bg-body-secondary rounded-2 object-fit-contain p-1 ${index === 0 ? "active" : ""}`,
      dataset: { src: image },
    };
    return createElement("img", imageAttributes);
  });

  const mainImage = createElement("img", {
    src: product.image,
    alt: product.name,
    className:
      "product-detail-img w-100 object-fit-contain bg-body-secondary rounded-3 p-3",
    id: "detailMainImg",
  });

  const imageColumn = createElement(
    "div",
    { className: "col-md-5" },
    mainImage,
  );

  if (product.images && product.images.length > 1) {
    imageColumn.appendChild(
      createElement(
        "div",
        { className: "product-detail-gallery d-flex gap-2 mt-2 overflow-auto" },
        ...galleryImages,
      ),
    );
  }

  return imageColumn;
};

// Product Detail Renderer
export const renderProductDetail = (product, modalBody) => {
  clearElement(modalBody);
  modalBody.appendChild(
    createElement(
      "div",
      { className: "row g-4" },
      renderProductDetailGallery(product),
      renderProductDetailInfo(product),
    ),
  );
};
