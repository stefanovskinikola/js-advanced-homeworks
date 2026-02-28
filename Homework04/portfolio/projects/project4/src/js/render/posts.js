import { fetchTexts, fetchImages } from "../api/api.js";
import {
  SPINNER_SVG,
  HEART_SVG,
  COMMENT_SVG,
  SHARE_SVG,
} from "../../svg/icons.js";
import { getSelectedProfile } from "../helpers/storage.js";

export async function renderPosts() {
  const postsSection = document.querySelector(".posts-section");

  if (!postsSection) return;

  postsSection.innerHTML = `<p class="loading-message">${SPINNER_SVG} Loading posts...</p>`;

  try {
    const POSTS_COUNT = 5;

    const [textsData, imagesData] = await Promise.all([
      fetchTexts(POSTS_COUNT),
      fetchImages(POSTS_COUNT),
    ]);

    postsSection.innerHTML = "";

    textsData.forEach((textItem, index) => {
      const showImage = Math.random() > 0.5;
      const imageUrl = `${imagesData[index].url}?random=${index}`;
      const postContent = textItem.content;

      const user = getSelectedProfile();

      const timeAgo = ["2 hours", "4 hours", "10 hours", "1 day", "2 days"][
        index
      ];

      const post = `
            <div class="post">
              <div class="post-user">
                <img src="${user.profileImage}" />
                <div class="post-user-details">
                  <h3>${user.firstname} ${user.lastname}</h3>
                  <p>${timeAgo} ago</p>
                </div>
              </div>
              <div class="post-content">${postContent}</div>
              ${
                showImage
                  ? `<div class="post-image">
                <img src="${imageUrl}" />
              </div>`
                  : ""
              }
              <div class="separator"></div>
              <div class="post-actions">
                <button class="like">${HEART_SVG} Like</button>
                <button class="comment">${COMMENT_SVG} Comment</button>
                <button class="share">${SHARE_SVG} Share</button>
              </div>
            </div>`;

      postsSection.innerHTML += post;
    });
  } catch (error) {
    postsSection.innerHTML = `<p class="loading-message error">Failed to load posts.</p>`;
    console.error("Error loading posts:", error);
  }
}
