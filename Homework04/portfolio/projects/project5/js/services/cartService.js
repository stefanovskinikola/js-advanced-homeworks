import { CartItem } from "../models/CartItem.js";
import { Product } from "../models/Product.js";
import { FREE_SHIPPING_MIN, SHIPPING_FEE } from "../config.js";

// Cart Persistence
const saveCartItems = (cartItems) => {
  try {
    localStorage.setItem("goodsvault_cart", JSON.stringify(cartItems));
  } catch {
    console.warn("Failed to save cart to localStorage.");
  }
};

const loadCartItems = () => {
  try {
    const storedCartJson = localStorage.getItem("goodsvault_cart");
    if (!storedCartJson) return [];

    const parsedCartItems = JSON.parse(storedCartJson);
    if (!Array.isArray(parsedCartItems)) return [];

    return parsedCartItems
      .map(({ product, quantity }) => {
        if (!product) return null;
        return new CartItem(new Product(product), Number(quantity) || 1);
      })
      .filter(Boolean);
  } catch {
    return [];
  }
};

// Cart calculations
const getCartSubtotal = (cartItems) =>
  cartItems.reduce((sum, cartItem) => sum + cartItem.lineTotal, 0);

const getCartShipping = (cartItems) => {
  if (!cartItems.length) return 0;
  return getCartSubtotal(cartItems) >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE;
};

const getCartTotals = (cartItems) => {
  const subtotal = getCartSubtotal(cartItems);
  const shipping =
    cartItems.length && subtotal < FREE_SHIPPING_MIN ? SHIPPING_FEE : 0;

  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
  };
};

const getCartItemCount = (cartItems) =>
  cartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0);

// Listeners
const listeners = [];

const notify = () => {
  saveCartItems(cart);
  listeners.forEach((listener) => listener(cart));
};

// Cart State
let cart = [];

export const init = () => {
  cart = loadCartItems();
};

export const onChange = (listener) => {
  listeners.push(listener);
};

export const addItem = (product, quantity = 1) => {
  const existingItem = cart.find(
    (cartItem) => cartItem.product.id === product.id,
  );

  if (existingItem) {
    existingItem.quantity = Math.min(
      existingItem.quantity + quantity,
      existingItem.product.stock,
    );
    notify();
    return { action: "incremented", item: existingItem };
  }

  const item = new CartItem(product, Math.min(quantity, product.stock));
  cart.push(item);
  notify();
  return { action: "added", item };
};

export const removeItem = (productId) => {
  cart = cart.filter((cartItem) => cartItem.product.id !== productId);
  notify();
};

export const updateQuantity = (productId, quantity) => {
  const item = cart.find((cartItem) => cartItem.product.id === productId);
  if (!item) return;

  const clampedQuantity = Math.max(1, Math.min(quantity, item.product.stock));
  item.quantity = clampedQuantity;
  notify();
};

// Getters
export const getItems = () => [...cart];

export const getSubtotal = () => getCartSubtotal(cart);

export const getShipping = () => getCartShipping(cart);

export const getTotals = () => getCartTotals(cart);

export const getTotal = () => getTotals().total;

export const getItemCount = () => getCartItemCount(cart);

export const clearCart = () => {
  cart = [];
  notify();
};

export const hasItems = () => cart.length > 0;
