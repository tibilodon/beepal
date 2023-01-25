"use client";
import React from "react";
import Button from "@/components/Button";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

const Checkout: React.FC<any> = () => {
  const router = useRouter();

  const clearBasket = () => {
    deleteCookie("cookie");
    router.refresh();
  };
  return (
    <div>
      <h1>Checkout</h1>
      <Button text="CLEAR BASKET" onClick={clearBasket} />
    </div>
  );
};

export default Checkout;
