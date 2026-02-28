import { fetchTexts } from "../api/api.js";
import { SPINNER_SVG } from "../../svg/icons.js";
import { getSelectedProfile, setSelectedProfile } from "../helpers/storage.js";

export async function renderBio() {
  const bioContainer = document.querySelector(".profile-bio");
  const storedUser = getSelectedProfile();

  if (!storedUser) return;

  if (storedUser.bio && storedUser.bio !== "No description provided.") {
    bioContainer.textContent = storedUser.bio;
    return;
  }

  try {
    bioContainer.innerHTML = `<p class="loading-message">${SPINNER_SVG} Loading bio...</p>`;

    const data = await fetchTexts(1, 200);
    const bio = data[0].content;
    bioContainer.textContent = bio;

    storedUser.bio = bio;
    setSelectedProfile(storedUser);
  } catch (error) {
    console.error("Bio load failed:", error);
    bioContainer.textContent = "No description provided.";
  }
}
