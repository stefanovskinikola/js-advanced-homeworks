export function getStoredUsers() {
  return JSON.parse(localStorage.getItem("nexanext_users")) || [];
}

export function setStoredUsers(users) {
  localStorage.setItem("nexanext_users", JSON.stringify(users));
}

export function getSelectedProfile() {
  const data = sessionStorage.getItem("selectedProfile");
  return data ? JSON.parse(data) : null;
}

export function setSelectedProfile(profile) {
  sessionStorage.setItem("selectedProfile", JSON.stringify(profile));
}

export function getCurrentUser() {
  return (
    sessionStorage.getItem("currentUser") || localStorage.getItem("currentUser")
  );
}

export function setCurrentUser(user, remember = false) {
  if (remember) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    sessionStorage.removeItem("currentUser");
  } else {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.removeItem("currentUser");
  }
}

export function clearCurrentUser() {
  sessionStorage.removeItem("currentUser");
  localStorage.removeItem("currentUser");
  sessionStorage.removeItem("selectedProfile");
}
