import React from "react";
import Clearer from "./Clearer";
import { cookies } from "next/headers";
import styles from "@/styles/checkoutProducts.module.scss";
import Image from "next/image";
//images
import acaciaImg from "@/assets/acacia.png";
import mixedImg from "@/assets/mixed.png";
import colzaImg from "@/assets/prod.jpg";

const Checkout: React.FC<any> = () => {
  const nextCookies = cookies();

  const acacia: any = nextCookies.get("acacia");
  const colza: any = nextCookies.get("colza");
  const mixed: any = nextCookies.get("mixed");
  return (
    <div className={styles.wrap}>
      <h1>Kosár</h1>
      {acacia && (
        <>
          <div>
            <Image alt="a jar of acacia honey" src={acaciaImg} />
            <h2>Acacia :{acacia.value}</h2>
            <h2>value: {acacia.value * 4000} Ft</h2>
          </div>
        </>
      )}
      {mixed && (
        <>
          <div>
            <Image alt="a jar of acacia honey" src={mixedImg} />

            <h2>mixed :{mixed.value}</h2>
            <h2>value: {mixed.value * 3000} Ft</h2>
          </div>
        </>
      )}{" "}
      {colza && (
        <>
          <div>
            <Image alt="a jar of acacia honey" src={colzaImg} />

            <h2>colza :{colza.value}</h2>
            <h2>value: {colza.value * 3500} Ft</h2>
          </div>
        </>
      )}
      <Clearer />
    </div>
  );
};

export default Checkout;
