import {
  AddressDto,
  AdminProductDetailDto,
  Category,
  Customer,
  OrderData,
  Packaging,
  ProductDetail,
  ProductDetailDto,
} from "../Types/commonTypes";

const initialProductDetails: ProductDetail = {
  id: "",
  category: Category.Honey,
  description: "",
  imageUrl: "",
  name: "",
  packaging: Packaging.Regular,
  price: 0,
  stock: 0,
};

const initialProductDetailDto: ProductDetailDto = {
  id: "",
  category: Category.Honey,
  description: "",
  imageUrl: "",
  name: "",
  packaging: Packaging.Regular,
  price: 0,
  stock: 0,
  placedInCartQuantity: 0,
};

const initialAdminProductDetailsDto: AdminProductDetailDto = {
  id: "",
  category: 1,
  description: "",
  imageUrl: "",
  name: "",
  packaging: 1,
  price: 0,
  stock: 0,
  orderDatas: [
    {
      address: {
        city: "",
        id: 0,
        state: "",
        street: "",
        zipCode: "",
      },
      customer: {
        id: "",
        email: "",
        nickName: "",
        userName: "",
      },
      isFulfilled: false,
      orderId: "",
    },
  ],
};

const initialUserDto = {
  id: "",
  userName: "",
  nickName: "",
  email: "",
};

const initialAddressDto: AddressDto = {
  zipCode: 0,
  city: "",
  address: "",
  additionalDetails: "",
};

const initialCustomer: Customer = {
  phone: "",
  email: "",
  firstName: "",
  lastName: "",
};

const initialOrderData: OrderData = {
  customer: initialCustomer,
  address: initialAddressDto,
  deliveryMethod: "",
  couponCode: "",
  // products: [initialProductDetailDto],
};

export {
  initialProductDetails,
  initialAdminProductDetailsDto,
  initialProductDetailDto,
  initialUserDto,
  initialOrderData,
  initialCustomer,
  initialAddressDto,
};
