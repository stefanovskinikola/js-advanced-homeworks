import { initTheme } from "./src/js/modules/theme.js";
import { updateAuthUI } from "./src/js/modules/auth-ui.js";
import { initLogout } from "./src/js/modules/logout.js";

function initCore() {
  initTheme();
  updateAuthUI();
  initLogout();
}

function detectAndInitPage() {
  const path = window.location.pathname;
  const page = path.split("/").pop().replace(".html", "") || "index";

  switch (page) {
    case "index":
    case "":
      import("./src/js/pages/discover.js").then((module) => {
        module.initDiscoverPage();
      });
      break;

    case "profile":
      import("./src/js/pages/profile.js").then((module) => {
        module.initProfilePage();
      });
      break;

    case "gallery":
      import("./src/js/pages/gallery.js").then((module) => {
        module.initGalleryPage();
      });
      break;

    case "login":
      Promise.all([
        import("./src/js/pages/login.js"),
        import("./src/js/modules/password-toggle.js"),
      ]).then(([loginModule, toggleModule]) => {
        loginModule.initLoginPage();
        toggleModule.initPasswordToggles();
      });
      break;

    case "register":
      Promise.all([
        import("./src/js/pages/register.js"),
        import("./src/js/modules/password-toggle.js"),
      ]).then(([registerModule, toggleModule]) => {
        registerModule.initRegisterPage();
        toggleModule.initPasswordToggles();
      });
      break;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", detectAndInitPage);
} else {
  detectAndInitPage();
}

initCore();
