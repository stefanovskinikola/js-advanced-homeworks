import { formatDate } from "../utils/misc/formatDate.js";
import { isUserActive } from "../utils/validations/userValidation.js";

export function applyTieredInterest(user, dashboard, months = 12, rate = 0.02) {
  if (!isUserActive(user)) {
    alert("User is not active!");
    return;
  }

  for (let month = 1; month <= months; month++) {
    let interest = user.balance * rate;
    user.balance += interest;
    user.history.push(
      `Month ${month} interest: +${interest.toFixed(2)} ${
        user.currency
      } at ${formatDate()}`
    );
  }

  alert(`Tiered interest applied for ${months} months`);
  dashboard(user);
}
