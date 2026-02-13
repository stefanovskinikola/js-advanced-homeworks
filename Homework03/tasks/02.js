import { renderResult, renderList, renderStatus } from "../script.js";

// prettier-ignore
fetch("https://dummyjson.com/products?limit=0")
  .then((response) => response.json())
  .then((data) => {
    const products = data.products;

    // All laptops in stock ordered by price descending
    const laptopsInStock = products
      .filter((product) => product.category === "laptops" && product.stock > 0)
      .sort((a, b) => b.price - a.price);
    renderList("t2d1", laptopsInStock.map((product) =>
      `<span class="bold"><span class="highlight-main">${product.title}</span> - $${product.price} <span class="highlight">(${product.stock} in stock)</span></span>`));

    // The first grocery item
    const firstGroceryItem = products.find((product) => product.category === "groceries");
    renderResult("t2d2", `<span class="bold"><span class="highlight-main">${firstGroceryItem.title}</span> - $${firstGroceryItem.price} <span class="highlight">(${firstGroceryItem.stock} in stock)</span></span>`);

    // Index of the first "Samsung" smartphone
    const firstSamsungIndex = products.findIndex((product) => product.category === "smartphones" && product.brand === "Samsung");
    renderResult("t2d3", `<span class="bold"><span class="highlight-main">${firstSamsungIndex}</span> - ${products[firstSamsungIndex].title} <span class="highlight">(${products[firstSamsungIndex].stock} in stock)</span></span>`);

    // Check if there is any item from the brand "Sony"
    const anySony = products.some((product) => product.brand === "Sony");
    renderResult("t2d4", `<span class="bold">${anySony ? "There is a Sony product" : "No Sony products found"}</span>`);

    // The name of the highest rated skincare product
    const highestRatedSkincare = products
      .filter((product) => product.category === "skin-care")
      .sort((a, b) => b.rating - a.rating)[0];
    renderResult("t2d5", `<span class="bold">${highestRatedSkincare.title} - <span class="highlight">Rating: ${highestRatedSkincare.rating}</span></span>`);

    // The average discount percentage of products with a rating above 4.5
    const highRatedProducts = products.filter((product) => product.rating > 4.5);
    const avgDiscount = (highRatedProducts.reduce((sum, product) => sum + product.discountPercentage, 0) / highRatedProducts.length).toFixed(2);
    renderResult("t2d6", `<span class="bold">The average discount is <span class="highlight">${avgDiscount}%</span></span>`);

    // Find the product with the highest price
    const highestPricedProduct = products.toSorted((a, b) => b.price - a.price)[0];
    renderResult("t2d7", `<span class="bold"><span class="highlight-main">${highestPricedProduct.title}</span> - $${highestPricedProduct.price} <span class="highlight">(${highestPricedProduct.stock} in stock)</span></span>`);

    // Average price of all IPhone smartphones
    const AllIphones = products.filter((product) => product.category === "smartphones" && product.title.includes("iPhone"));
    const avgIphonePrice = (AllIphones.reduce((sum, product) => sum + product.price, 0) / AllIphones.length).toFixed(2);
    renderResult("t2d8", `<span class="bold"><span class="highlight-main">$${avgIphonePrice}</span> (${AllIphones.length} iPhone models available)</span>`);

    // The product with the lowest price
    const lowestPricedProduct = products.toSorted((a, b) => a.price - b.price)[0];
    renderResult("t2d9", `<span class="bold"><span class="highlight-main">${lowestPricedProduct.title}</span> - $${lowestPricedProduct.price} <span class="highlight">(${lowestPricedProduct.stock} in stock)</span></span>`);
  })
  .catch((error) => {
    renderStatus("task2", "error");
    console.error(error);
  });
