import { validatePIN } from "../validations/pinValidation.js";
import { isUserActive } from "../validations/userValidation.js";

export function changePIN(user) {
  if (!isUserActive(user)) {
    alert("User is not active!");
    return;
  }

  let newPIN = prompt("Enter new 4-digit PIN:");
  if (!validatePIN(newPIN)) {
    alert("Invalid PIN");
    return;
  }

  user.pin = newPIN;
  alert("PIN changed successfully");
}
