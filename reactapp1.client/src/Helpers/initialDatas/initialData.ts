import { Category, Packaging, ProductDetail } from "../Types/commonTypes";

const initialProductDetails: ProductDetail = {
  category: Category.Honey,
  description: "",
  imageUrl: "",
  name: "",
  packaging: Packaging.Regular,
  price: 0,
  stock: 0,
};

export { initialProductDetails };
