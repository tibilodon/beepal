import React from "react";
import Clearer from "./Clearer";
import { cookies } from "next/headers";
import styles from "@/styles/checkoutProducts.module.scss";
import Image from "next/image";
//images
import acaciaImg from "@/assets/acacia.png";
import mixedImg from "@/assets/mixed.png";
import colzaImg from "@/assets/prod.jpg";
import AmountSelect from "@/components/AmountSelect";

const Checkout: React.FC<any> = () => {
  const nextCookies = cookies();

  const acacia: any = nextCookies.get("acacia");
  const colza: any = nextCookies.get("colza");
  const mixed: any = nextCookies.get("mixed");
  // console.log(typeof acacia.value);
  return (
    <div className={styles.wrap}>
      <h1>Kosár</h1>
      {acacia && (
        <>
          <div className={styles.content}>
            <Image
              className={styles.img}
              alt="a jar of acacia honey"
              src={acaciaImg}
            />
            {/* <h2>Acacia :{acacia.value}</h2> */}
            <AmountSelect
              name="acacia"
              amount={Number(acacia.value)}
              value={4000}
            />
            {/* <h2>value: {acacia.value * 4000} Ft</h2> */}
          </div>
        </>
      )}
      {mixed && (
        <>
          <div className={styles.content}>
            <Image
              className={styles.img}
              alt="a jar of acacia honey"
              src={mixedImg}
            />

            {/* <h2>mixed :{mixed.value}</h2> */}
            <AmountSelect
              name="mixed"
              amount={Number(mixed.value)}
              value={3000}
            />

            {/* <h2>value: {mixed.value * 3000} Ft</h2> */}
          </div>
        </>
      )}{" "}
      {colza && (
        <>
          <div className={styles.content}>
            <Image
              className={styles.img}
              alt="a jar of acacia honey"
              src={colzaImg}
            />
            {/*  */}
            {/* <h2>colza :{colza.value}</h2> */}
            <AmountSelect
              name="colza"
              amount={Number(colza.value)}
              value={3500}
            />

            {/* <h2>value: {colza.value * 3500} Ft</h2> */}
          </div>
        </>
      )}
      <Clearer />
    </div>
  );
};

export default Checkout;
