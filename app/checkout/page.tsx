import React from "react";
import Checkout from "./Checkout";
import Link from "next/link";
import Image from "next/image";
import arrow from "@/assets/backArrowIcon.svg";
import styles from "@/styles/checkout.module.scss";
import Continue from "./Continue";
// import { cookies } from "next/headers";

// export const dynamic = "force-dynamic";

// import { cookies } from "next/headers";

const ServerWrap = () => {
  // const nextCookies = cookies();
  // const acacia: any = nextCookies.get("acacia");
  // console.log(acacia);
  return (
    <div className={styles.wrap}>
      <div>
        <Checkout />
      </div>
      <div className={styles.content}>
        <Continue />
      </div>
    </div>
  );
};

export default ServerWrap;
