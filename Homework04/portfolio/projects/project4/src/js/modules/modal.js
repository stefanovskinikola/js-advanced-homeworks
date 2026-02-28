export function createModalController(options = {}) {
  const imageModalOverlay = document.querySelector(".image-modal-overlay");
  const modalImageContainer = document.querySelector(".modal-image-container");
  const modalImage = document.querySelector(".modal-image");
  const btnPrev = document.querySelector(".btn-prev");
  const btnNext = document.querySelector(".btn-next");

  let currentImages = [];
  let currentIndex = 0;

  if (modalImageContainer) {
    modalImageContainer.addEventListener("click", (e) => e.stopPropagation());
  }

  function updateModalImage() {
    if (modalImage && currentImages.length > 0) {
      modalImage.src = currentImages[currentIndex];
    }
  }

  function openModal(imageSrc) {
    if (!imageModalOverlay || !modalImage) return;
    modalImage.src = imageSrc;
    imageModalOverlay.classList.add("show");
  }

  function openGalleryModal(index, images) {
    if (!imageModalOverlay) return;

    currentImages = images;
    currentIndex = index;
    updateModalImage();
    imageModalOverlay.classList.add("show");
  }

  function closeModal() {
    if (!imageModalOverlay || !modalImage) return;
    modalImage.src = "";
    imageModalOverlay.classList.remove("show");
  }

  function showNext() {
    currentIndex++;
    if (currentIndex >= currentImages.length) {
      currentIndex = 0;
    }
    updateModalImage();
  }

  function showPrev() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = currentImages.length - 1;
    }
    updateModalImage();
  }

  if (btnNext) {
    btnNext.addEventListener("click", (event) => {
      event.stopPropagation();
      showNext();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", (event) => {
      event.stopPropagation();
      showPrev();
    });
  }

  if (imageModalOverlay) {
    imageModalOverlay.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", (event) => {
    if (!imageModalOverlay || !imageModalOverlay.classList.contains("show"))
      return;

    if (event.key === "Escape") closeModal();

    if (btnNext && !btnNext.classList.contains("hidden")) {
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    }
  });

  return {
    openModal,
    openGalleryModal,
    closeModal,
    showNext,
    showPrev,
    hideNavButtons: () => {
      if (btnPrev) btnPrev.classList.add("hidden");
      if (btnNext) btnNext.classList.add("hidden");
    },
    showNavButtons: () => {
      if (btnPrev) btnPrev.classList.remove("hidden");
      if (btnNext) btnNext.classList.remove("hidden");
    },
  };
}
