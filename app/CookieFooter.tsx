import React from "react";
import styles from "@/styles/cookie.module.scss";
import Button from "@/components/Button";
import Link from "next/link";

const CookieFooter = () => {
  return (
    <>
      <footer className={styles.wrap}>
        <p>
          A weboldal cookie-kat használ a jobb felhasználói élmény érdekében.
          Ehhez kérjük hozzájárulását.
        </p>
        <div>
          <Button text="Elfogadom" />
          <Link href={"/terms-and-conditions"}>
            <Button text="Adatvédelmi irányelvek" />
          </Link>
        </div>
      </footer>
    </>
  );
};

export default CookieFooter;
