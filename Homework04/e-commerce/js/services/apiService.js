import { API_BASE, PRODUCTS_PER_PAGE } from "../config.js";
import { Product } from "../models/Product.js";

// Fetch helpers
const fetchJSON = async (url) => {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

const buildSortParams = (sortKey) => {
  const sortMap = {
    "price-asc": { sortBy: "price", order: "asc" },
    "price-desc": { sortBy: "price", order: "desc" },
    "rating-desc": { sortBy: "rating", order: "desc" },
    "name-asc": { sortBy: "title", order: "asc" },
    "name-desc": { sortBy: "title", order: "desc" },
  };

  const sortEntry = sortMap[sortKey];
  return sortEntry
    ? `&sortBy=${sortEntry.sortBy}&order=${sortEntry.order}`
    : "";
};

const fetchProductCollection = async (path, page, limit, sort) => {
  const skip = (page - 1) * limit;
  const data = await fetchJSON(
    `${API_BASE}${path}${path.includes("?") ? "&" : "?"}limit=${limit}&skip=${skip}${buildSortParams(sort)}`,
  );

  return {
    products: data.products.map((productData) => new Product(productData)),
    total: data.total,
    page,
  };
};

export const fetchProducts = async (
  page = 1,
  limit = PRODUCTS_PER_PAGE,
  sort = "",
) => fetchProductCollection("/products", page, limit, sort);

export const fetchCategories = async () => {
  const data = await fetchJSON(`${API_BASE}/products/categories`);
  return data.map((cat) => (typeof cat === "string" ? cat : cat.slug));
};

export const fetchProductsByCategory = async (
  category,
  page = 1,
  limit = PRODUCTS_PER_PAGE,
  sort = "",
) =>
  fetchProductCollection(
    `/products/category/${encodeURIComponent(category)}`,
    page,
    limit,
    sort,
  );

export const searchProducts = async (
  query,
  page = 1,
  limit = PRODUCTS_PER_PAGE,
  sort = "",
) =>
  fetchProductCollection(
    `/products/search?q=${encodeURIComponent(query)}`,
    page,
    limit,
    sort,
  );

export const fetchProductById = async (id) => {
  const data = await fetchJSON(`${API_BASE}/products/${id}`);
  return new Product(data);
};

export const fetchBestDeals = async () => {
  const data = await fetchJSON(
    `${API_BASE}/products?limit=0&sortBy=discountPercentage&order=desc`,
  );
  return data.products.map((productData) => new Product(productData));
};
