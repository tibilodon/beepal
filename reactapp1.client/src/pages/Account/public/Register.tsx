import styles from "./accountPublic.module.css";

import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useAppProvider } from "../../../Context/AppContext";

import Input from "../../../Components/form/input/Input";
import icon from "../../../assets/icons/close.svg";
import ButtonA from "../../../Components/buttons/ButtonA";
interface RegisterData {
    email: string,
    password: string,
    confirmPassword: string,
    returnUrl: string
}

type ValidationErrors = {
    Error: string,
    Email: string,
    Password: string,
    ConfirmPassword: string,
    ReturnUrl: string
};
function Register() {
    const { showRegister, setShowRegister } = useAppProvider();
    const [responseState, setResponseState] = useState<null | string>(null)


    const navigate = useNavigate();

    const initialFormData: RegisterData = {
        email: "",
        password: "",
        confirmPassword: "",
        returnUrl: window.location.href
    };

    const [formData, setFormData] = useState<RegisterData>(
        initialFormData
    );

    const initialValidationErrors = {
        Error: "",
        ConfirmPassword: "",
        Email: "",
        Password: "",
        ReturnUrl: ""
    };

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(initialValidationErrors)


    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/account/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setResponseState("Regisztrációt megerősítő e-mail sikeresen elküldve. Kérjük ellenőrizze e-mail fiókját.")

                //navigate("/account/registerConfirmation");
            }
            else {
                const result = await response.json()
                setValidationErrors(result.errors);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onChangeHandler = (
        e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { id, value } = e.currentTarget;
        setFormData((prevVals: RegisterData) => ({
            ...prevVals,
            [id]: value,
        }));
    };

    const handleClose = () => { setShowRegister(false) }

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
                <div className={showRegister ? styles.wrap : styles.hide}>
                    <section className={styles.heroSection}>
                        <img onClick={handleClose} className={styles.icon} src={icon}></img>

                        <h1>Regisztráció</h1>
                        {validationErrors.Error && <span >{validationErrors.Error[0]}</span>}
                        <form method="post" onSubmit={submitHandler} >
                            <div className={styles.content}>
                                <hr />
                                <div className={styles.inputs}>
                                    <Input id="email" placeholder="e-mail" type="email" onChangeHandler={onChangeHandler} />
                                    {validationErrors.Email && <span >{validationErrors.Email[0]}</span>}
                                    <Input id="password" placeholder="jelszó" type="password" onChangeHandler={onChangeHandler} />
                                    {validationErrors.Password && <span >{validationErrors.Password[0]}</span>}
                                    <Input id="confirmPassword" placeholder="jelszó megerősítése" type="password" onChangeHandler={onChangeHandler} />
                                    {validationErrors.Password && <span >{validationErrors.ConfirmPassword[0]}</span>}

                                </div>


                                <div>
                                    <ButtonA label="Tovább" type="submit" disabled={!formData.email || !formData.password || !formData.confirmPassword} />
                                </div>

                            </div>
                        </form>


                    </section>
                </div>
            }
        </>
    );
}

export default Register;