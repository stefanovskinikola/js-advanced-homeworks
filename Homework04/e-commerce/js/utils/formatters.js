export const formatPrice = (amount) => `$${Number(amount).toFixed(2)}`;

export const capitalize = (text) =>
  text.replace(/\b\w/g, (character) => character.toUpperCase());

export const generateOrderId = () =>
  `Order-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

export const formatDate = (date = new Date()) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
