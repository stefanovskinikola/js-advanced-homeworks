export class Profile {
  constructor(data) {
    this.name = data.name || "Nikola Stefanovski";
    this.title = data.title || "Full-Stack Web Developer";
    this.description =
      data.description ||
      "Full-stack web developer focused on building clean, responsive, and high-performance web solutions.";
    this.bio =
      data.bio ||
      "I’m a full-stack web developer focused on building clean, responsive, and performance-optimized web applications. I enjoy working across both frontend and backend to turn ideas into reliable, well-structured solutions. I’m constantly learning, refining my skills, and improving my workflow to stay up to date with modern web technologies and best practices. My goal is to write maintainable code and deliver experiences that are both efficient and user-friendly.";
    // prettier-ignore
    this.tech = data.tech || [
    { name: "HTML", skill: "99%", iconClasses: ["fa-brands", "fa-html5"] },
    { name: "CSS", skill: "95%", iconClasses: ["fa-brands", "fa-css3-alt"] },
    { name: "SASS", skill: "90%", iconClasses: ["fa-brands", "fa-sass"] },
    { name: "Bootstrap", skill: "90%", iconClasses: ["fa-brands", "fa-bootstrap"] },
    { name: "Tailwind", skill: "90%", iconClasses: ["fa-brands", "fa-tailwind-css"] },
    { name: "JavaScript", skill: "80%", iconClasses: ["fa-brands", "fa-js"] },
    { name: "Git", skill: "90%", iconClasses: ["fa-brands", "fa-git-alt"] },
    { name: "GitHub", skill: "90%", iconClasses: ["fa-brands", "fa-github"] },
    { name: "MySQL", skill: "80%", iconClasses: ["fa-solid", "fa-database"] },
    { name: "PHP", skill: "60%", iconClasses: ["fa-brands", "fa-php"] },
    { name: "Laravel", skill: "60%", iconClasses: ["fa-brands", "fa-laravel"] }
  ];
    // prettier-ignore
    this.skills = data.skills || [
    { name: "Web Development", iconClasses: ["fa-solid", "fa-code"] },
    { name: "Web Design", iconClasses: ["fa-solid", "fa-object-group"] },
    { name: "Responsive Design", iconClasses: ["fa-solid", "fa-mobile-screen"] },
    { name: "SEO Optimization", iconClasses: ["fa-solid", "fa-magnifying-glass-chart"] },
    { name: "Cross-Browser Compatibility", iconClasses: ["fa-solid", "fa-globe"] },
    { name: "Performance Optimization", iconClasses: ["fa-solid", "fa-gauge-high"] },
    { name: "Basic Security Practices", iconClasses: ["fa-solid", "fa-shield"] },
    { name: "Problem Solving", iconClasses: ["fa-solid", "fa-lightbulb"] }
  ];
    this.email = data.email || "stefanovski.nikola@outlook.com";
    this.linkedin =
      data.linkedin ||
      "https://www.linkedin.com/in/nikola-stefanovski-3ba23a256/";
    this.github = data.github || "https://github.com/stefanovskinikola";
    this.gitlab = data.gitlab || "https://gitlab.com/stefanovskinikola";
  }
}
