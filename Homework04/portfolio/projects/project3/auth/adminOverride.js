import { recursiveUserSearch } from "../features/recursiveUserSearch.js";

export function adminOverride() {
  let username = prompt(
    `ADMIN OVERRIDE\n\nEnter username to unlock:\n(Cancel to exit)`
  );

  // Exit admin override only if admin cancels
  if (username === null) return;

  const result = recursiveUserSearch(username);

  if (!result.user) {
    alert(`User not found`);
    return adminOverride();
  }

  if (result.user.status !== "LOCKED") {
    alert(`User "${username}" is not locked`);
    return adminOverride();
  }

  if (!confirm(`Unlock user "${username}"?`)) {
    alert(`Action cancelled`);
    return adminOverride();
  }

  result.user.status = "ACTIVE";
  alert(`User "${username}" has been unlocked`);
}
