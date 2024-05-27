import styles from "./button.module.css";

interface ButtonAProps {
    //  TODO: optional in dev
    onClick?: () => void;
    label: string;
    type?: string;
    disabled?: boolean;
};
function ButtonA({ onClick, label, type, disabled }: ButtonAProps) {
    return (
        <>
            <button className={styles.wrap} disabled={disabled||false} type={type || "button"} onClick={onClick}>
                {label}
            </button>
        </>
    );
}

export default ButtonA;