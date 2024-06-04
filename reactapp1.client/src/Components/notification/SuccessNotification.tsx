type PropTypes = {
  show: boolean;
  label?: string;
};

import styles from "./notification.module.css";
import { useState, useEffect } from "react";

function SuccessNotification({ show, label }: PropTypes) {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (show) {
      setShowComponent(true);
      timer = setTimeout(() => {
        setShowComponent(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [show]);

  return (
    <>
      {showComponent ? (
        <div className={styles.wrap}>
          {" "}
          <h1>{label || "Adatok mentése sikeres!"}</h1>
        </div>
      ) : null}
    </>
  );
}

export default SuccessNotification;
