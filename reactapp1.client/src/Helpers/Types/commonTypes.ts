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
