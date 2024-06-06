async function GetCartItems() {
  try {
    const response = await fetch("/api/cookie");
    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      console.log("some error", response);
    }
  } catch (error) {
    console.log(error);
  }
}

export { GetCartItems };
