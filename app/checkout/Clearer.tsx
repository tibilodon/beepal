"use client";
import React from "react";
import Button from "@/components/Button";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Clearer: React.FC<any> = () => {
  const router = useRouter();

  const clearBasket = () => {
    deleteCookie("acacia");
    deleteCookie("mixed");
    deleteCookie("colza");
    // router.push("/checkout");
    router.refresh();
    location.reload();
  };
  return (
    <div>
      <h1>CLEAR COMP</h1>
      {/* <Link href={"/checkout"}> */}
      <Button text="CLEAR BASKET" onClick={clearBasket} />
      {/* </Link> */}
    </div>
  );
};

export default Clearer;
