import React from "react";
import Wrap from "./Wrap";
import Checkout from "./Checkout";
import Link from "next/link";
import Image from "next/image";
import arrow from "@/assets/backArrowIcon.svg";
import styles from "@/styles/checkout.module.scss";
// import { cookies } from "next/headers";

// export const dynamic = "force-dynamic";

// import { cookies } from "next/headers";

const ServerWrap = () => {
  // const nextCookies = cookies();
  // const acacia: any = nextCookies.get("acacia");
  // console.log(acacia);
  return (
    <div className={styles.wrap}>
      <h1>ServerWrap</h1>
      {/* <Wrap> */}
      <Checkout
      // test={acacia}
      />
      {/* </Wrap> */}
      <Link href={"/products"}>
        <div className={styles.continue}>
          <Image className={styles.img} alt="back arrow icon" src={arrow} />
          <h3>Vásárlás folytatása</h3>
        </div>
      </Link>
    </div>
  );
};

export default ServerWrap;
