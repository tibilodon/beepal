import React from "react";
import styles from "@/styles/dropdownButton.module.scss";
import icon from "@/assets/arrow_drop_down.svg";
import Image from "next/image";
import Dropdown from "./Dropdown";
import Link from "next/link";

const DropdownButton = () => {
  return (
    <div className={styles.wrap}>
      <Link href={"/products"}>
        <button className={styles.content}>
          <p>Termékek</p>
          <Image alt="dropdown arrow" src={icon} />
        </button>
      </Link>
      <div className={styles.dropdown}>
        <Dropdown />
      </div>
    </div>
  );
};

export default DropdownButton;
