import React from "react";
import { cookies } from "next/headers";
import styles from "@/styles/order.module.scss";
import Image from "next/image";
import logo from "@/assets/beepalogo5.png";
import Link from "next/link";

const Done = () => {
  const nextCookies = cookies();
  const orderNoCookie = nextCookies.get("orderNo");
  const orderNo: number = Number(orderNoCookie?.value);
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <h2>
            Köszönjük <span>{orderNo}</span> számú rendelését!
          </h2>
          <p>
            Hamarosan e-mail-ben értesítjük rendelésének állapotáról. Amennyiben
            bármilyen kérdése van, kérjük lépjen velünk{" "}
            <Link href={"/contact"}>
              <span>kapcsolatba</span>
            </Link>
            .
          </p>
          <Image className={styles.img} alt="company logo" src={logo} />
        </div>
      </div>
    </>
  );
};

export default Done;
