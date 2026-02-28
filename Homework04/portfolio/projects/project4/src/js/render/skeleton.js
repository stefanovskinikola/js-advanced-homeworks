export function createSkeletons(container, amount) {
  container.innerHTML = "";
  for (let i = 0; i < amount; i++) {
    const card = document.createElement("div");
    card.classList.add("user-card", "skeleton");
    container.appendChild(card);
  }
}
