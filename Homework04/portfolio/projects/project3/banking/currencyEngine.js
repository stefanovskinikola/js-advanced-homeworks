import { exchangeRates } from "../data/exchangeRates.js";

export function convertCurrency(amount, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) return amount;

  // Check if exchange rate exists
  if (
    exchangeRates[fromCurrency] &&
    exchangeRates[fromCurrency][toCurrency] !== undefined
  ) {
    return amount * exchangeRates[fromCurrency][toCurrency];
  }

  // Fallback if rate is not defined
  alert(
    `Currency conversion from ${fromCurrency} to ${toCurrency} not defined.`
  );
  return 0;
}
