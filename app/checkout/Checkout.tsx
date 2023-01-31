// "use client";
import React from "react";
// import Button from "@/components/Button";
// import { deleteCookie } from "cookies-next";
// import { useRouter } from "next/navigation";
import Clearer from "./Clearer";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const Checkout: React.FC<any> = ({ test }) => {
  const nextCookies = cookies();

  // const all = nextCookies.getAll();
  const acacia: any = nextCookies.get("acacia");
  const colza: any = nextCookies.get("colza");
  const mixed: any = nextCookies.get("mixed");
  // console.log(all);
  let anotherCheck;
  if (acacia) {
    anotherCheck = acacia.value;
  }
  // const router = useRouter();

  // const clearBasket = () => {
  //   deleteCookie("acacia");
  //   router.refresh();
  // };
  return (
    <div>
      <h1>Kosár</h1>
      {acacia && (
        <>
          <h1>server again</h1>
          <h2>Acacia :{acacia.value}</h2>
          <h2>value: {acacia.value * 3500} Ft</h2>
        </>
      )}
      {test && (
        <>
          <h1>Props</h1>
          <h2>Acacia :{test.value}</h2>
          <h2>value: {test.value * 3500} Ft</h2>
        </>
      )}
      {anotherCheck && (
        <>
          <h1>another check</h1>
          <h2>{anotherCheck}</h2>
        </>
      )}
      <Clearer />
    </div>
  );
};

export default Checkout;
