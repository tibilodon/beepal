import { CartItem } from "../Types/commonTypes";

async function GetCartItems() {
  try {
    const response = await fetch("/api/cookie");
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return result;
    } else {
      console.log("some error", response);
    }
  } catch (error) {
    console.log(error);
  }
}

async function AddItemToCart(item: CartItem) {
  try {
    const response = await fetch("/api/cookie/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
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

export { GetCartItems, AddItemToCart };
