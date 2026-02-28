import { adminOverride } from "./adminOverride.js";

const ADMIN_USERNAME = "admin";
const ADMIN_PIN = "0000";

export function adminLogin() {
  let username = prompt(`Admin Username:`);
  if (username === null) return;

  let pin = prompt(`Admin PIN:`);
  if (pin === null) return;

  if (username !== ADMIN_USERNAME || pin !== ADMIN_PIN) {
    alert(`Invalid admin credentials`);
    return;
  }

  alert(`Admin access granted`);
  adminOverride();
}
