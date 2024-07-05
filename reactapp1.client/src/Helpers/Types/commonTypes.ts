export type UserDto = {
  id: string;
  userName: string;
  nickName: string;
  email: string;
};

//  initializing the first value will in turn assigns and increments any additional value
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

export type AdminOrderDetailsDto = {
  orderId: string;
  isFulfilled: boolean;
  address: Address;
  customer: UserDto;
};

export interface AdminProductDetailDto extends ProductDetail {
  orderDatas: AdminOrderDetailsDto[];
}

export type GetCartItemsResult = {
  products: ProductDetailDto[];
  itemCounter: number;
  totalAmount: number;
};

export type ColorTypes = "danger" | "success" | "basic";

//  ORDER
export type Customer = {
  id?: string;
  email: string;
  //TODO: swap to enum
  firstName: string;
  lastName: string;
  //  for handling values starting with eg.: "+"
  phone: string;
  //  address
  //  delivery method
  //  coupon code:
};
export type AddressDto = {
  zipCode: number;
  city: string;
  address: string;
  additionalDetails?: string;
};
export type OrderData = {
  customer: Customer;
  address: AddressDto;
  //  TODO: swap to enum
  deliveryMethod: string;
  couponCode: string;
  // products: ProductDetailDto[];
};
