import { formatDate } from "../misc/formatDate.js";
import { isUserActive, isUserLocked } from "../validations/userValidation.js";

export function handleDeposit(user, dashboard) {
  if (!isUserActive(user)) {
    alert("User is not active!");
    return dashboard(user);
  }
  if (isUserLocked(user)) {
    alert("User is locked. Admin override required.");
    return dashboard(user);
  }

  let amount = Number(prompt(`Enter deposit amount (${user.currency}):`));
  if (isNaN(amount) || amount <= 0) {
    alert("Invalid deposit amount");
    return dashboard(user);
  }

  user.balance += amount;
  user.history.push(`Deposited ${amount} ${user.currency} at ${formatDate()}`);
  alert(
    `Deposit successful. New balance: ${user.balance.toFixed(2)} ${
      user.currency
    }`
  );

  dashboard(user);
}
