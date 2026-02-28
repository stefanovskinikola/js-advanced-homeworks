import { initThemeToggle } from "./src/js/ui/themeToggle.js";
import { initNavHighlight } from "./src/js/ui/navHighlight.js";
import { loadPortfolioData } from "./src/js/services/api.js";
import { renderInfo } from "./src/js/utils/renders/profile.js";
import { renderSkills } from "./src/js/utils/renders/skills.js";
import { renderProjects } from "./src/js/utils/renders/projects.js";
import { filterProjects } from "./src/js/ui/filterProjects.js";
import { renderFooter } from "./src/js/utils/renders/footer.js";
import { initModal } from "./src/js/ui/initModal.js";
import { initContactForm } from "./src/js/ui/contactForm.js";
import { initEmailService } from "./src/js/services/email.js";

document.addEventListener("DOMContentLoaded", async () => {
  initThemeToggle();
  initNavHighlight();
  initEmailService();
  initContactForm();
  initModal();
  renderFooter();

  const { profile, projects } = await loadPortfolioData();

  renderInfo(profile);
  renderSkills(profile);
  renderProjects(projects);
  filterProjects(projects);
});
