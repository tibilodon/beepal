import React from "react";
import styles from "@/styles/dropdown.module.scss";
import Button from "../Button";
import Link from "next/link";

const Dropdown = () => {
  return (
    <div className={styles.wrap}>
      <Link href={"/products/acacia"}>
        <Button text="Akác méz" />
      </Link>
      <Link href={"/products/mixed"}>
        <Button text="Vegyes méz" />
      </Link>
      <Link href={"/products/colza"}>
        <Button text="Repce méz" />
      </Link>
    </div>
  );
};

export default Dropdown;
