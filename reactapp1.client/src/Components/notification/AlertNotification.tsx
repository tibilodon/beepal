import { Dispatch, SetStateAction } from "react";
import styles from "./notification.module.css";
import ButtonA from "../buttons/ButtonA";

//  parent component controlled

type AlertNotificationProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  onClick?: () => void;
};
function AlertNotification({ show, setShow, onClick }: AlertNotificationProps) {
  return (
    <>
      <section className={show ? styles.promptWrap : styles.hide}>
        <section className={styles.content}>
          <p>Biztosan törölni szeretné profilját?</p>
          <ButtonA
            label="Igen, kérem a fiókom és minden adatom törlését!"
            color="danger"
            onClick={onClick}
          />
          <ButtonA
            onClick={() => setShow(!show)}
            label="Visszalépés"
            color="success"
          />
        </section>
      </section>
    </>
  );
}

export default AlertNotification;
