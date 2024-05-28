import styles from "./accountPublic.module.css";
import { useState } from 'react';
import {  useNavigate } from "react-router-dom";
import { useAppProvider } from "../../../Context/AppContext"
import Input from "../../../Components/form/input/Input";
import icon from "../../../assets/icons/close.svg";
import ButtonA from "../../../Components/buttons/ButtonA";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import ResendEmailConfirmation from "./ResendEmailConfirmation";


interface LoginData {
    email: string,
    password: string,
    rememberMe: string
}

type ValidationErrors = {
    Error: string,
    Email: string,
    Password: string
}
function Login() {
    const { checkUser, showLogin, setShowLogin, sideNav, setSideNav, showRegister, setShowRegister,showForgotPassword,setShowForgotPassword,showResendEmailConfirmation,setShowResendEmailConfirmation } = useAppProvider();
    const navigate = useNavigate();
    const initialFormData: LoginData = {
        email: "",
        password: "",
        rememberMe: ""
    };

    const [formData, setFormData] = useState<LoginData>(
        initialFormData
    );

    const initialValidationErrors = {
        Error: "",
        Email: "",
        Password: ""
    };
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(initialValidationErrors);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                await checkUser();
                setShowLogin(false);
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
        e: React.FormEvent<HTMLInputElement>
    ): void => {
        const { id, value } = e.currentTarget;

        setFormData((prevVals: LoginData) => ({
            ...prevVals,
            [id]: value,
        }));
    };

    const handleShowRegistration = () => {
        setShowLogin(false);
        if (sideNav) {
            setSideNav(false)
        };
        setShowRegister(true)
    }

    const handleShowForgotPassword = () => {
        setShowLogin(false);
        if (sideNav) {
            setSideNav(false)
        };
        setShowForgotPassword(true)
    }

    const handleShowResendEmailConfirmation = () => {
        setShowLogin(false);
        if (sideNav) {
            setSideNav(false)
        };
        setShowResendEmailConfirmation(true)
    }

    const handleClose = () => { setShowLogin(false) }
    return (
        <>
            {showRegister && <Register />}
            {showForgotPassword && <ForgotPassword/> }
            {showResendEmailConfirmation && <ResendEmailConfirmation/> }
            <div className={showLogin ? styles.wrap : styles.hide}>
                <section className={styles.heroSection}>
                    <img onClick={handleClose} className={styles.icon} src={icon}></img>

                    <h1>Bejelentkezés</h1>
                    {validationErrors.Error && <span >{validationErrors.Error[0]}</span>}
                    <form method="post" onSubmit={handleSubmit}>
                        <div className={styles.content}>
                            <hr />
                            <div className={styles.inputs}>
                                <Input id="email" placeholder="e-mail" type="email" onChangeHandler={onChangeHandler} />
                                {validationErrors.Email && <span >{validationErrors.Email[0]}</span>}
                                <Input id="password" placeholder="jelszó" type="password" onChangeHandler={onChangeHandler} />
                                {validationErrors.Password && <span >{validationErrors.Password[0]}</span>}

                            </div>
                            <div className={styles.rememberMe} >
                                <input className={styles.checkboxInput} id="rememberMe" type="checkbox" onChange={onChangeHandler} />
                                <h6 >Remember me</h6>
                            </div>
                            <div>
                                <ButtonA label="Tovább" type="submit" disabled={!formData.email || !formData.password} />
                            </div>
                            <ul className={styles.bottomLinks}>
                                <li onClick={ handleShowRegistration} className={styles.links}>Regisztráció</li>
                                <li onClick={handleShowForgotPassword} className={styles.links}>Elfelejtett jelszó</li>
                                <li onClick={handleShowResendEmailConfirmation} className={styles.links}>E-mail cím megerősítő újraküldése</li>
                            </ul>
                        </div>
                    </form>


                </section>
            </div>
        </>
    );
}

export default Login;