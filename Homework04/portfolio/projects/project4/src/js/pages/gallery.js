import { getSelectedProfile } from "../helpers/storage.js";
import { createModalController } from "../modules/modal.js";
import { renderProfileHeader } from "../render/profile-header.js";
import { renderBio } from "../render/bio.js";
import { renderGallery } from "../render/gallery.js";

export function initGalleryPage() {
  const storedData = getSelectedProfile();
  const btnProfile = document.querySelector(".btn-profile");

  if (!storedData) {
    location.href = "index.html";
    return;
  }

  const user = renderProfileHeader();

  if (user) {
    document.title = `${user.firstname} ${user.lastname} Gallery | NexaNext`;
  }

  const modal = createModalController();

  document.addEventListener("click", (event) => {
    const target = event.target;
    const galleryWrapper = target.closest(".gallery-image-wrapper");

    if (target.classList.contains("profile-image")) {
      modal.openModal(target.src);
      modal.hideNavButtons();
    } else if (galleryWrapper) {
      modal.showNavButtons();

      const allWrappers = Array.from(
        document.querySelectorAll(".gallery-image-wrapper"),
      );
      const index = allWrappers.indexOf(galleryWrapper);

      const allImages = document.querySelectorAll(".gallery-image");
      const images = Array.from(allImages).map((img) => img.src);

      modal.openGalleryModal(index, images);
    }
  });

  if (btnProfile) {
    btnProfile.addEventListener("click", () => {
      const userId = user.id;
      location.href = `profile.html?id=${userId}`;
    });
  }

  renderGallery();
  renderBio();
}
