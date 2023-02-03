import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/continue.module.scss";
import arrow from "@/assets/backArrowIcon.svg";
import Button from "@/components/Button";

//TODO: ----add  location.reload() if state/fetch is struggling

const Continue = () => {
  return (
    <>
      <div className={styles.wrap}>
        <Link href={"/products"}>
          <Button
            text={
              <>
                <div className={styles.content}>
                  <Image
                    className={styles.img}
                    alt="back arrow icon"
                    src={arrow}
                  />
                  <h3>Vásárlás folytatása</h3>
                </div>
              </>
            }
          />
        </Link>
      </div>
    </>
  );
};

export default Continue;
