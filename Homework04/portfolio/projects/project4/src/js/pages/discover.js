import { fetchUsers, fetchImages } from "../api/api.js";
import { ADD_SQUARE_SVG, SPINNER_SVG } from "../../svg/icons.js";
import { createSkeletons } from "../render/skeleton.js";
import { renderUsers } from "../render/users.js";
import { getStoredUsers } from "../helpers/storage.js";

const USERS_PER_PAGE = 20;
const INITIAL_FETCH = 50;
const MAX_USERS = 100;

let allUsers = [];
let filteredUsers = [];
let image = null;
let currentPage = 1;

function scrollToSeparator() {
  const separator = document.querySelector(".separator");
  if (separator) {
    separator.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function updateLoadMoreButton(loadMoreBtn) {
  loadMoreBtn.classList.toggle("hidden", allUsers.length >= MAX_USERS);
}

function handlePageChange(page) {
  currentPage = page;
  const container = document.querySelector(".users-cards");
  const paginationContainer = document.querySelector(".pagination");
  renderUsers(
    container,
    paginationContainer,
    filteredUsers,
    currentPage,
    image,
    handlePageChange,
  );
  scrollToSeparator();
}

async function initUsers() {
  const container = document.querySelector(".users-cards");
  const paginationContainer = document.querySelector(".pagination");
  const loadMoreBtn = document.querySelector(".btn-load-more");

  loadMoreBtn.innerHTML = `${ADD_SQUARE_SVG} Load More`;

  createSkeletons(container, USERS_PER_PAGE);

  try {
    const localUsers = getStoredUsers();

    const [apiUsers, images] = await Promise.all([
      fetchUsers(INITIAL_FETCH),
      fetchImages(1),
    ]);

    image = images[0];

    allUsers = [...localUsers, ...apiUsers];
    filteredUsers = allUsers;

    currentPage = 1;
    renderUsers(
      container,
      paginationContainer,
      allUsers,
      currentPage,
      image,
      handlePageChange,
    );
    updateLoadMoreButton(loadMoreBtn);
  } catch (error) {
    container.classList.remove("grid-layout");
    container.innerHTML = `<p class="message error">Failed to load users.</p>`;
    console.error(error);
  }
}

async function handleLoadMore() {
  const loadMoreBtn = document.querySelector(".btn-load-more");
  const container = document.querySelector(".users-cards");
  const paginationContainer = document.querySelector(".pagination");

  if (allUsers.length >= MAX_USERS) return;

  loadMoreBtn.disabled = true;
  loadMoreBtn.innerHTML = `${SPINNER_SVG} Loading...`;

  const amountToFetch =
    allUsers.length + 20 > MAX_USERS ? MAX_USERS - allUsers.length : 20;

  try {
    const newUsers = await fetchUsers(amountToFetch);
    allUsers.push(...newUsers);
    filteredUsers = allUsers;

    renderUsers(
      container,
      paginationContainer,
      allUsers,
      currentPage,
      image,
      handlePageChange,
    );
    updateLoadMoreButton(loadMoreBtn);

    if (allUsers.length >= MAX_USERS) {
      loadMoreBtn.removeEventListener("click", handleLoadMore);
      loadMoreBtn.disabled = true;
      loadMoreBtn.classList.add("hidden");
      return;
    }

    loadMoreBtn.disabled = false;
    loadMoreBtn.innerHTML = `${ADD_SQUARE_SVG} Load More`;
  } catch (error) {
    console.error("Failed to load more users", error);
    loadMoreBtn.disabled = false;
    loadMoreBtn.innerHTML = `${ADD_SQUARE_SVG} Load More`;
  }
}

function handleSearch() {
  const searchInput = document.querySelector(".search-input");
  const container = document.querySelector(".users-cards");
  const paginationContainer = document.querySelector(".pagination");

  const query = searchInput.value.toLowerCase().trim();

  currentPage = 1;

  if (!query) {
    filteredUsers = allUsers;
    renderUsers(
      container,
      paginationContainer,
      allUsers,
      currentPage,
      image,
      handlePageChange,
    );
    return;
  }

  filteredUsers = allUsers.filter((user) =>
    `${user.firstname} ${user.lastname} ${user.email} ${user.website}`
      .toLowerCase()
      .includes(query),
  );

  renderUsers(
    container,
    paginationContainer,
    filteredUsers,
    currentPage,
    image,
    handlePageChange,
  );
}

export function initDiscoverPage() {
  const loadMoreBtn = document.querySelector(".btn-load-more");
  const searchInput = document.querySelector(".search-input");

  if (!loadMoreBtn || !searchInput) return;

  loadMoreBtn.addEventListener("click", handleLoadMore);
  searchInput.addEventListener("input", handleSearch);

  initUsers();
}
