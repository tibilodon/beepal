import styles from "./button.module.css";
import { useState, useEffect } from "react";

type ColorTypes = "danger" | "success" | "basic";

interface ButtonAProps {
  //  TODO: optional in dev
  onClick?: () => void;
  label: string;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  color?: ColorTypes;
}

function ButtonA({ onClick, label, type, disabled, color }: ButtonAProps) {
  const [currentColor, setCurrentColor] = useState<string>("");

  useEffect(() => {
    const setColor = () => {
      if (color) {
        switch (color) {
          case "danger":
            setCurrentColor(`${styles.basic} ${styles.danger}`);
            break;
          case "success":
            setCurrentColor(`${styles.basic} ${styles.success}`);
            break;
          case "basic":
            setCurrentColor(`${styles.basic}`);
            break;
        }
      } else {
        setCurrentColor(`${styles.basic}`);
      }
    };
    setColor();
  });

  return (
    <>
      <button
        className={currentColor}
        disabled={disabled || false}
        type={type || "button"}
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
}

export default ButtonA;
