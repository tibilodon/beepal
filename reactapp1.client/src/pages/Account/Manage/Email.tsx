import styles from "./manage.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppProvider } from "../../../Context/AppContext";
import SuccessNotification from "../../../Components/notification/SuccessNotification";
import Input from "../../../Components/form/input/Input";
import ButtonA from "../../../Components/buttons/ButtonA";


interface ChangeEmailData {
    email: string,
    newEmail: string,
    returnUrl: string
}

type ValidationErrors = {
    Error: string,
    Email: string,
    NewEmail: string
    returnUrl: string
}

function Email() {
    const initialFormData: ChangeEmailData = {
        email: "",
        newEmail: "",
        returnUrl: window.location.href
    };
    const { userDto } = useAppProvider();
    const [formData, setFormData] = useState<ChangeEmailData>(initialFormData);
    const [notification, setNotification] = useState<boolean>(false);

    useEffect(() => {
        if (userDto.email != "") {
            setFormData((prevVals: ChangeEmailData) => ({
                ...prevVals,
                email: userDto.email
            }));
        }
    }, [userDto]);

    const navigate = useNavigate();

    const initialValidationErrors: ValidationErrors = {
        Error: "",
        Email: "",
        NewEmail: "",
        returnUrl: ""
    };

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(initialValidationErrors);

    const onChangeHandler = (
        e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { id, value } = e.currentTarget;
        setFormData((prevVals: ChangeEmailData) => ({
            ...prevVals,
            [id]: value,
        }));
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/user/changeEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setNotification(true);

                //navigate("/account/emailChangeConfirmation");

            } else {
                const result = await response.json()
                setValidationErrors(result.errors);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <header>
                <h3 className={styles.pageHeader}>E-mail cím szerkesztése</h3>
            </header>
            {notification &&
                <p className="success">Megerősítő e-mail elküldve. Kérlek ellenőrizd az új e-mail címed!</p>
            }

            {validationErrors.Error && <span className="text-danger">{validationErrors.Error[0]}</span>}


            <div className={styles.wrap}>
                <form method="post" onSubmit={submitHandler}>
                    <div className={styles.inputs}>
                        <span className={styles.inputWrap}>
                            <h6>
                                Jelenlegi e-mail cím:
                            </h6>
                            <span className={styles.flexWrap}>
                                <p>{formData.email}</p>
                                <p className={styles.verfified}>
                                    ✓
                                </p>
                            </span>
                        </span>

                        <span className={styles.inputWrap}>
                            <h6 className="">Új e-mail cím</h6>
                            <Input type="text" value={formData.newEmail} id="newEmail" onChangeHandler={onChangeHandler} placeholder="Új E-mail cím" />
                            {validationErrors.Email && <span className="danger">{validationErrors.Email[0]}</span>}
                        </span>

                    </div>
                    <ButtonA label="Mentés" disabled={!formData.newEmail && true} type="submit" />

                </form>
            </div>

        </>
    );
}

export default Email;