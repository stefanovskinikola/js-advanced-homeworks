import { convertCurrency } from "./currencyEngine.js";
import { calculateTax } from "./taxEngine.js";

export function transferFunds(sender, receiver, amount) {
  // Validate amount
  if (isNaN(amount) || amount <= 0) {
    alert(`Invalid transfer amount.`);
    return;
  }

  if (sender.status !== "ACTIVE") {
    alert(`Sender is not active.`);
    return;
  }

  if (receiver.status !== "ACTIVE") {
    alert(`Receiver is not active.`);
    return;
  }

  // Convert amount to receiver currency
  let convertedAmount = convertCurrency(
    amount,
    sender.currency,
    receiver.currency
  );

  // Calculate tax
  let tax = calculateTax(amount, sender.sector, receiver.sector);

  if (amount + tax > sender.balance) {
    alert(`Insufficient funds for transfer including taxes.`);
    return;
  }

  // Deduct from sender
  sender.balance -= amount + tax;
  sender.history.push(
    `Sent ${amount} ${sender.currency} to ${receiver.username} (Tax: ${tax} ${sender.currency})`
  );

  // Add to receiver
  receiver.balance += convertedAmount;
  receiver.history.push(
    `Received ${convertedAmount} ${receiver.currency} from ${sender.username}`
  );

  alert(
    `Transfer successful! ${amount} ${sender.currency} sent from ${sender.username} to ${receiver.username}.`
  );
}
