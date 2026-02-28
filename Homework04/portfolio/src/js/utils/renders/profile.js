import { typeWriterEffect } from "../../ui/typeWriter.js";

export function renderInfo(profile) {
  const nameEl = document.querySelector(".hero-name");
  const titleEl = document.querySelector(".hero-title");
  const bioEl = document.querySelector(".hero-description");
  const linkedInEl = document.querySelector(".linkedin");
  const gitHubEl = document.querySelector(".github");
  const gitLabEl = document.querySelector(".gitlab");
  const aboutEl = document.querySelector(".about-description");
  const findOutMoreBtn = document.querySelector(".find-out-more");
  const checkOutMoreBtn = document.querySelector(".check-out-more");

  nameEl.textContent = profile.name;
  typeWriterEffect(titleEl, profile.title);
  bioEl.textContent = profile.description;
  linkedInEl.href = profile.linkedin;
  gitLabEl.href = profile.gitlab;
  gitHubEl.href = profile.github;
  aboutEl.textContent = profile.bio;
  findOutMoreBtn.href = profile.linkedin;
  checkOutMoreBtn.href = profile.github;
}
