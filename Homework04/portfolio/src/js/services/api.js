import { Profile } from "../models/Profile.js";
import { Project } from "../models/Project.js";

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} for URL: ${url}`);
  }

  return await response.json();
}

export async function fetchProfile() {
  try {
    const rawData = await fetchJson("./src/data/profile.json");
    return new Profile(rawData);
  } catch (error) {
    console.error("Could not fetch profile:", error);
    return new Profile({});
  }
}

export async function fetchProjects() {
  try {
    const rawData = await fetchJson("./src/data/projects.json");
    return rawData.map((project) => new Project(project));
  } catch (error) {
    console.error("Could not fetch projects:", error);
    return [];
  }
}

export async function loadPortfolioData() {
  try {
    const [profile, projects] = await Promise.all([
      fetchProfile(),
      fetchProjects(),
    ]);

    return { profile, projects };
  } catch (error) {
    console.error("Error loading portfolio data:", error);
    return { profile: new Profile({}), projects: [] };
  }
}
