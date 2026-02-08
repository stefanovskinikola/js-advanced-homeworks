const errorMsg = document.querySelector(".errorMsg");
const loadBtn = document.getElementById("loadBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const planetsTable = document.getElementById("planetsTable");
const planetsBody = document.getElementById("planetsBody");

let nextUrl, prevUrl;

async function fetchPlanets(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    errorMsg.textContent = `Failed to fetch planets!`;
    errorMsg.classList.remove("hidden");
    console.error("Error fetching planets:", error);
  }
}

function createCell(row, text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  row.appendChild(cell);
}

function printPlanetsToTable(planets) {
  planetsBody.innerHTML = "";
  planetsTable.classList.remove("hidden");

  planets.forEach((planet) => {
    const row = document.createElement("tr");

    const formattedPop =
      planet.population === "unknown"
        ? "unknown"
        : parseInt(planet.population).toLocaleString();

    createCell(row, planet.name);
    createCell(row, formattedPop);
    createCell(row, planet.climate);
    createCell(row, planet.gravity);

    planetsBody.appendChild(row);
  });
}

function updateButtons() {
  loadBtn.classList.add("hidden");

  if (prevUrl) {
    prevBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
  } else {
    prevBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
  }
}

async function handlePageLoad(url) {
  const data = await fetchPlanets(url);

  if (data) {
    nextUrl = data.next;
    prevUrl = data.previous;
    printPlanetsToTable(data.results);
    updateButtons();
  }
}

loadBtn.addEventListener("click", () =>
  handlePageLoad("https://swapi.dev/api/planets/?page=1"),
);
nextBtn.addEventListener("click", () => handlePageLoad(nextUrl));
prevBtn.addEventListener("click", () => handlePageLoad(prevUrl));
