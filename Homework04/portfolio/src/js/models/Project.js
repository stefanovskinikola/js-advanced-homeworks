export class Project {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.tech = data.tech;
    this.image = data.image;
    this.live = data.live;
    this.github = data.github;
  }
}
