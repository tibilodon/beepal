"use client";
import React from "react";
import Button from "@/components/Button";
import { deleteCookie } from "cookies-next";
export const dynamic = "force-dynamic";

interface CheckoutProps {
  props: any;
}

const Checkout: React.FC<CheckoutProps> = () => {
  const clearBasket = () => {
    deleteCookie("acacia");
  };
  return (
    <div>
      <h1>Checkout</h1>
      <Button text="CLEAR BASKET" onClick={clearBasket} />
    </div>
  );
};

export default Checkout;
