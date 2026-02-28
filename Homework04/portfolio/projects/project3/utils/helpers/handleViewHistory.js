export function handleViewHistory(user, dashboard) {
  if (!user.history || user.history.length === 0) {
    alert("No transactions yet");
  } else {
    alert(user.history.join("\n"));
  }
  dashboard(user);
}
