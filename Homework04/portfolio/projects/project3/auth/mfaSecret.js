import { mfaCaptchaCheck } from "./mfaCaptcha.js";

export function mfaSecretCheck(user, lockUser) {
  let secret = prompt(`Enter your secret word:`);
  if (secret === null) {
    lockUser();
    return;
  }

  if (secret !== user.secret) {
    alert(`Secret word incorrect`);
    lockUser();
    return;
  }

  mfaCaptchaCheck(user, lockUser);
}
