"use client";
import React from "react";
import Button from "@/components/Button";
import styles from "@/styles/nav.module.scss";
import Basket from "@/components/Basket";
import DropdownButton from "@/components/dropdown/DropdownButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  return (
    <nav className={styles.wrap}>
      <div className={styles.buttonWrap}>
        {/* <Button  text="Termékek" /> */}
        <DropdownButton />
        <Link href={"/about"}>
          <Button text="Rólunk" />
        </Link>
        <Link href={"/blog"}>
          <Button text="Blog" />
        </Link>
        <Link href={"/contact"}>
          <Button text="Kapcsolat" />
        </Link>
      </div>
      <div className={styles.basket}>
        <Link href={"/checkout"}>
          <Basket quantity={2} amount={4590} />
        </Link>
        {/* <Button  text="Kosár" /> */}
      </div>
    </nav>
  );
};

export default Navbar;
