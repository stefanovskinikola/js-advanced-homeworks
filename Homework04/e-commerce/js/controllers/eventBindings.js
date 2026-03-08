import * as cart from "../services/cartService.js";
import { showToast } from "../renders/feedback.js";
import { PRODUCTS_PER_PAGE } from "../config.js";
import { state } from "../state.js";
import { loadProducts, openProductDetail } from "./productController.js";
import {
  showCheckout,
  showProducts,
  setCheckoutStep,
  populateOrderReview,
  placeOrder,
} from "./checkoutController.js";
import {
  createBackToTopButton,
  initializeScrollListeners,
  clearSearchInputs,
} from "./uiController.js";
import {
  $cartBody,
  $productsSection,
  $grid,
  $pagination,
  $category,
  $sort,
  $retryBtn,
} from "../utils/domRefs.js";

// Product Filter Events
const debounce = (handler, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => handler(...args), delay);
  };
};

const handleSearch = (query) => {
  state.searchQuery = query;
  state.currentPage = 1;
  loadProducts();
};

const bindProductFilterEvents = () => {
  $category.addEventListener("change", () => {
    state.currentCategory = $category.value;
    state.currentPage = 1;
    state.searchQuery = "";
    clearSearchInputs();
    loadProducts();
  });

  $sort.addEventListener("change", () => {
    state.currentSort = $sort.value;
    state.currentPage = 1;
    loadProducts();
  });

  const searchInput = document.getElementById("searchInput");
  let lastSearchQuery = state.searchQuery ?? "";

  const runSearchIfChanged = (rawQuery) => {
    const query = rawQuery.trim();
    if (query === lastSearchQuery) return;
    lastSearchQuery = query;
    handleSearch(query);
  };

  const debouncedSearch = debounce(runSearchIfChanged, 300);

  searchInput?.addEventListener("input", (event) => {
    debouncedSearch(event.target.value);
  });

  document.getElementById("searchForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    runSearchIfChanged(searchInput?.value ?? "");
  });

  $retryBtn?.addEventListener("click", loadProducts);
};

// Product Pagination Events
const bindProductPaginationEvents = () => {
  $pagination.addEventListener("click", (event) => {
    event.preventDefault();
    const pageLink = event.target.closest("[data-page]");
    if (!pageLink) return;

    const page = parseInt(pageLink.dataset.page, 10);
    if (Number.isNaN(page)) return;

    const totalPages = Math.ceil(state.totalProducts / PRODUCTS_PER_PAGE);
    if (page < 1 || page > totalPages) return;

    state.currentPage = page;
    loadProducts();
    $productsSection?.scrollIntoView({ behavior: "smooth" });
  });
};

// Product Interaction Events (View Details, Add to Cart)
const createCardHandler = (getProducts) => (event) => {
  const addToCartButton = event.target.closest(".btn-add-cart");
  if (addToCartButton) {
    event.stopPropagation();
    const productId = parseInt(addToCartButton.dataset.productId, 10);
    if (Number.isNaN(productId)) return;

    const product = getProducts().find((product) => product.id === productId);
    if (!product) return;

    cart.addItem(product);
    showToast(`${product.name} added to cart!`, "success");
    return;
  }

  const productCard = event.target.closest("[data-product-id]");
  if (!productCard) return;

  const productId = parseInt(productCard.dataset.productId, 10);
  if (Number.isNaN(productId)) return;
  openProductDetail(productId);
};

const bindInteractiveGrid = (gridElement, handleInteraction) => {
  if (!gridElement) return;

  gridElement.addEventListener("click", handleInteraction);
  gridElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleInteraction(event);
    }
  });
};

const bindProductInteractionEvents = () => {
  bindInteractiveGrid(
    $grid,
    createCardHandler(() => state.products),
  );

  const bestDealsGrid = document.getElementById("bestDealsGrid");
  bindInteractiveGrid(
    bestDealsGrid,
    createCardHandler(() => state.bestDealsProducts),
  );
};

// Cart Events
const scrollToProductsAfterCartClose = () => {
  setTimeout(() => {
    $productsSection?.scrollIntoView({ behavior: "smooth" });
  }, 120);
};

const getCartItem = (productId) =>
  cart.getItems().find((cartItem) => cartItem.product.id === productId);

const bindCartEvents = () => {
  $cartBody.addEventListener("click", (event) => {
    if (event.target.closest(".btn-browse-products-empty")) {
      const offcanvasElement = document.getElementById("cartOffcanvas");
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      offcanvas?.hide();
      scrollToProductsAfterCartClose();
      return;
    }

    const cartActionTarget = event.target.closest("[data-id]");
    if (!cartActionTarget) {
      if (event.target.closest(".btn-checkout")) {
        const offcanvas = bootstrap.Offcanvas.getInstance(
          document.getElementById("cartOffcanvas"),
        );
        offcanvas?.hide();
        showCheckout();
        return;
      }

      if (event.target.closest(".btn-clear-cart")) {
        cart.clearCart();
        showToast("Cart cleared.", "info");
      }
      return;
    }

    const productId = parseInt(cartActionTarget.dataset.id, 10);
    if (Number.isNaN(productId)) return;

    const cartItem = getCartItem(productId);

    if (cartActionTarget.classList.contains("qty-inc-cart")) {
      if (cartItem) cart.updateQuantity(productId, cartItem.quantity + 1);
      return;
    }

    if (cartActionTarget.classList.contains("qty-dec-cart")) {
      if (cartItem) cart.updateQuantity(productId, cartItem.quantity - 1);
      return;
    }

    if (cartActionTarget.classList.contains("btn-remove")) {
      cart.removeItem(productId);
      if (cartItem) {
        showToast(`${cartItem.product.name} removed from cart.`, "info");
      }
    }
  });
};

// Checkout Events
const bindShippingFormEvents = () => {
  document
    .getElementById("shippingForm")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      const formData = new FormData(form);

      state.shippingInfo = {
        firstName: String(formData.get("firstName") ?? "").trim(),
        lastName: String(formData.get("lastName") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        phone: String(formData.get("phone") ?? "").trim(),
        address: String(formData.get("address") ?? "").trim(),
        city: String(formData.get("city") ?? "").trim(),
        state: String(formData.get("state") ?? "").trim(),
        zip: String(formData.get("zip") ?? "").trim(),
      };

      populateOrderReview();
      setCheckoutStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
};

const bindCheckoutNavigationEvents = () => {
  document
    .getElementById("backToShopBtn")
    ?.addEventListener("click", showProducts);

  document
    .getElementById("backToShippingBtn")
    ?.addEventListener("click", () => setCheckoutStep(1));

  document
    .getElementById("continueBrowsingBtn")
    ?.addEventListener("click", (event) => {
      event.preventDefault();
      showProducts();
      loadProducts();
    });
};

const bindCheckoutOrderEvents = () => {
  document
    .getElementById("placeOrderBtn")
    ?.addEventListener("click", placeOrder);
};

// UI Events
const bindUiEvents = () => {
  createBackToTopButton();
  initializeScrollListeners();
};

// Initialize All Event Bindings
export const bindEvents = () => {
  bindProductFilterEvents();
  bindProductPaginationEvents();
  bindProductInteractionEvents();
  bindCartEvents();
  bindShippingFormEvents();
  bindCheckoutNavigationEvents();
  bindCheckoutOrderEvents();
  bindUiEvents();
};
