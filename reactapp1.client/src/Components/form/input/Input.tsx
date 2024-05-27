import styles from "./input.module.css";
import icon from "../../../assets/icons/visibility.svg";
import { useState } from "react";

type Props = {
    type: string;
    placeholder: string;
    onChangeHandler: (
        e: React.FormEvent<HTMLInputElement>
    ) => void;
    id: string;
};
const Input: React.FunctionComponent<Props> = ({
    type,
    placeholder,
    onChangeHandler,
    id,
}) => {
    const [show, setShow] = useState(false);
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
    }
    return (
        <div className={styles.wrap}>
            <input className={ styles.input}
                id={id}
                type={currentType}
                placeholder={placeholder}
                onChange={onChangeHandler}
            />
            {type === "password" &&
                <img onClick={handleType} src={icon}></img>
            }
        </div>
    );
};

export default Input;
