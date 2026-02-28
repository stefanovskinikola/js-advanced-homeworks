import { getSelectedProfile } from "../helpers/storage.js";
import { createModalController } from "../modules/modal.js";
import { renderProfileHeader } from "../render/profile-header.js";
import { renderProfileDetails } from "../render/profile-details.js";
import { renderBio } from "../render/bio.js";
import { renderFriends } from "../render/friends.js";
import { renderPosts } from "../render/posts.js";

export function initProfilePage() {
  const storedData = getSelectedProfile();
  const btnGallery = document.querySelector(".btn-gallery");

  if (!storedData) {
    location.href = "index.html";
    return;
  }

  const user = renderProfileHeader();

  if (user) {
    document.title = `${user.firstname} ${user.lastname} Profile | NexaNext`;
  }

  renderProfileDetails();

  const modal = createModalController();

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (
      target.classList.contains("profile-image") ||
      target.closest(".post-image")
    )
      modal.openModal(target.src);
  });

  if (btnGallery) {
    btnGallery.addEventListener("click", () => {
      const userId = user.id;
      location.href = `gallery.html?id=${userId}`;
    });
  }

  renderBio();
  renderFriends();
  renderPosts();
}
