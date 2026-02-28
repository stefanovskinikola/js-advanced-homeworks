import { ARROW_LEFT_SVG, ARROW_RIGHT_SVG } from "../../svg/icons.js";

export function renderPagination(
  paginationContainer,
  totalPages,
  currentPage,
  onPageChange,
) {
  paginationContainer.innerHTML = "";

  const prevBtn = document.createElement("button");
  prevBtn.innerHTML = ARROW_LEFT_SVG;
  prevBtn.disabled = currentPage === 1;
  prevBtn.classList.add("btn", "btn-pagination");
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  });
  paginationContainer.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("btn", "btn-pagination");
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      onPageChange(i);
    });

    paginationContainer.appendChild(btn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.innerHTML = ARROW_RIGHT_SVG;
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.classList.add("btn", "btn-pagination");
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  });
  paginationContainer.appendChild(nextBtn);
}
