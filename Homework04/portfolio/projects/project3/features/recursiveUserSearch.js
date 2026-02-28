import { bankData } from "../data/bankData.js";

// ⚠️ VERY IMPORTANT NOTE ⚠️

// - Binary search only works if data is sorted.
// - bankData.users MUST always be sorted alphabetically by username.

export function recursiveUserSearch(
  username,
  left = 0,
  right = bankData.users.length - 1
) {
  // BASE CASE: NOT FOUND
  if (left > right) {
    return {
      found: false,
      reason: "NOT_FOUND",
      user: null,
    };
  }

  let middle = Math.floor((left + right) / 2);
  let currentUser = bankData.users[middle];

  if (!currentUser || !currentUser.username) {
    return {
      found: false,
      reason: "NOT_FOUND",
      user: null,
    };
  }

  if (currentUser.username === username) {
    if (currentUser.status === "ACTIVE") {
      return { found: true, reason: "ACTIVE", user: currentUser };
    }

    if (currentUser.status === "LOCKED") {
      return { found: false, reason: "LOCKED", user: currentUser };
    }

    if (currentUser.status === "DELETED") {
      return { found: false, reason: "DELETED", user: currentUser };
    }

    if (currentUser.status === "PENDING") {
      return { found: false, reason: "PENDING", user: currentUser };
    }

    return { found: false, reason: "UNKNOWN_STATE", user: currentUser };
  }

  if (username < currentUser.username) {
    return recursiveUserSearch(username, left, middle - 1);
  }

  if (username > currentUser.username) {
    return recursiveUserSearch(username, middle + 1, right);
  }

  return {
    found: false,
    reason: "NOT_FOUND",
    user: null,
  };
}
