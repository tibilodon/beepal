import ButtonA from "../buttons/ButtonA";
import styles from "./statusMessage.module.css"

type StatusMessageProps = {
    onClickHandler: () => {};
    label: string;
    type: "success" | "danger";
    statusMessage: string;
};
function StatusMessage({ onClickHandler, label, statusMessage, type }: StatusMessageProps) {
    return (
        <section className={styles.statusMessage}>

            <h1 className={type}>{statusMessage}</h1>
            <ButtonA label={label} onClick={onClickHandler} />
        </section>
    );
}

export default StatusMessage;