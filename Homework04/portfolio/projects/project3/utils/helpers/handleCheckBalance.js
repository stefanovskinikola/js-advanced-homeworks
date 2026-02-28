import { checkBalance } from "./checkBalance.js";

export function handleCheckBalance(user, dashboard) {
  if (user.status !== "ACTIVE") {
    alert("User is not active!");
    return dashboard(user);
  }

  checkBalance(user);
  dashboard(user);
}
