import styles from "./accountPublic.module.css";
import Input from "../../../Components/form/input/Input";
import icon from "../../../assets/icons/close.svg";
import ButtonA from "../../../Components/buttons/ButtonA";

import { useState } from 'react';
import { useAppProvider } from "../../../Context/AppContext";

interface ResendEmailConfirmationData {
    email: string,
    returnUrl: string
}

type ValidationErrors = {
    Error: string,
    Email: string,
    
}

function ResendEmailConfirmation() {
    const {showResendEmailConfirmation,setShowResendEmailConfirmation } = useAppProvider();

    const [responseState, setResponseState] = useState<null | string>(null)


    const initialFormData: ResendEmailConfirmationData = {
        email: "",
        returnUrl: window.location.href
    };

    const [formData, setFormData] = useState<ResendEmailConfirmationData>(
        initialFormData
    );

    const onChangeHandler = (
        e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { id, value } = e.currentTarget;
        setFormData((prevVals: ResendEmailConfirmationData) => ({
            ...prevVals,
            [id]: value,
        }));
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/account/resendemailconfirmation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setResponseState("Megerősítő e-mail újra elküldve.")
            }
            else {
                const result = await response.json()
                setValidationErrors(result.errors);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => { setShowResendEmailConfirmation(false) }

    const initialValidationErrors = {
        Error: "",
        Email: "",

    };
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(initialValidationErrors);

    return (
        <>
          

            {responseState ?
                <div className={styles.wrap}>
                    <section className={styles.heroSection}>
                        <img onClick={handleClose} className={styles.icon} src={icon}></img>
                        <p className={styles.responseMessage}>{responseState}</p>
                    </section>
                </div>
                :
                <div className={showResendEmailConfirmation ? styles.wrap : styles.hide}>
                    <section className={styles.heroSection}>
                        <img onClick={handleClose} className={styles.icon} src={icon}></img>
                        <h1>Elfelejtett jelszó</h1>
                        {validationErrors.Error && <span className="danger" >{validationErrors.Error[0]}</span>}
                        <h6>
                            Kérjük, add meg e-mail címed amellyel korábban regisztráltál.
                        </h6>
                        {/*{validationErrors.Error && <span >{validationErrors.Error[0]}</span>}*/}
                        <form method="post" onSubmit={submitHandler}>
                            <div className={styles.content}>
                                <hr />
                                <div className={styles.inputs}>
                                    <Input value={ formData.email} id="email" placeholder="e-mail" type="email" onChangeHandler={onChangeHandler} />
                                    {validationErrors.Email && <span className="danger">{validationErrors.Email[0]}</span>}

                                </div>

                                <div>
                                    <ButtonA label="Megerősítő e-mail újraküldése" type="submit" disabled={!formData.email} />
                                </div>
                            </div>
                        </form>


                    </section>
                </div>
            }
        </>
    );
}

export default ResendEmailConfirmation;