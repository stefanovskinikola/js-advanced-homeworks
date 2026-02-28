import { transferFeature } from "../features/transfer.js";
import { payUtilities } from "../features/utilities.js";
import { applyTieredInterest } from "../features/interest.js";

// Helpers
import { handleDeposit } from "../utils/helpers/handleDeposit.js";
import { handleWithdraw } from "../utils/helpers/handleWithdraw.js";
import { checkBalance } from "../utils/helpers/checkBalance.js";
import { handleViewHistory } from "../utils/helpers/handleViewHistory.js";

// Validations
import {
  isUserPending,
  isUserLocked,
} from "../utils/validations/userValidation.js";

// Main Dashboard Menu
export function dashboard(user) {
  if (isUserPending(user)) {
    alert("User account is pending approval. Access denied.");
    return;
  }

  if (isUserLocked(user)) {
    alert("User is locked. Admin override required.");
    return;
  }

  let choice = prompt(
    `Welcome ${user.username}! Select an option:\n` +
      `1. Check Balance\n` +
      `2. Deposit Funds\n` +
      `3. Withdraw Funds\n` +
      `4. Transfer Money\n` +
      `5. View Transaction History\n` +
      `6. Pay Utilities\n` +
      `7. Apply Tiered Interest\n` +
      `8. Change PIN\n` +
      `0. Logout`
  );

  if (choice === null || choice === "0") return; // Logout

  switch (choice) {
    case "1":
      checkBalance(user, dashboard);
      break;
    case "2":
      handleDeposit(user, dashboard);
      break;
    case "3":
      handleWithdraw(user, dashboard);
      break;
    case "4":
      transferFeature(user, dashboard);
      break;
    case "5":
      handleViewHistory(user, dashboard);
      break;
    case "6":
      payUtilities(user, dashboard);
      break;
    case "7":
      applyTieredInterest(user, dashboard);
      break;
    case "8":
      let newPIN = prompt("Enter new 4-digit PIN:");
      if (!newPIN || newPIN.length !== 4 || isNaN(Number(newPIN))) {
        alert("Invalid PIN");
      } else {
        user.pin = newPIN;
        alert("PIN changed successfully");
      }
      dashboard(user);
      break;
    default:
      alert("Invalid choice");
      dashboard(user);
      break;
  }
}
