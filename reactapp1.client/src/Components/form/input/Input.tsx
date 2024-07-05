import styles from "./input.module.css";
import icon from "../../../assets/icons/visibility.svg";
import { useState } from "react";

type Props = {
  type: string;
  placeholder: string;
  onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  id: string;
  value?: string | number | readonly string[] | undefined;
};
const Input: React.FunctionComponent<Props> = ({
  type,
  placeholder,
  onChangeHandler,
  id,
  value,
}) => {
  const [currentType, setCurrentType] = useState(type);

  const handleType = () => {
    switch (currentType) {
      case "password":
        setCurrentType("text");
        break;
      case "text":
        setCurrentType("password");
        break;
    }
  };
  return (
    <div className={styles.wrap}>
      <input
        className={
          type === "password"
            ? `${styles.input} ${styles.passwordInput}`
            : styles.input
        }
        value={value || ""}
        id={id}
        type={currentType}
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
      {type === "password" && <img onClick={handleType} src={icon}></img>}
    </div>
  );
};

export default Input;
