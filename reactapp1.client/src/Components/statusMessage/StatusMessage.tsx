import ButtonA from "../buttons/ButtonA";
import styles from "./statusMessage.module.css";

type StatusMessageProps = {
  onClickHandler: () => void;
  buttonLabel: string;
  type: "success" | "danger";
  statusMessage: string;
};
function StatusMessage({
  onClickHandler,
  buttonLabel,
  statusMessage,
  type,
}: StatusMessageProps) {
  return (
    <section className={styles.statusMessage}>
      <h1 className={type}>{statusMessage}</h1>
      <ButtonA label={buttonLabel} onClick={onClickHandler} />
    </section>
  );
}

export default StatusMessage;
