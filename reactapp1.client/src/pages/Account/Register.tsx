import { useState } from 'react';
import { useNavigate } from "react-router-dom"
interface RegisterData {
    email: string,
    password: string,
    confirmPassword: string,
    returnUrl: string
}

type ValidationErrors = {
    Error:string,
    Email: string,
    Password: string,
    ConfirmPassword: string,
    ReturnUrl: string
};
function Register() {
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

    const initialValidationErrors ={
        Error:"",
        ConfirmPassword: "",
        Email: "",
        Password: "",
        ReturnUrl:""
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
                navigate("/account/registerConfirmation");
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

    return (
        <>
            <h1>Register</h1>

            <div className="row">
                <div className="col-md-4">
                    <form method="post" onSubmit={submitHandler}>
                        <h2>Create a new account.</h2>
                        <hr />
                        {validationErrors.Error && <span className="text-danger">{validationErrors.Error[0]}</span>}
                        <div className="form-floating mb-3">
                            <input id="email" type="email" className="form-control" aria-required="true" placeholder="name@example.com" onChange={onChangeHandler} />
                            <label htmlFor="email">Email</label>
                            {validationErrors.Email && <span className="text-danger">{validationErrors.Email[0]}</span>}
                        </div>
                        <div className="form-floating mb-3">
                            <input id="password" type="password" className="form-control" aria-required="true" placeholder="password" onChange={onChangeHandler} />
                            <label htmlFor="password">Password</label>
                            {validationErrors.Password && <span className="text-danger">{validationErrors.Password[0]}</span>}
                        </div>
                        <div className="form-floating mb-3">
                            <input id="confirmPassword" type="password" className="form-control" aria-required="true" placeholder="confirm password" onChange={onChangeHandler} />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            {validationErrors.ConfirmPassword && <span className="text-danger">{validationErrors.ConfirmPassword[0]||validationErrors.ConfirmPassword[description]}</span>}
                        </div>
                        <button type="submit" className="w-100 btn btn-lg btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;