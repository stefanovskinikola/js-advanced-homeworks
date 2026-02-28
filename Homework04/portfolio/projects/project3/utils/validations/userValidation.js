export function isUserActive(user) {
  return user.status === "ACTIVE";
}

export function isUserLocked(user) {
  return user.status === "LOCKED";
}

export function isUserPending(user) {
  return user.status === "PENDING";
}
