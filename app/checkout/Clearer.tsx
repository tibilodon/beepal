"use client";
import React from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import deleteIcon from "@/assets/deleteIcon.svg";
import Image from "next/image";

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
      <button onClick={() => clearHandler(cookieName)}>
        <Image alt="Delete Icon" src={deleteIcon} />
      </button>
    </>
  );
};

export default Clearer;
