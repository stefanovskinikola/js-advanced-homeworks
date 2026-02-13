import { renderResult, renderList, renderStatus } from "../script.js";

// prettier-ignore
fetch("https://dummyjson.com/recipes?limit=0")
  .then((response) => response.json())
  .then((data) => {
    const recipes = data.recipes;

    // All Desserts
    const allDesserts = recipes.filter((recipe) => recipe.mealType.includes("Dessert"));
    renderList("t3d1", allDesserts.map((recipe) =>
      `<span class="bold"><span class="highlight">#${recipe.id}</span> | ${recipe.name} - <span class="highlight-main">${recipe.cuisine} (${recipe.rating} ⭐)</span></span>`));

    // Get the names of recipes with more than 30 reviews
    const recipesMoreThan30Reviews = recipes.filter((recipe) => recipe.reviewCount > 30);
    renderList("t3d2", recipesMoreThan30Reviews.map((recipe) =>
      `<span class="bold"><span class="highlight">#${recipe.id}</span> | ${recipe.name} - <span class="highlight-main">${recipe.reviewCount} reviews</span></span>`));

    // All recipes that use Cinnamon as an ingredient
    const cinnamonRecipes = recipes.filter((recipe) => recipe.ingredients.some((ing) => ing.includes("Cinnamon")));
    renderList("t3d3", cinnamonRecipes.map((recipe) =>
      `<span class="bold"><span class="highlight">#${recipe.id}</span> | ${recipe.name} - <span class="highlight-main">${recipe.cuisine} (${recipe.rating} ⭐)</span></span>`));

    // Recipes that are served as both Lunch and Dinner
    const lunchDinnerRecipes = recipes.filter((recipe) => recipe.mealType.includes("Lunch") && recipe.mealType.includes("Dinner"));
    renderList("t3d4", lunchDinnerRecipes.map((recipe) =>
      `<span class="bold"><span class="highlight">#${recipe.id}</span> | ${recipe.name} - <span class="highlight-main">(${recipe.mealType.join(", ")})</span></span>`));

    // The ingredients needed for "Mango Salsa Chicken" dish
    const mangoSalsaChickenIng = recipes.find((recipe) => recipe.name === "Mango Salsa Chicken");
    renderList("t3d5", mangoSalsaChickenIng.ingredients.map((ing) => `<span class="bold">${ing}</span>`));

    // Calculate the average number of calories for all American cusine recipes
    const caloriesAmericanRecipes = recipes.filter((recipe) => recipe.cuisine === "American");
    const avgCal = (caloriesAmericanRecipes.reduce((sum, recipe) => sum + recipe.caloriesPerServing, 0) / caloriesAmericanRecipes.length).toFixed(2);
    renderResult("t3d6", `<span class="bold"><span class="highlight-main">${avgCal}</span> calories per serving <span class="highlight">(${caloriesAmericanRecipes.length} recipes)</span></span>`);

    // The average cooking time of all pasta recipes
    const allPastaRecipes = recipes.filter((recipe) => recipe.name.includes("Pasta"));
    const avgCook = (allPastaRecipes.reduce((sum, recipe) => sum + recipe.cookTimeMinutes, 0) / allPastaRecipes.length).toFixed(2);
    renderResult("t3d7", `<span class="bold"><span class="highlight-main">${avgCook}</span> minutes is the average cooking time <span class="highlight">(${allPastaRecipes.length} recipes)</span></span>`);

    // Find the recipe with the lowest number of reviews
    const lowestReviewRecipe = recipes.toSorted((a, b) => a.reviewCount - b.reviewCount)[0];
    renderResult("t3d8", `<span class="bold"><span class="highlight">#${lowestReviewRecipe.id}</span> | ${lowestReviewRecipe.name} - <span class="highlight-main">${lowestReviewRecipe.reviewCount} reviews</span></span>`);
  })
  .catch((error) => {
    renderStatus("task3", "error");
    console.error(error);
  });
