import { fetchUsers, fetchImages } from "../api/api.js";
import { SPINNER_SVG } from "../../svg/icons.js";
import { setSelectedProfile } from "../helpers/storage.js";

export async function renderFriends() {
  const friendsContainer = document.querySelector(".friends-cards");

  if (!friendsContainer) return;

  friendsContainer.innerHTML = `<p class="loading-message">${SPINNER_SVG} Loading friends...</p>`;

  try {
    const FRIENDS_COUNT = Math.floor(Math.random() * (8 - 4 + 1)) + 4;

    const [usersData, imagesData] = await Promise.all([
      fetchUsers(FRIENDS_COUNT),
      fetchImages(FRIENDS_COUNT),
    ]);

    friendsContainer.innerHTML = "";

    usersData.forEach((friend, index) => {
      const friendImage = `${imagesData[index].url}?random=${index}`;
      const friendCard = document.createElement("div");
      friendCard.classList.add("friend-card");

      friendCard.innerHTML = `
        <div class="friend-img">
          <img src="${friendImage}" />
        </div>
        <div class="friend-details">
          <h3>${friend.firstname} ${friend.lastname}</h3>
          <p>${friend.website}</p>
        </div>`;

      friendCard.addEventListener("click", () => {
        const friendProfileData = {
          ...friend,
          profileImage: friendImage,
        };

        setSelectedProfile(friendProfileData);
        location.reload();
      });

      friendsContainer.appendChild(friendCard);
    });
  } catch (error) {
    console.error("Error loading friends:", error);
    friendsContainer.innerHTML = `<p class="loading-message error">Failed to load friends.</p>`;
  }
}
