import { formatDate } from "../utils/misc/formatDate.js";
import {
  isUserActive,
  isUserLocked,
} from "../utils/validations/userValidation.js";

export function payUtilities(user, dashboard) {
  if (!isUserActive(user)) {
    alert("User is not active!");
    return dashboard(user);
  }
  if (isUserLocked(user)) {
    alert("User is locked. Admin override required.");
    return dashboard(user);
  }

  const bills = ["Life Support", "Fuel", "Internet"];

  for (let bill of bills) {
    let amount = Number(prompt(`Pay ${bill} (${user.currency}):`));
    if (isNaN(amount) || amount <= 0 || amount > user.balance) {
      alert("Invalid payment");
      continue;
    }
    user.balance -= amount;
    user.history.push(
      `Paid ${bill}: ${amount} ${user.currency} at ${formatDate()}`
    );
    alert(`${bill} payment successful`);
  }

  dashboard(user);
}
