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

async function AddProduct(item: ProductDetail) {
  try {
    const response = await fetch("/api/admin/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    console.log(item);
    const result = await response.json();
    if (response.ok) {
      console.log("PRODUCT ADDED, RESULT:", result);
      return result.products;
    } else {
      console.log("some error", response);
    }
  } catch (error) {
    console.log(error);
  }
}

async function DeleteProduct(id: string) {
  try {
    const response = await fetch(`/api/admin/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("to be deleted:", id);
    const result = await response.json();
    if (response.ok) {
      console.log(result);
      return result.products;
    } else {
      console.log("some error", response);
    }
  } catch (error) {
    console.log(error);
  }
}

async function UpdateProduct(item: ProductDetail) {
  try {
    const response = await fetch(`/api/admin/product/update/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    console.log(item);
    const result = await response.json();
    if (response.ok) {
      console.log(result);
      return result.products;
    } else {
      console.log("some error", response);
    }
  } catch (error) {
    console.log(error);
  }
}

export { GetAllProducts, AddProduct, DeleteProduct, UpdateProduct };
