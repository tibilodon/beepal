"use client";
import { setCookie } from "cookies-next";

import React from "react";
import styles from "@/styles/cookie.module.scss";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

const CookieFooter = () => {
  const router = useRouter();

  const acceptCookie = () => {
    setCookie("tncCookie", 1);
    router.refresh();
  };
  return (
    <>
      <footer className={styles.wrap}>
        <p>
          A weboldal cookie-kat használ a jobb felhasználói élmény érdekében.
          Ehhez kérjük hozzájárulását.
        </p>
        <div>
          <Button onClick={acceptCookie} text="Elfogadom" />
          <Link href={"/terms-and-conditions"}>
            <Button text="Adatvédelmi irányelvek" />
          </Link>
        </div>
      </footer>
    </>
  );
};

export default CookieFooter;
