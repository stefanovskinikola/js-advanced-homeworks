import { formatDate } from "../misc/formatDate.js";
import { isUserActive, isUserLocked } from "../validations/userValidation.js";

export function handleWithdraw(user, dashboard) {
  if (!isUserActive(user)) {
    alert("User is not active!");
    return dashboard(user);
  }
  if (isUserLocked(user)) {
    alert("User is locked. Admin override required.");
    return dashboard(user);
  }

  let amount = Number(prompt(`Enter withdrawal amount (${user.currency}):`));
  if (isNaN(amount) || amount <= 0) {
    alert("Invalid withdrawal amount");
    return dashboard(user);
  }
  if (amount > user.balance) {
    alert("Insufficient funds");
    return dashboard(user);
  }
  if (!confirm(`Confirm withdrawal of ${amount} ${user.currency}?`)) {
    return dashboard(user);
  }

  user.balance -= amount;
  user.history.push(`Withdrew ${amount} ${user.currency} at ${formatDate()}`);
  alert(
    `Withdrawal successful. New balance: ${user.balance.toFixed(2)} ${
      user.currency
    }`
  );

  dashboard(user);
}
