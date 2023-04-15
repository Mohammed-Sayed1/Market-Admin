export interface Model {
  userId: number;
  date: Date;
  products: {
    productId: number;
    quantity: number;
  }[];
}
