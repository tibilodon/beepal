"use client";
import React from "react";
import styles from "@/styles/input.module.scss";

interface InputProps {
  type: string;
  placeholder: string;
  onChange: (e: any) => void;
  name: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder, onChange, name }) => {
  return (
    <>
      {/* <div className={styles.wrap}> */}
      <input
        className={styles.content}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        required
      />
      {/* </div> */}
    </>
  );
};

export default Input;
