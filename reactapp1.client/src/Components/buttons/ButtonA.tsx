import styles from "./button.module.css";
import { useState, useEffect } from "react";

type ColorTypes = {
    color?: "danger" | "success" | "basic"
}


interface ButtonAProps {
    //  TODO: optional in dev
    onClick?: () => void;
    label: string;
    type?: 'submit' | 'reset' | 'button' | undefined;
    disabled?: boolean;
    color: ColorTypes;

};

function ButtonA({ onClick, label, type, disabled, color }: ButtonAProps) {
    const [currentColor, setCurrentColor] = useState<string>("")


    useEffect(() => {
        const setColor = () => {
            let result: string;
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
            console.log(setCurrentColor);

        };
        setColor();
    })

    return (
        <>
            <button className={currentColor} disabled={disabled || false} type={type || "button"} onClick={onClick}>
                {label}
            </button>
        </>
    );
}

export default ButtonA;