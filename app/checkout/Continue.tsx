import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/continue.module.scss";
import arrow from "@/assets/backArrowIcon.svg";

//TODO: ----add  location.reload() if state/fetch is struggling

const Continue = () => {
  return (
    <>
      <Link href={"/products"}>
        <div className={styles.wrap}>
          <Image className={styles.img} alt="back arrow icon" src={arrow} />
          <h3>Vásárlás folytatása</h3>
        </div>
      </Link>
    </>
  );
};

export default Continue;
