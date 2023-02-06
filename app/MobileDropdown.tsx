import React from "react";
import styles from "@/styles/mobileDropdown.module.scss";
import arrowDownIcon from "@/assets/arrow_drop_down.svg";
import Link from "next/link";
import Image from "next/image";

const MobileDropdown = () => {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <div className={styles.products}>
            <Link href={"/products"}>
              <h2 className={styles.h2}>
                Termékek
                <Image alt="arrow down icon" src={arrowDownIcon} />
              </h2>
            </Link>
            <div className={styles.item}>
              <Link href={"/products/acacia"}>
                <span>Akác Méz</span>
              </Link>
              <Link href={"/products/mixed"}>
                <span>Vegyes Méz</span>
              </Link>
              <Link href={"/products/colza"}>
                <span>Repce Méz</span>
              </Link>
            </div>
          </div>
        </div>

        <Link href={"/blog"}>
          <h2>Blog</h2>
        </Link>
        <Link href={"/about"}>
          <h2>Rólunk</h2>
        </Link>
        <Link href={"/contact"}>
          <h2>Kapcsolat</h2>
        </Link>
      </div>
    </>
  );
};

export default MobileDropdown;
