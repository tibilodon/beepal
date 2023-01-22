import React from "react";
import CookieFooter from "./CookieFooter";
import Dropdown from "@/components/dropdown/Dropdown";
import styles from "@/styles/home.module.scss";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

interface HomeProps {
  props: any;
}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <div className={styles.wrap}>
        <div>
          <h1>Kiváló minőségű méz az alföld szívéből.</h1>

          <Button text="Vásárlás" />
          <CookieFooter />
        </div>
        <div className={styles.test}>{/* <Dropdown /> */}</div>
      </div>
    </>
  );
};

export default Home;
