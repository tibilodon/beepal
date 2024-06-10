export type CartItem = {
  Id: string;
  Name: string;
  Quantity: number;
  Variant: string;
};

export type CartData = {
  cartItems: CartItem[];
  itemCounter: number;
};

//  initializing the first value will in turn assigns and increments to any additional value
export enum Category {
  Honey = 1,
  BeekeepingProducts,
}
// export enum Category {
//   Honey = "Méz",
//   BeekeepingProducts = "Méhészeti Termékek",
// }

export enum Packaging {
  Small = 1,
  Regular,
  Large,
}
// export enum Packaging {
//   Small = "250g",
//   Regular = "500g",
//   Large = "750g",
// }

export type ProductDetailDto = {
  Id: string;
  Name: string;
  Description: string;
  ImageUrl: string;
  Category: Category;
  Packaging: Packaging;
  Price: number;
  Stock: number;
  PlacedInCartQuantity: number;
};

export type ProductDetail = {
  name: string;
  description: string;
  imageUrl: string;
  category: Category;
  packaging: Packaging;
  price: number;
  stock: number;
};
