import React from "react";
import CookieFooter from "./CookieFooter";
import Dropdown from "@/components/dropdown/Dropdown";
import styles from "@/styles/home.module.scss";

interface HomeProps {
  props: any;
}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <div className={styles.wrap}>
        <div>
          <h1>Home</h1>
          <h1>Home</h1>
          <h1>Home</h1>
          <h1>Home4</h1>
          <CookieFooter />
        </div>
        <div className={styles.test}>{/* <Dropdown /> */}</div>
      </div>
    </>
  );
};

export default Home;
