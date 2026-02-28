import { setSelectedProfile } from "../helpers/storage.js";
import { renderPagination } from "./pagination.js";

const USERS_PER_PAGE = 20;

export function renderUsers(
  container,
  paginationContainer,
  users,
  currentPage,
  image,
  onPageChange,
) {
  container.classList.add("grid-layout");
  container.innerHTML = "";

  if (users.length === 0) {
    container.classList.remove("grid-layout");
    container.innerHTML = `<p class="message">No results found.</p>`;
    paginationContainer.innerHTML = "";
    return;
  }

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const start = (currentPage - 1) * USERS_PER_PAGE;
  const end = start + USERS_PER_PAGE;
  const pageUsers = users.slice(start, end);

  pageUsers.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("user-card");

    const imageUrlToSplit = image.url;
    const randomize = `seed/${user.id}/`;
    const splitUrl = imageUrlToSplit.split(".photos");
    const imageUrl = `${splitUrl[0]}.photos/${randomize}${splitUrl[1]}`;

    card.addEventListener("click", () => {
      const profileData = {
        ...user,
        profileImage: imageUrl,
      };
      setSelectedProfile(profileData);
      const isAtRoot =
        location.pathname.endsWith("index.html") ||
        location.pathname.endsWith("/") ||
        !location.pathname.includes("/src/");
      location.href = isAtRoot
        ? `./src/profile.html?id=${user.id}`
        : `./profile.html?id=${user.id}`;
    });

    card.innerHTML = `
      <img src="${imageUrl}" />
      <h3>${user.firstname} ${user.lastname}</h3>
      <p>${user.email}</p>
      <a href="${user.website}" class="pill" target="_blank">${user.website}</a>
    `;

    container.appendChild(card);
  });

  renderPagination(paginationContainer, totalPages, currentPage, onPageChange);
}
