// "use client";
import React from "react";
// import Button from "@/components/Button";
// import { deleteCookie } from "cookies-next";
// import { useRouter } from "next/navigation";
import Clearer from "./Clearer";

export const dynamic = "force-dynamic";

const Checkout: React.FC<any> = () => {
  // const router = useRouter();

  // const clearBasket = () => {
  //   deleteCookie("acacia");
  //   router.refresh();
  // };
  return (
    <div>
      <h1>Kosár</h1>
      <Clearer />
    </div>
  );
};

export default Checkout;
