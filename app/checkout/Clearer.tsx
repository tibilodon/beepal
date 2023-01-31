"use client";
import React from "react";
import Button from "@/components/Button";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Clearer: React.FC<any> = () => {
  const router = useRouter();

  const clearBasket = () => {
    deleteCookie("acacia");
    deleteCookie("mixed");
    deleteCookie("colza");
    router.refresh();
  };
  return (
    <div>
      <h1>CLEAR COMP</h1>
      <Button text="CLEAR BASKET" onClick={clearBasket} />
    </div>
  );
};

export default Clearer;
