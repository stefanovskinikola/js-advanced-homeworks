import { dashboard } from "../menu/dashboard.js";

export function mfaCaptchaCheck(user, lockUser) {
  let a = Math.floor(Math.random() * 10);
  let b = Math.floor(Math.random() * 10);

  let answer = prompt(`Captcha: What is ${a} + ${b}?`);
  if (answer === null) {
    lockUser();
    return;
  }

  const numeric = Number(answer);
  if (isNaN(numeric)) {
    alert(`Captcha must be a number`);
    lockUser();
    return;
  }

  if (numeric !== a + b) {
    alert(`Captcha failed`);
    lockUser();
    return;
  }

  alert(`Authentication successful`);
  // Call dashboard at end of successful MFA
  dashboard(user);
}
