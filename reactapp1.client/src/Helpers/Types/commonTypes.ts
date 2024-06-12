export type UserDto = {
  id: string;
  userName: string;
  nickName: string;
  email: string;
};

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

export enum Packaging {
  Small = 1,
  Regular,
  Large,
}

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
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  category: Category;
  packaging: Packaging;
  price: number;
  stock: number;
};

export type RootLayoutUseLoaderData = {
  isLoggedIn: boolean;
  userDto: UserDto;
};
