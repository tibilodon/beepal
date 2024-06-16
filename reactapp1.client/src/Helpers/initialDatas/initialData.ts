import {
  AdminProductDetailDto,
  Category,
  Packaging,
  ProductDetail,
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
      address: { city: "", id: 0, state: "", street: "", zipCode: "" },
      customer: {
        id: "",
        email: "",
        nickName: "",
        userName: "",
      },
      isFulfilled: false,
      orderDate: "",
      orderId: "",
    },
  ],
};

export { initialProductDetails, initialAdminProductDetailsDto };
