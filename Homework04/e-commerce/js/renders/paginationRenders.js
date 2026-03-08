import { createElement, icon, clearElement } from "../utils/dom.js";

// Pagination Helpers
const createPaginationItem = ({
  page,
  label,
  isActive = false,
  isDisabled = false,
  ariaLabel,
  iconClasses,
}) => {
  const listItem = createElement("li", {
    className:
      `page-item ${isActive ? "active" : ""} ${isDisabled ? "disabled" : ""}`.trim(),
  });

  listItem.appendChild(
    createElement(
      "a",
      {
        className: "page-link rounded-3 px-3 px-sm-4 py-1",
        href: "#",
        dataset: { page },
        ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
      },
      iconClasses ? icon(iconClasses) : String(label),
    ),
  );

  return listItem;
};

const createPaginationEllipsisItem = () =>
  createElement(
    "li",
    { className: "page-item disabled" },
    createElement(
      "span",
      { className: "page-link rounded-3 px-3 px-sm-4 py-1" },
      "\u2026",
    ),
  );

// Pagination Renderer
export const renderPagination = (currentPage, totalPages, container) => {
  clearElement(container);

  if (totalPages <= 1) return;

  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const fragment = document.createDocumentFragment();

  fragment.appendChild(
    createPaginationItem({
      page: currentPage - 1,
      label: "Previous",
      isDisabled: currentPage === 1,
      ariaLabel: "Previous",
      iconClasses: "fa-solid fa-chevron-left",
    }),
  );

  if (startPage > 1) {
    fragment.appendChild(createPaginationItem({ page: 1, label: "1" }));
    if (startPage > 2) {
      fragment.appendChild(createPaginationEllipsisItem());
    }
  }

  for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
    fragment.appendChild(
      createPaginationItem({
        page: pageNumber,
        label: String(pageNumber),
        isActive: pageNumber === currentPage,
      }),
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      fragment.appendChild(createPaginationEllipsisItem());
    }
    fragment.appendChild(
      createPaginationItem({
        page: totalPages,
        label: String(totalPages),
      }),
    );
  }

  fragment.appendChild(
    createPaginationItem({
      page: currentPage + 1,
      label: "Next",
      isDisabled: currentPage === totalPages,
      ariaLabel: "Next",
      iconClasses: "fa-solid fa-chevron-right",
    }),
  );

  container.appendChild(fragment);
};
