import { renderResult, renderList, renderStatus } from "../script.js";

// prettier-ignore
fetch("https://raw.githubusercontent.com/aa-codecademy/mkwd14-03-ajs-and-ai/refs/heads/main/G2/Homeworks/students.json")
  .then((response) => response.json())
  .then((students) => {
    // All students with an average grade higher than 3
    const gradeHigherThan3 = students.filter((student) => student.averageGrade > 3);
    renderList("t1d1", gradeHigherThan3.map((student) => 
      `<span class="bold"><span class="highlight">#${student.id}</span> | ${student.firstName} ${student.lastName} - <span class="highlight-main">Grade: ${student.averageGrade}</span></span>`));

    // All female student names with an average grade of 5
    const femaleGrade5 = students.filter((student) => student.gender === "Female" && student.averageGrade === 5);
    renderList("t1d2", femaleGrade5.map((student) => 
      `<span class="bold"><span class="highlight">#${student.id}</span> | ${student.firstName} - <span class="highlight-main">Grade: ${student.averageGrade}</span></span>`));

    // All male student full names who live in Skopje and are over 18 years old
    const maleSkopjeOver18 = students.filter((student) => student.gender === "Male" && student.city === "Skopje" && student.age > 18);
    renderList("t1d3", maleSkopjeOver18.map((student) => 
      `<span class="bold"><span class="highlight">#${student.id}</span> | ${student.firstName} ${student.lastName} - <span class="highlight-main">${student.gender}, ${student.city}, ${student.age} years old</span></span>`));

    // The average grades of all female students over the age of 24
    const averageGradeFemalesOver24 = students.filter((student) => student.gender === "Female" && student.age > 24);
    renderList("t1d4", averageGradeFemalesOver24.map((student) =>
      `<span class="bold"><span class="highlight">#${student.id}</span> | ${student.firstName} ${student.lastName} - <span class="highlight-main">Grade: ${student.averageGrade}</span></span>`));

    // All male students with a name starting with B and average grade over 2
    const maleBOver2 = students.filter((student) => student.gender === "Male" && student.firstName.startsWith("B") && student.averageGrade > 2);
    renderList("t1d5", maleBOver2.map((student) =>
      `<span class="bold"><span class="highlight">#${student.id}</span> | ${student.firstName} ${student.lastName} - <span class="highlight-main">Grade: ${student.averageGrade}</span></span>`));

    // Student emails of all female students with age between 20 and 30 years, ordered ascending
    const emailsFemale20to30 = students
      .filter((student) => student.gender === "Female" && student.age >= 20 && student.age <= 30)
      .sort((a, b) => a.email.localeCompare(b.email));
    renderList("t1d6", emailsFemale20to30.map((student) =>
      `<span class="bold"><span class="highlight">#${student.id}</span> | ${student.email} - <span class="highlight-main">${student.age} years old</span></span>`));

    // Students full names of students above 40, ordered descending
    const fullNamesAbove40 = students
      .filter((student) => student.age > 40)
      .sort((a, b) => `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`));
    renderList("t1d7", fullNamesAbove40.map((student) => 
      `<span class="bold"><span class="highlight">#${student.id}</span> | ${student.firstName} ${student.lastName} - <span class="highlight-main">${student.age} years old</span></span>`));

    // Count of students using google mail
    const googleMailUsers = students.filter((student) => student.email.includes("google"));
    renderResult("t1d8", `<span class="bold"><span class="highlight-main">${googleMailUsers.length}</span> students use Google mail</span>`);

    // The average age of female students living in Skopje
    const allFemalesSkopje = students.filter((student) => student.gender === "Female" && student.city === "Skopje");
    const avgAgeFemalesSkopje = (allFemalesSkopje.reduce((sum, student) => sum + student.age, 0) / allFemalesSkopje.length).toFixed(2);
    renderResult("t1d9", `<span class="bold"><span class="highlight-main">${avgAgeFemalesSkopje}</span> is the average age of female students living in Skopje</span>`)
  })
  .catch((error) => {
    renderStatus("task1", "error");
    console.error(error);
  });
