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
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: Category;
  packaging: Packaging;
  price: number;
  stock: number;
  placedInCartQuantity: number;
};

export type ProductDetail = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: Category;
  packaging: Packaging;
  price: number;
  stock: number;
};

export type Address = {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

export type OrderData = {
  id: string;

  addressId: number;
  address: Address;
  userId: string;
  user: UserDto;
  productId: string;
  product: ProductDetail;
};

export type AdminOrderDetailsDto = {
  orderId: string;
  isFulfilled: boolean;
  address: Address;
  customer: UserDto;
};

export interface AdminProductDetailDto extends ProductDetail {
  orderDatas: AdminOrderDetailsDto[];
}

export type ColorTypes = "danger" | "success" | "basic";
