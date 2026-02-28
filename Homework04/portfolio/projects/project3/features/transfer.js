import { recursiveUserSearch } from "./recursiveUserSearch.js";
import { convertCurrency } from "../banking/currencyEngine.js";
import { calculateTax } from "../banking/taxEngine.js";
import { formatDate } from "../utils/misc/formatDate.js";

export function transferFeature(sender, dashboard) {
  let recipientName = prompt("Enter recipient username:");
  if (!recipientName || recipientName === sender.username) {
    alert("Invalid recipient");
    return dashboard(sender);
  }

  const result = recursiveUserSearch(recipientName);
  if (!result.found) {
    alert(`User not found or cannot receive funds (${result.reason})`);
    return dashboard(sender);
  }

  const recipient = result.user;

  if (recipient.status !== "ACTIVE") {
    alert(`Recipient "${recipient.username}" is not active`);
    return dashboard(sender);
  }

  let amount = Number(prompt(`Enter transfer amount (${sender.currency}):`));
  if (isNaN(amount) || amount <= 0) {
    alert("Invalid amount");
    return dashboard(sender);
  }

  // Calculate tax based on sender and recipient sectors
  let tax = calculateTax(amount, sender.sector, recipient.sector);
  let totalDeduction = amount + tax;

  if (totalDeduction > sender.balance) {
    alert("Insufficient funds including taxes");
    return dashboard(sender);
  }

  // Deduct from sender
  sender.balance -= totalDeduction;
  sender.history.push(
    `Sent ${amount} ${sender.currency} to ${
      recipient.username
    } (Tax: ${tax.toFixed(2)} ${sender.currency}) at ${formatDate()}`
  );

  // Convert amount to recipient currency and credit
  const convertedAmount = convertCurrency(
    amount,
    sender.currency,
    recipient.currency
  );
  recipient.balance += convertedAmount;
  recipient.history.push(
    `Received ${convertedAmount.toFixed(2)} ${recipient.currency} from ${
      sender.username
    } at ${formatDate()}`
  );

  alert("Transfer successful");
  dashboard(sender);
}
