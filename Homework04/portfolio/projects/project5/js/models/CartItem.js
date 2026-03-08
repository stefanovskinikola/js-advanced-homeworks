export class CartItem {
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  get lineTotal() {
    return this.product.price * this.quantity;
  }

  get formattedTotal() {
    return `$${this.lineTotal.toFixed(2)}`;
  }

  increment() {
    if (this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  toJSON() {
    return {
      product: { ...this.product },
      quantity: this.quantity,
    };
  }
}
