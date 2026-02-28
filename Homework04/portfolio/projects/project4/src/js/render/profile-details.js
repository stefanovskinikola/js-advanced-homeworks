import {
  GLOBE_SVG,
  EMAIL_SVG,
  PHONE_SVG,
  LOCATION_SVG,
  BIRTHDAY_SVG,
  GENDER_SVG,
} from "../../svg/icons.js";
import { getSelectedProfile } from "../helpers/storage.js";

export function renderProfileDetails() {
  const user = getSelectedProfile();

  if (!user) return;

  const profileDetails = document.querySelector(".about-details");

  if (profileDetails) {
    profileDetails.innerHTML = `
      <li>${GLOBE_SVG}${user.website || "Unknown"}</li>
      <li>${EMAIL_SVG}${user.email || "Unknown"}</li>
      <li>${PHONE_SVG}${user.phone || "Unknown"}</li>
      <li>
        ${LOCATION_SVG}
        ${user.address?.city || user.city || "Unknown"}, 
        ${user.address?.country || user.country || "Unknown"}
      </li>
      <li>${BIRTHDAY_SVG}${user.birthday || "Unknown"}</li>
      <li>${GENDER_SVG}${user.gender || "Unknown"}</li>
    `;
  }
}
