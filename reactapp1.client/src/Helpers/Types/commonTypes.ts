type CartItem = {
  Id: string;
  Name: string;
  Quantity: number;
  Variant: string;
};

type CartData = {
  cartItems: CartItem[];
  itemCounter: number;
};

//  initializing the first value will in turn assigns and increments to any additional value
enum Category {
  Honey,
  BeekeepingProducts,
}

enum Packaging {
  Small,
  Regular,
  Large,
}

type ProductDetailDto = {
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

export type { CartData, CartItem, ProductDetailDto, Category, Packaging };
