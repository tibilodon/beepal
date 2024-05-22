import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ValidationError = {
    Error: string,
    Password: string,
    NewPassword: string,
    ConfirmPassword: string
};

type ChangePasswordData = {
    password: string,
    newPassword: string,
    confirmPassword: string
};

function ChangePassword() {
    const navigate = useNavigate();


    const initialFormData = {
        password: "",
        newPassword: "",
        confirmPassword: ""

    };
    const [formData, setFormData] = useState<ChangePasswordData>(initialFormData);

    const initialErrors = {
        Error: "",
        Password: "",
        NewPassword: "",
        ConfirmPassword: ""
    };

    const [validationErrors, setValidationErrors] = useState<ValidationError>(initialErrors);

    const onChangeHandler = (
        e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { id, value } = e.currentTarget;

        setFormData((prevVals: ChangePasswordData) => ({
            ...prevVals,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/user/changePassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                navigate("/account/changePasswordConfirmation");
            }
            else {
                const result = await response.json()
                setValidationErrors(result.errors);
            }
        } catch (error) {
            console.log(error);
  
        }
    };

    return (
        <>
            <h3>Change password</h3>
            {validationErrors.Error && <span className="text-danger">{validationErrors.Error[0]}</span>}

            <div className="row">
                <div className="col-md-6">
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input id="password" type="password" className="form-control" aria-required="true" placeholder="Please enter your old password." onChange={onChangeHandler} />
                            <label htmlFor="password" className="form-label">Old password</label>
                            {validationErrors.Password && <span className="text-danger">{validationErrors.Password[0]}</span>}
                        </div>
                        <div className="form-floating mb-3">
                            <input id="newPassword" type="password" className="form-control" aria-required="true" placeholder="Please enter your new password." onChange={onChangeHandler} />
                            <label htmlFor="newPassword" className="form-label">New password</label>
                            {validationErrors.NewPassword && <span className="text-danger">{validationErrors.NewPassword[0]}</span>}
                        </div>
                        <div className="form-floating mb-3">
                            <input id="confirmPassword" type="password" className="form-control" aria-required="true" placeholder="Please confirm your new password." onChange={onChangeHandler} />
                            <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                            {validationErrors.ConfirmPassword && <span className="text-danger">{validationErrors.ConfirmPassword[0]}</span>}
                        </div>
                        <button type="submit" className="w-100 btn btn-lg btn-primary">Update password</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;