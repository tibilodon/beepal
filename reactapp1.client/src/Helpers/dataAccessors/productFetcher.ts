import { ProductDetail } from "../Types/commonTypes";

type Data = {
  products: ProductDetail[] | null;
  errors: string;
};

async function GetAllProducts(): Promise<Data> {
  try {
    const response = await fetch("/api/product");
    const result = await response.json();

    if (response.ok) {
      return { errors: "", products: result.products };
    } else {
      console.log("some error", result);
      return { errors: result.errors, products: null };
    }
  } catch (error) {
    console.log(error);
    return {
      errors: `error`,
      products: null,
    };
  }
}
export { GetAllProducts };
