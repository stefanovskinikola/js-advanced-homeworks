import { getSelectedProfile } from "../helpers/storage.js";

export function renderProfileHeader() {
  const user = getSelectedProfile();

  if (!user) return null;

  const profileImage = document.querySelector(".profile-image");
  if (profileImage) {
    profileImage.src = user.profileImage;
  }

  const profileName = document.querySelector(".profile-name");
  if (profileName) {
    profileName.textContent = `${user.firstname} ${user.lastname}`;
  }

  const profileWebsite = document.querySelector(".profile-website");
  if (profileWebsite) {
    profileWebsite.textContent = user.website;
    profileWebsite.href = user.website;
    profileWebsite.target = "_blank";
  }

  const btnEmail = document.querySelector(".btn-email");
  if (btnEmail) {
    btnEmail.href = `mailto:${user.email}`;
  }

  const btnCall = document.querySelector(".btn-call");
  if (btnCall) {
    btnCall.href = `tel:${user.phone}`;
  }

  return user;
}
