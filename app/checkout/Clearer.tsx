"use client";
import React from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import deleteIcon from "@/assets/deleteIcon.svg";
import Image from "next/image";
import styles from "@/styles/clearer.module.scss";
import Button from "@/components/Button";

interface ClearerProps {
  cookieName: string;
}
const Clearer: React.FC<ClearerProps> = ({ cookieName }) => {
  const router = useRouter();

  const clearHandler = (name: string): any => {
    deleteCookie(name);
    router.refresh();
    location.reload();
  };
  return (
    <>
      <div className={styles.wrap}>
        <Button
          text={
            <Image
              onClick={() => clearHandler(cookieName)}
              className={styles.content}
              alt="Delete Icon"
              src={deleteIcon}
            />
          }
        />
      </div>
    </>
  );
};

export default Clearer;
