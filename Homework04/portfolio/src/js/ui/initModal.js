export function initModal() {
  const imgModal = document.getElementById("image-modal");
  const modalImg = document.querySelector(".modal-img");
  const closeBtn = document.querySelector(".modal-close");
  const resetModal = document.getElementById("reset-modal");

  function openModal(imageSrc) {
    modalImg.src = imageSrc;
    imgModal.classList.add("active");
  }

  function closeModal() {
    imgModal.classList.remove("active");
    resetModal.classList.remove("active");
    modalImg.classList.remove("zoomed");
    modalImg.style.transformOrigin = "center center";
  }

  closeBtn.addEventListener("click", closeModal);

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("project-img")) openModal(e.target.src);
    if (e.target === imgModal || e.target === resetModal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const isImageModalOpen = imgModal.classList.contains("active");
      const isResetModalOpen =
        resetModal && resetModal.classList.contains("active");

      if (isImageModalOpen || isResetModalOpen) closeModal();
    }
  });

  modalImg.addEventListener("click", (e) => {
    if (modalImg.classList.contains("zoomed")) {
      modalImg.classList.remove("zoomed");
      return;
    }

    const rect = modalImg.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    modalImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    modalImg.classList.add("zoomed");
  });
}
