// Utility functions for DOM manipulation and element creation.
const appendChildren = (parent, children) => {
  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    if (typeof child === "string" || typeof child === "number") {
      parent.appendChild(document.createTextNode(String(child)));
    } else if (child instanceof Node) {
      parent.appendChild(child);
    }
  }
};

export const createElement = (tag, attributes = {}, ...children) => {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(attributes)) {
    if (value == null || value === false) continue;

    if (key === "className") {
      element.className = value;
    } else if (key === "dataset") {
      for (const [dataKey, dataValue] of Object.entries(value)) {
        element.dataset[dataKey] = dataValue;
      }
    } else if (key === "style" && typeof value === "object") {
      Object.assign(element.style, value);
    } else if (key === "disabled" || key === "required") {
      element.setAttribute(key, "");
    } else {
      element.setAttribute(key, String(value));
    }
  }

  appendChildren(element, children);
  return element;
};

export const icon = (classes, decorative = false) => {
  const attributes = { className: classes };
  if (decorative) attributes["aria-hidden"] = "true";
  return createElement("i", attributes);
};

export const clearElement = (element) => {
  while (element.firstChild) element.removeChild(element.firstChild);
};

export const createStarRating = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStarCount = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStarCount;

  const fragment = document.createDocumentFragment();
  for (let index = 0; index < fullStars; index++) {
    fragment.appendChild(icon("fa-solid fa-star", true));
  }
  if (halfStarCount) {
    fragment.appendChild(icon("fa-solid fa-star-half-stroke", true));
  }
  for (let index = 0; index < emptyStars; index++) {
    fragment.appendChild(icon("fa-regular fa-star empty", true));
  }
  return fragment;
};
