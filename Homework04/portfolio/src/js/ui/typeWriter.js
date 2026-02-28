export function typeWriterEffect(element, text, speed = 100, delay = 1500) {
  element.textContent = "";
  element.classList.add("typing-cursor");

  let i = 0;
  let isDeleting = false;

  function type() {
    if (isDeleting) {
      element.textContent = text.substring(0, i - 1);
      i--;
    } else {
      element.textContent = text.substring(0, i + 1);
      i++;
    }

    if (!isDeleting && i === text.length) {
      isDeleting = true;
      setTimeout(type, delay);
    } else if (isDeleting && i === 0) {
      isDeleting = false;
      setTimeout(type, delay);
    } else {
      setTimeout(type, speed);
    }
  }

  setTimeout(type, delay);
}
