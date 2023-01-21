"use client";
import React from "react";
import styles from "@/styles/button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <>
      <button className={styles.wrap} onClick={onClick}>
        {text || "button"}
      </button>
    </>
  );
};

export default Button;
