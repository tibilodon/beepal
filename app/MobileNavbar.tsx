"use client";
import { useState } from "react";
import icon from "@/assets/menuIcon.svg";
import Image from "next/image";
import styles from "@/styles/mobileNav.module.scss";
import Link from "next/link";
import MobileDropdown from "./MobileDropdown";

const MobileNavbar: React.FC<any> = () => {
  const [isActive, setIsActive] = useState(false);

  const activeHandler = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div onClick={activeHandler} className={styles.wrap}>
        {/* <h1>Menu</h1> */}
        <Image alt="home icon" src={icon} />
      </div>
      <div
        onClick={activeHandler}
        className={isActive ? styles.contentActive : styles.content}
      >
        <MobileDropdown />
      </div>
    </>
  );
};

export default MobileNavbar;
