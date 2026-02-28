import { fetchImages } from "../api/api.js";
import { createSkeletons } from "./skeleton.js";

export async function renderGallery() {
  const galleryGrid = document.querySelector(".grid-layout");

  if (!galleryGrid) return;

  const imageCount = Math.floor(Math.random() * 11) + 10;
  createSkeletons(galleryGrid, imageCount);

  try {
    const imageData = await fetchImages(1);

    galleryGrid.innerHTML = "";

    for (let i = 0; i < imageCount; i++) {
      const imageUrl = `${imageData[0].url}?random=${i}`;

      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("gallery-image-wrapper");

      imageWrapper.innerHTML = `
        <img class="gallery-image" src="${imageUrl}" />
          <div class="overlay">
            <span>some image description here</span>
        </div>`;

      galleryGrid.appendChild(imageWrapper);
    }
  } catch (error) {
    galleryGrid.classList.remove("grid-layout");
    galleryGrid.innerHTML = `<p class="loading-message error">Failed to load images.</p>`;
    console.error("Gallery load failed:", error);
  }
}
