import React from "react";
import Checkout from "./Checkout";
import styles from "@/styles/checkout.module.scss";
import Continue from "./Continue";

const ServerWrap = () => {
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
