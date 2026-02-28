function createProjectItem({ title, description, tech, image, live, github }) {
  const projectItem = document.createElement("div");
  projectItem.classList.add("project-item", "pop");

  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("img-wrapper");

  const logoWrapper = document.createElement("div");
  logoWrapper.classList.add("logo-wrapper");

  tech.forEach((techName) => {
    const cleanName = techName.toLowerCase().replace(/\s+/g, "");
    const techImg = document.createElement("img");
    techImg.src = `./src/img/logos/${cleanName}.svg`;
    techImg.alt = `${techName} logo`;
    techImg.title = techName;
    logoWrapper.append(techImg);
  });

  const mainImg = document.createElement("img");
  mainImg.src = image;
  mainImg.classList.add("project-img");
  imgWrapper.append(logoWrapper, mainImg);

  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("content-wrapper");

  const titleElement = document.createElement("h3");
  titleElement.textContent = title;

  const descElement = document.createElement("p");
  descElement.textContent = description;

  const btns = document.createElement("div");
  btns.classList.add("btns");

  const liveBtn = document.createElement("a");
  liveBtn.href = live;
  liveBtn.target = "_blank";
  liveBtn.classList.add("btn-tertiary");
  liveBtn.textContent = "View Live";

  const sourceBtn = document.createElement("a");
  sourceBtn.href = github;
  sourceBtn.target = "_blank";
  sourceBtn.classList.add("btn-tertiary");
  sourceBtn.textContent = "View Code";

  btns.append(liveBtn, sourceBtn);
  contentWrapper.append(titleElement, descElement, btns);

  projectItem.append(imgWrapper, contentWrapper);

  return projectItem;
}

export function renderProjects(projects) {
  const container = document.querySelector(".projects-section");

  container.replaceChildren();

  if (projects.length === 0) {
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "Something went wrong while loading the projects.";
    errorMsg.classList.add("error-big");
    container.classList.remove("projects-section");
    container.append(errorMsg);
    return;
  }

  const reversedProjects = [...projects].reverse();

  reversedProjects.forEach((project) => {
    container.append(createProjectItem(project));
  });
}
