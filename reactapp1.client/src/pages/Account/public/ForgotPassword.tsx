import styles from "./accountPublic.module.css";
import Input from "../../../Components/form/input/Input";
import icon from "../../../assets/icons/close.svg";
import ButtonA from "../../../Components/buttons/ButtonA";

import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useAppProvider } from "../../../Context/AppContext";

interface ForgotPasswordData {
    email: string,
    returnUrl: string
}

type ValidationError = {
    Email:string
}

function ForgotPassword() {
    const { showForgotPassword, setShowForgotPassword } = useAppProvider();

    const[responseState,setResponseState]=useState<null|string>(null)

    const navigate = useNavigate();

    const initialErrors = {
        Email: "",
    }
    const [validationErrors, setValidationErrors] = useState<ValidationError>(initialErrors)

    const initialFormData: ForgotPasswordData = {
        email: "",
        returnUrl: window.location.href
    };

    const [formData, setFormData] = useState<ForgotPasswordData>(
        initialFormData
    );

    const onChangeHandler = (
        e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { id, value } = e.currentTarget;
        setFormData((prevVals: ForgotPasswordData) => ({
            ...prevVals,
            [id]: value,
        }));
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/account/forgotpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setResponseState("A jelszó-visszaállító email sikeresen elküldve!")
                //navigate("/account/forgotPasswordConfirmation");

            } else {
                const result = await response.json()
                console.log(result.errors);
                setValidationErrors(result.errors);
            }
        } catch (error) {
            console.log(error);
            //setIsLoading(false);
            //setError(true);
        }
    }

    const handleClose = () => { setShowForgotPassword(false) }


    return (
        <>
            
            {responseState ?
                <div className={styles.wrap}>
                    <section className={styles.heroSection}>
                        <img onClick={handleClose} className={styles.icon} src={icon}></img>
                        <p className={ styles.responseMessage}>{responseState}</p>
                    </section>
                </div>
                :
                <div className={showForgotPassword ? styles.wrap : styles.hide}>
                    <section className={styles.heroSection}>
                        <img onClick={handleClose} className={styles.icon} src={icon}></img>
                        <h1>Elfelejtett jelszó</h1>
                        <h6>
                            Elvesztetted a jelszavad?
                            <br />
                            Kérjük, add meg felhasználóneved vagy e-mail címed. E-mailben pedig kapsz egy linket az új jelszó létrehozásához.
                        </h6>
                        {validationErrors.Error && <span >{validationErrors.Error[0]}</span>}
                        <form method="post" onSubmit={submitHandler}>
                            <div className={styles.content}>
                                <hr />
                                <div className={styles.inputs}>
                                    <Input id="email" placeholder="e-mail" type="email" onChangeHandler={onChangeHandler} />

                                </div>

                                <div>
                                    <ButtonA label="Jelszó visszaállítása" type="submit" disabled={!formData.email} />
                                </div>
                            </div>
                        </form>


                    </section>
                </div>
            }
        </>
    );
}

export default ForgotPassword;