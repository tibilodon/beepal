import { initialProductDetails } from "../initialDatas/initialData";
import { ProductDetail } from "../Types/commonTypes";

async function GetAllProducts(): Promise<ProductDetail[]> {
  try {
    const response = await fetch("/api/admin/products");
    const result = await response.json();
    if (response.ok) {
      console.log(result);
      return result.products;
    } else {
      console.log("some error", result);
      return [initialProductDetails];
    }
  } catch (error) {
    console.log(error);
    return [initialProductDetails];
  }
}

async function AddProduct(
  e: React.FormEvent<HTMLFormElement>,
  item: ProductDetail
) {
  e.preventDefault();
  try {
    const response = await fetch("/api/admin/add/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    console.log(item);
    const result = await response.json();
    if (response.ok) {
      console.log(result);
    } else {
      console.log("some error", response);
    }
  } catch (error) {
    console.log(error);
  }
}

export { GetAllProducts, AddProduct };
