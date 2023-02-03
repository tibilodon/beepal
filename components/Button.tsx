"use client";
import React from "react";
import styles from "@/styles/button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  type?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, type, disabled }) => {
  return (
    <>
      <button className={styles.wrap} onClick={onClick}>
        {text || "Kész"}
      </button>
    </>
  );
};

export default Button;
