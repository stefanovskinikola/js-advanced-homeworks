import * as cart from "./services/cartService.js";
import { refreshCart } from "./controllers/cartController.js";
import {
  loadBestDeals,
  loadCategories,
  loadProducts,
} from "./controllers/productController.js";
import { bindEvents } from "./controllers/eventBindings.js";

try {
  cart.init();
  cart.onChange(refreshCart);

  bindEvents();
  refreshCart();

  await Promise.all([loadCategories(), loadProducts(), loadBestDeals()]);
} catch (error) {
  console.error("Initialization failed:", error);
}
