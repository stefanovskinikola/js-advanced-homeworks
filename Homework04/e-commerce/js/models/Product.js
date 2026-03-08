export class Product {
  constructor({
    id,
    title,
    name,
    price,
    description,
    category,
    thumbnail,
    image,
    images,
    rating,
    stock,
    brand,
    discountPercentage,
    tags,
  }) {
    this.id = id;
    this.name = title ?? name ?? ""; // API "title" and cart data "name"
    this.price = price;
    this.description = description ?? "";
    this.category = category ?? "uncategorized";
    this.image = thumbnail ?? image ?? "";
    this.images = images ?? (this.image ? [this.image] : []);
    this.rating = rating ?? 0;
    this.stock = stock ?? 0;
    this.brand = brand ?? "";
    this.discountPercentage = discountPercentage ?? 0;
    this.tags = tags ?? [];
  }

  get isInStock() {
    return this.stock > 0;
  }

  get formattedPrice() {
    return `$${this.price.toFixed(2)}`;
  }

  get shortDescription() {
    const maxDescriptionLength = 100;

    return this.description.length > maxDescriptionLength
      ? `${this.description.slice(0, maxDescriptionLength)}...`
      : this.description;
  }

  get originalPrice() {
    if (this.discountPercentage > 0) {
      return this.price / (1 - this.discountPercentage / 100);
    }
    return this.price;
  }

  get formattedOriginalPrice() {
    return `$${this.originalPrice.toFixed(2)}`;
  }

  get stockLabel() {
    if (this.stock === 0) return "Out of Stock";
    if (this.stock <= 5) return `Only ${this.stock} left`;
    return "In Stock";
  }

  get stockBadgeClass() {
    if (this.stock === 0) return "bg-danger";
    if (this.stock <= 5) return "bg-warning text-dark";
    return "bg-success";
  }
}
