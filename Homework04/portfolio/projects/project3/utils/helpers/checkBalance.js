export function checkBalance(user, dashboard) {
  alert(`Your balance: ${user.balance.toFixed(2)} ${user.currency}`);
  dashboard(user);
}
