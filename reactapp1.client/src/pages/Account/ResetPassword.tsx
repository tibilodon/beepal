import { useState } from 'react';
import { useNavigate } from "react-router-dom"
interface ResetPasswordData {
    email: string,
    password: string,
    confirmPassword: string,
    code:string
}

type ValidationError = {
    Email: string,
    Password: string,
    ConfirmPassword: string,
    Code:string
}

function ResetPassword() {
    const navigate = useNavigate();

    const urlParams = new URLSearchParams(window.location.search);
    const initialFormData: ResetPasswordData = {
        email: "",
        password: "",
        confirmPassword: "",
        code: urlParams.get('code')!
    };

    const [formData, setFormData] = useState<ResetPasswordData>(initialFormData)

    const initialErrors = {
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Code: ""
    }

    const [validationErrors, setValidationErrors] = useState<ValidationError>(initialErrors)

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/account/resetpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                navigate("/account/resetpasswordConfirmation");

            } else {
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
        setFormData((prevVals: ResetPasswordData) => ({
            ...prevVals,
            [id]: value,
        }));
    };

    return (
        <>
            <h1>Reset password</h1>
            <h2>Reset your password.</h2>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    {validationErrors.Code && <span className="text-danger">{validationErrors.Code[0]}</span>}
                    <form method="post" onSubmit={submitHandler}>
                        <div className="form-floating mb-3">
                            <input type="email" id="email" className="form-control" aria-required="true" placeholder="name@example.com" onChange={onChangeHandler} />
                            <label htmlFor="email" className="form-label">Email</label>
                            {validationErrors.Email && <span className="text-danger">{validationErrors.Email[0]}</span>}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" id="password" className="form-control" aria-required="true" placeholder="Please enter your password." onChange={onChangeHandler} />
                            <label htmlFor="password" className="form-label">Password</label>
                            {validationErrors.Password && <span className="text-danger">{validationErrors.Password[0]}</span>}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" id="confirmPassword" className="form-control" aria-required="true" placeholder="Please confirm your password." onChange={onChangeHandler} />
                            <label htmlFor="confirm-password" className="form-label">Confirm password</label>
                            {validationErrors.ConfirmPassword && <span className="text-danger">{validationErrors.ConfirmPassword[0]}</span>}
                        </div>
                        <button type="submit" className="w-100 btn btn-lg btn-primary">Reset</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;