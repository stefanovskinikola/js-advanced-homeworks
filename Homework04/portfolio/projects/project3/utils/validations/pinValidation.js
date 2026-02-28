export function validatePIN(pin) {
  return pin !== null && pin.length === 4 && !isNaN(Number(pin));
}
