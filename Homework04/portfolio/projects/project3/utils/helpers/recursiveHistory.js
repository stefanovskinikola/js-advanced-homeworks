export function recursiveHistory(history, index = 0) {
  if (index >= history.length) return;
  alert(history[index]);
  recursiveHistory(history, index + 1);
}
