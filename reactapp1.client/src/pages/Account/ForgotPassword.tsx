import { useState } from 'react';
import { useNavigate } from "react-router-dom"

interface ForgotPasswordData {
    email: string,
    returnUrl: string
}

type ValidationError = {
    Email:string
}

function ForgotPassword() {
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
                console.log(response)
                navigate("/account/forgotPasswordConfirmation");

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

    return (
        <>
            <h1>Forgot your password?</h1>
            <h2>Enter your email.</h2>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    <form method="post" onSubmit={submitHandler}>
                        {/*<DataAnnotationsValidator />*/}
                        {/*<ValidationSummary className="text-danger" role="alert" />*/}

                        <div className="form-floating mb-3">
                            <input id="email" type="email" className="form-control" aria-required="true" placeholder="name@example.com" onChange={onChangeHandler} />
                            {/*<InputText @bind-Value="Input.Email" className="form-control" autocomplete="username" aria-required="true" placeholder="name@example.com" />*/}
                            <label htmlFor="email" className="form-label">Email</label>
                            {validationErrors.Email && <span className="text-danger">{validationErrors.Email[0]}</span>}
                            {/*<ValidationMessage For="() => Input.Email" className="text-danger" />*/}
                        </div>
                        <button type="submit" className="w-100 btn btn-lg btn-primary">Reset password</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;