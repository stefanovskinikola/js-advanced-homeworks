import { PRODUCTS_PER_PAGE } from "../config.js";
import * as api from "../services/apiService.js";
import * as cart from "../services/cartService.js";
import {
  renderProductGrid,
  renderSkeletons,
  renderCategoryOptions,
  updateResultsCount,
} from "../renders/productRenders.js";
import { renderProductDetail } from "../renders/productDetailRenders.js";
import { renderPagination } from "../renders/paginationRenders.js";
import { showToast, toggleError } from "../renders/feedback.js";
import { clearElement, createElement, icon } from "../utils/dom.js";
import { state } from "../state.js";
import {
  $grid,
  $pagination,
  $paginationNav,
  $category,
  $modalBody,
} from "../utils/domRefs.js";

// Product Listing & Pagination
const fetchCurrentProductPage = () => {
  const requestArguments = [
    state.currentPage,
    PRODUCTS_PER_PAGE,
    state.currentSort,
  ];

  if (state.searchQuery) {
    return api.searchProducts(state.searchQuery, ...requestArguments);
  }

  if (state.currentCategory !== "all") {
    return api.fetchProductsByCategory(
      state.currentCategory,
      ...requestArguments,
    );
  }

  return api.fetchProducts(...requestArguments);
};

export const loadProducts = async () => {
  renderSkeletons(PRODUCTS_PER_PAGE, $grid);
  toggleError(false);
  $paginationNav?.classList.add("d-none");

  try {
    const result = await fetchCurrentProductPage();

    state.products = result.products;
    state.totalProducts = result.total;

    renderProductGrid(state.products, $grid);
    updateResultsCount(state.products.length, state.totalProducts);

    const totalPages = Math.ceil(state.totalProducts / PRODUCTS_PER_PAGE);
    renderPagination(state.currentPage, totalPages, $pagination);
    $paginationNav?.classList.remove("d-none");
  } catch (error) {
    console.error("Failed to load products:", error);
    clearElement($grid);
    toggleError(true);
  }
};

export const loadCategories = async () => {
  try {
    state.allCategories = await api.fetchCategories();
    renderCategoryOptions(state.allCategories, $category);
  } catch (error) {
    console.error("Failed to load categories:", error);
  }
};

// Best Deals
export const loadBestDeals = async () => {
  const container = document.getElementById("bestDealsGrid");
  if (!container) return;

  try {
    const products = await api.fetchBestDeals();
    const inStockDeals = products
      .filter((product) => product.isInStock)
      .slice(0, 12);

    state.bestDealsProducts = inStockDeals;
    renderProductGrid(inStockDeals, container, {
      showDealBadge: true,
      emptyText: {
        title: "No deals available right now",
        message: "Please check back shortly.",
      },
    });
  } catch (error) {
    console.error("Failed to load best deals:", error);
  }
};

// Product Details
const renderProductDetailLoadingState = () => {
  clearElement($modalBody);
  $modalBody.appendChild(
    createElement(
      "div",
      { className: "text-center py-5" },
      createElement(
        "div",
        { className: "spinner-border text-primary", role: "status" },
        createElement(
          "span",
          { className: "visually-hidden" },
          "Loading\u2026",
        ),
      ),
    ),
  );
};

const renderProductDetailErrorState = () => {
  clearElement($modalBody);
  $modalBody.appendChild(
    createElement(
      "div",
      { className: "text-center py-5 text-danger" },
      icon("fa-solid fa-triangle-exclamation fa-2x mb-3"),
      createElement(
        "p",
        {},
        "Could not load product details. Please try again.",
      ),
    ),
  );
};

const bindProductDetailEvents = (product) => {
  const quantityElement = document.getElementById("detailQty");
  const quantityWrapper = document.querySelector(
    ".qty-control[data-product-id]",
  );
  const addToCartButton = document.querySelector(".btn-add-cart-detail");
  const galleryElement = document.querySelector(".product-detail-gallery");
  const mainImageElement = document.getElementById("detailMainImg");

  if (!quantityElement || !quantityWrapper || !addToCartButton) return;

  const syncQuantity = () => {
    quantityElement.textContent = String(state.detailQty);
  };

  quantityWrapper.addEventListener("click", (event) => {
    if (event.target.closest(".qty-inc")) {
      state.detailQty = Math.min(state.detailQty + 1, product.stock);
      syncQuantity();
      return;
    }

    if (event.target.closest(".qty-dec")) {
      state.detailQty = Math.max(1, state.detailQty - 1);
      syncQuantity();
    }
  });

  addToCartButton.addEventListener("click", () => {
    cart.addItem(product, state.detailQty);
    showToast(`${product.name} added to cart!`, "success");
  });

  if (galleryElement && mainImageElement) {
    galleryElement.addEventListener("click", (event) => {
      const thumbnail = event.target.closest("img[data-src]");
      if (!thumbnail) return;

      mainImageElement.src = thumbnail.dataset.src;
      galleryElement.querySelectorAll("img").forEach((imageElement) => {
        imageElement.classList.remove("active");
      });
      thumbnail.classList.add("active");
    });
  }
};

export const openProductDetail = async (productId) => {
  state.detailQty = 1;
  renderProductDetailLoadingState();

  const modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("productModal"),
  );
  modal.show();

  try {
    const product = await api.fetchProductById(productId);
    renderProductDetail(product, $modalBody);
    bindProductDetailEvents(product);
  } catch (error) {
    console.error("Failed to load product detail:", error);
    renderProductDetailErrorState();
  }
};
