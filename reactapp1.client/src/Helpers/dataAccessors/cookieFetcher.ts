import { initialProductDetailDto } from "../initialDatas/initialData";
import { GetCartItemsResult, ProductDetailDto } from "../Types/commonTypes";

async function GetCartItems(): Promise<GetCartItemsResult> {
  try {
    console.log("tried to run");
    const response = await fetch("/api/cookie", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await response.json();
    if (response.ok) {
      console.log(result);
      return result;
    } else {
      // return {products:[{...initialProductDetails, placedInCartQuantity:0}, itemCounter:0]}
      console.log("some error", response);
      return result;
    }
  } catch (error) {
    console.log(error);
    return {
      products: [initialProductDetailDto],
      itemCounter: 0,
      totalAmount: 0,
    };
  }
}

async function AddItemToCart(item: ProductDetailDto): Promise<boolean> {
  try {
    const response = await fetch("/api/cookie/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
      credentials: "include",
    });
    // const result = await response.json();
    if (response.ok) {
      console.log("cookie result", response);
      return true;
    } else {
      console.log("some error", response);
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function DeleteCookie(id: string, packaging: number): Promise<boolean> {
  try {
    const response = await fetch(`/api/cookie/${id}/${packaging}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    // const result = await response.json();
    if (response.ok) {
      console.log(response);
      return true;
    } else {
      console.log("some error", response);
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { GetCartItems, AddItemToCart, DeleteCookie };
