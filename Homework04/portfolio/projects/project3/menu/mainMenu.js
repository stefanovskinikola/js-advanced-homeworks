import { login } from "../auth/login.js";
import { adminLogin } from "../auth/adminLogin.js";

export function mainMenu() {
  let choice = prompt(
    `Welcome to Galactic Ledger!\n` +
      `1. Login\n` +
      `2. Admin Override\n` +
      `3. Exit`
  );

  if (choice === null || choice === "3") return; // Exit

  if (choice === "1") {
    login();
    mainMenu(); // Return after logout
  } else if (choice === "2") {
    adminLogin();
    mainMenu(); // Return after admin override
  } else {
    alert(`Invalid choice`);
    mainMenu(); // Recursive call for invalid input
  }
}
