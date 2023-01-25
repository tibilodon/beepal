// "use client";
// import { useState, useEffect } from "react";
import styles from "@/styles/basket.module.scss";
import icon from "@/assets/emptyCart.svg";
import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
// import useZuState from "@/hooks/useZuState";

// export const dynamic = "force-dynamic";

// const get = async () => {
//   const quantity = JSON.parse(localStorage.getItem("acacia"));
//   return quantity;
// };

// const getC = async () => {

//   // const res = await getCookie("acacia");
//   // let val = Number(res);
//   return res;
// };

interface BasketProps {
  amount: number;
  // quantity: any;
}

const Basket = async () => {
  const nextCookies = cookies();

  const vals = nextCookies.get("acacia");
  // let basketValue = vals.map(val => val.value);
  // let basketValue = await getC();

  // let basketValue = 0;
  // console.log(vals.value);
  // // const [z, sZ] = useZuState(true);
  // const amount = 4950;
  // // const res = await get();

  // const router = useRouter();
  // // const refreshData = () => {
  // //   router.refresh();
  // // };
  // const [basketValue, setBasketValue] = useState([0]);

  // useEffect(() => {
  //   const cookieval = getCookie("acacia");
  //   let numVal = Number(cookieval);
  //   setBasketValue(numVal);
  //   // router.refresh();
  // }, [zu]);

  return (
    <>
      <button className={styles.wrap}>
        <Image alt="cart icon" src={icon} />

        {vals.value >= 1 ? (
          <p className={styles.quantity}>{vals.value || 1}</p>
        ) : (
          <p>Kosár</p>
        )}
        {vals.value >= 1 && <p className={styles.amount}>{242} Ft</p>}
      </button>
    </>
  );
};

export default Basket;
