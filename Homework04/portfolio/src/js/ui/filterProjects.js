import { renderProjects } from "../utils/renders/projects.js";

export function filterProjects(projects) {
  const filterContainer = document.getElementById("project-filters");

  const allTech = projects.flatMap((project) => project.tech);
  const uniqueTech = ["All", ...new Set(allTech)];

  uniqueTech.forEach((tech) => {
    const btn = document.createElement("button");
    btn.classList.add("btn-secondary", "filter-btn");

    if (tech === "All") btn.classList.add("active");

    btn.textContent = tech;
    btn.dataset.tech = tech;

    filterContainer.append(btn);
  });

  filterContainer.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const allBtns = filterContainer.querySelectorAll(".filter-btn");
    allBtns.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    const selectedTech = e.target.dataset.tech;

    if (selectedTech === "All") {
      renderProjects(projects);
    } else {
      const filteredProjects = projects.filter((project) =>
        project.tech.includes(selectedTech),
      );
      renderProjects(filteredProjects);
    }
  });
}
