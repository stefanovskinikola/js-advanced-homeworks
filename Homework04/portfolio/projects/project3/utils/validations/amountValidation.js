export function validateAmount(amount) {
  return !isNaN(amount) && amount > 0;
}
