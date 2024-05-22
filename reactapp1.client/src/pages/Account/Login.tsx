import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAppProvider } from "../../Context/AppContext"
interface LoginData {
    email: string,
    password: string,
    rememberMe: string
}

type ValidationErrors = {
    Error:string,
    Email: string,
    Password: string
}
function Login() {
    const { checkUser } = useAppProvider();
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
        Error:"",
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
                checkUser();
                navigate("/")
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

        setFormData((prevVals: LoginData) => ({
            ...prevVals,
            [id]: value,
        }));
    };
    return (
        <>
            <h1>Log in</h1>
                    {validationErrors.Error && <span className="text-danger">{validationErrors.Error[0]}</span>}
            <div className="">
                <section >
                    {/*<StatusMessage Message="@errorMessage" />*/}
    
                    <form method="post" onSubmit={handleSubmit} className="h-100">
                        <div className="p-5 d-flex flex-column">
                            {/*<DataAnnotationsValidator />*/}

                            <hr />
                            {/*<ValidationSummary className="text-danger" role="alert" />*/}
                            <div className="form-floating mb-3">
                                <input id="email" type="email" className="form-control" aria-required="true" placeholder="name@example.com" onChange={onChangeHandler} />
                                {/*<InputText @bind-Value="Input.Email" className="form-control" autocomplete="username" aria-required="true" placeholder="name@example.com" />*/}
                                <label htmlFor="email" className="form-label">Email</label>
                                {validationErrors.Email && <span className="text-danger">{validationErrors.Email[0]}</span>}

                                {/*<ValidationMessage For="() => Input.Email" className="text-danger" />*/}
                            </div>
                            <div className="form-floating mb-3">
                                <input id="password" type="password" className="form-control" aria-required="true" placeholder="password" onChange={onChangeHandler} />
                                {/*<InputText type="password" @bind-Value="Input.Password" className="form-control" autocomplete="current-password" aria-required="true" placeholder="password" />*/}
                                <label htmlFor="password" className="form-label">Password</label>
                                {validationErrors.Password && <span className="text-danger">{validationErrors.Password[0]}</span>}

                                {/*<ValidationMessage For="() => Input.Password" className="text-danger" />*/}
                            </div>
                            <div className="checkbox mb-3">
                                <label htmlFor="rememberMe" className="form-label">
                                    <input id="rememberMe" type="checkbox" className="darker-border-checkbox form-check-input" onChange={onChangeHandler} />
                                    {/*<InputCheckbox @bind-Value="Input.RememberMe" className="darker-border-checkbox form-check-input" />*/}
                                    <span className="p-1" >Remember me</span>
                                </label>
                            </div>
                            <div>
                                <button type="submit" className="w-100 btn btn-lg btn-primary">Log in</button>
                            </div>
                            <div className="d-flex flex-column p-3">
                                <p>
                                    <Link to={"/account/forgotPassword"}>Forgot your password?</Link>
                                </p>
                                <p>
                                    <Link to={"/account/register"}>Register as a new user</Link>
                                </p>
                                <p>
                                    <Link to={"/account/resendEmailConfirmation"}>Resend email confirmation</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </section>
            </div >
        </>
    );
}

export default Login;