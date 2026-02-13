import { renderResult, renderList, renderStatus } from "../script.js";

// prettier-ignore
fetch("https://dummyjson.com/carts?limit=0")
  .then((response) => response.json())
  .then((data) => {
    const carts = data.carts;
    const allProducts = carts.flatMap((cart) => cart.products);
    
    const uniqueProducts = allProducts.reduce((acc, product) => {
      acc[product.id] = {
        title: product.title,
        discountedPricePerItem: product.discountedTotal / product.quantity,
        discountPercentage: product.discountPercentage,
      };
      return acc;
    }, {});

    // All product titles in all carts
    const allProductsTitles = allProducts.map((product) => product.title);
    renderList("t4d1", allProductsTitles.map((title) => `<span class="bold">${title}</span>`));

    // The total quantity of all products purchased
    const totalQuantityAllPurchasedProducts = carts.reduce((sum, cart) => sum + cart.totalQuantity, 0);
    renderResult("t4d2", `<span class="bold"><span class="highlight-main">${totalQuantityAllPurchasedProducts}</span> total items purchased</span>`);

    // Check if there is any cart with a total value above $100,000
    const anyCartAbove100k = carts.some((cart) => cart.total > 100_000);
    renderResult("t4d3", `<span class="bold">${anyCartAbove100k ? "There is a cart with a total value above $100,000" : "No carts with a total value above $100,000 found"}</span>`);

    // The total revenue from all carts (sum of all discountedTotal values)
    const totalRevenue = carts.reduce((sum, cart) => sum + cart.discountedTotal, 0).toFixed(2);
    renderResult("t4d4", `<span class="bold"><span class="highlight-main">$${totalRevenue}</span> total revenue</span>`);

    // The cart with the highest total value
    const cartWithHighestTotal = carts.toSorted((a, b) => b.total - a.total)[0];
    renderResult("t4d5", `<span class="bold"><span class="highlight-main">#${cartWithHighestTotal.id}</span> - $${cartWithHighestTotal.total}</span>`);

    // Find all products with a discount greater than 15%
    const productsWithDiscountGreaterThan15 = allProducts.filter((product) => product.discountPercentage > 15);
    renderList("t4d6", productsWithDiscountGreaterThan15.map((product) =>
      `<span class="bold">${product.title} <span class="highlight-main">(${product.discountPercentage}% off)</span></span>`));

    // The user ID of the cart with the highest total quantity
    const cartWithHighestTotalQuantity = carts.toSorted((a, b) => b.totalQuantity - a.totalQuantity)[0];
    renderResult("t4d7", `<span class="bold"><span class="highlight-main">#${cartWithHighestTotalQuantity.userId}</span> (${cartWithHighestTotalQuantity.totalQuantity} items)</span>`);

    // The most expensive product in all carts (before discount)
    
    const mostExpensiveProduct = allProducts.toSorted((a, b) => b.price - a.price)[0];
    renderResult("t4d8", `<span class="bold">${mostExpensiveProduct.title} <span class="highlight-main">($${mostExpensiveProduct.price})</span></span>`);

    // The average discounted total per cart
    const avgDiscounted = (carts.reduce((sum, cart) => sum + cart.discountedTotal, 0) / carts.length).toFixed(2);
    renderResult("t4d9", `<span class="bold"><span class="highlight-main">$${avgDiscounted}</span> average discounted per cart</span>`);

    // The top 3 most expensive products after discount
    const top3MostExpensiveProducts = Object.values(uniqueProducts)
      .toSorted((a, b) => b.discountedPricePerItem - a.discountedPricePerItem).slice(0, 3);
    renderList("t4d10", top3MostExpensiveProducts.map((product, i) =>
      `<span class="bold"><span class="highlight">#${i + 1}</span> | ${product.title} - $${product.discountedPricePerItem.toFixed(2)} <span class="highlight-main">(${product.discountPercentage}% off)</span></span>`));
  })
  .catch((error) => {
    renderStatus("task4", "error");
    console.error(error);
  });
