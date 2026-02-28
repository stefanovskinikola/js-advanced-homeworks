import { mfaSecretCheck } from "./mfaSecret.js";

export function mfaPinCheck(user, lockUser) {
  let pin = prompt(`Enter PIN:`);
  if (pin === null) {
    lockUser();
    return;
  }

  if (pin !== user.pin) {
    alert(`Incorrect PIN`);
    lockUser();
    return;
  }

  mfaSecretCheck(user, lockUser);
}
