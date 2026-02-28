function createSkillItem({ name, skill, iconClasses }) {
  const skillEl = document.createElement("div");
  skillEl.classList.add("skill");

  if (skill) skillEl.style.setProperty("--bar-width", skill);

  const icon = document.createElement("i");
  icon.classList.add(...iconClasses);

  const nameEl = document.createElement("span");
  nameEl.textContent = name;

  skillEl.append(icon, nameEl);
  return skillEl;
}

export function renderSkills(profile) {
  const techContainer = document.querySelector(".tech-stack");
  const skillsContainer = document.querySelector(".tech-skills");

  profile.tech.forEach((skillData) => {
    techContainer.append(createSkillItem(skillData));
  });

  profile.skills.forEach((skillData) => {
    skillsContainer.append(createSkillItem(skillData));
  });
}
