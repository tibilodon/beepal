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
      <input
        className={styles.wrap}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        required
      />
    </>
  );
};

export default Input;
