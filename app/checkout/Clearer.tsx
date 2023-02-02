"use client";
import React from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import deleteIcon from "@/assets/deleteIcon.svg";
import Image from "next/image";
import styles from "@/styles/clearer.module.scss";

interface ClearerProps {
  cookieName: string;
}
const Clearer: React.FC<ClearerProps> = ({ cookieName }) => {
  const router = useRouter();

  const clearHandler = (name: string): any => {
    deleteCookie(name);
    // deleteCookie("mixed");
    // deleteCookie("colza");
    // router.push("/checkout");
    router.refresh();
    location.reload();
  };
  return (
    <>
      {/* <div className={styles.wrap} onClick={() => clearHandler(cookieName)}> */}
      <Image
        onClick={() => clearHandler(cookieName)}
        className={styles.wrap}
        alt="Delete Icon"
        src={deleteIcon}
      />
      {/* </div> */}
    </>
  );
};

export default Clearer;
