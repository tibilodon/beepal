"use client";
import React from "react";
import Button from "@/components/Button";

interface CheckoutProps {
  props: any;
}

const Checkout: React.FC<CheckoutProps> = () => {
  const clearBasket = () => {
    localStorage.clear();
  };
  return (
    <div>
      <h1>Checkout</h1>
      <Button text="CLEAR BASKET" onClick={clearBasket} />
    </div>
  );
};

export default Checkout;
