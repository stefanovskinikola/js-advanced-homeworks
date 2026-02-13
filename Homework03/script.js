const buttons = document.querySelectorAll(".nav-btn");
const contents = document.querySelectorAll(".task-content");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const contentId = btn.dataset.task;

    buttons.forEach((b) => b.classList.remove("active"));
    contents.forEach((c) => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(contentId).classList.add("active");

    if (btn.isLoaded) return;

    const scriptPath = btn.dataset.script;
    const script = document.createElement("script");
    script.src = scriptPath;
    script.type = "module";
    document.body.appendChild(script);

    btn.isLoaded = true;
  });
});

buttons[0].click();

export function renderStatus(elementId, status) {
  const container = elementId ? document.getElementById(elementId) : document;
  const els = container.querySelectorAll(".task-body");

  const content =
    status === "loading"
      ? `<span class="loader"></span>`
      : `<span class="error">An error occurred while loading data.</span>`;

  els.forEach((el) => {
    el.innerHTML = content;
  });
}

renderStatus(null, "loading");

export function renderResult(id, html) {
  const el = document.getElementById(id);
  el.innerHTML = html;
}

export function renderList(id, items) {
  if (items.length === 0) {
    renderResult(id, "No results found.");
    return;
  }
  const html = `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  renderResult(id, html);
}
