import * as cart from "../services/cartService.js";
import { renderCartPanel, updateCartBadge } from "../renders/cartRenders.js";
import { $cartBody } from "../utils/domRefs.js";

export const refreshCart = () => {
  const items = cart.getItems();
  const totals = cart.getTotals();

  renderCartPanel(items, totals, $cartBody);
  updateCartBadge(cart.getItemCount());
};
