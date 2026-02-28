import { recursiveUserSearch } from "../features/recursiveUserSearch.js";
import { startMFA } from "./mfaStart.js";

export function login() {
  let username = prompt(`Enter username:`);
  if (username === null) return;

  const result = recursiveUserSearch(username);

  if (!result.found) {
    alert(`Access denied: ${result.reason}`);
    return;
  }

  const user = result.user;

  // Check if user is locked or pending
  if (user.status === "LOCKED") {
    alert(`User "${user.username}" is locked. Admin override required.`);
    return;
  }

  if (user.status === "PENDING") {
    alert(`User "${user.username}" is pending approval. Access denied.`);
    return;
  }

  // Start MFA sequence
  startMFA(user);
}
