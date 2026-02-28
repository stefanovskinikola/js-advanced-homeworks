import { mfaPinCheck } from "./mfaPin.js";

export function startMFA(user) {
  // Phase 1: PIN Check
  mfaPinCheck(user, lockUser);

  function lockUser() {
    user.status = "LOCKED";
    alert(
      `User "${user.username}" has been locked due to failed authentication.`
    );
  }
}
