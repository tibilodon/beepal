import { AdminProductDetail, ProductDetail } from "../Types/commonTypes";

type Data = {
  products: AdminProductDetail[] | null;
  errors: string;
};

async function GetAllProducts(): Promise<Data> {
  try {
    const response = await fetch("/api/admin/products");
    const result = await response.json();

    console.log("i am taller", result);
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
