import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppProvider } from "../../../Context/AppContext";


interface ChangeEmailData {
    email: string,
    newEmail: string,
    returnUrl: string
}

type ValidationErrors = {
    Error:string,
    Email: string,
    NewEmail: string
    returnUrl: string
}

function Email() {
    const { userDto } = useAppProvider();

    useEffect(() => {
        if (userDto.email != "") {
            setFormData((prevVals: ChangeEmailData) => ({
                ...prevVals,
              email:userDto.email
            }));
        }
    }, [userDto]);

    const navigate = useNavigate();

    const initialFormData: ChangeEmailData = {
        email: "",
        newEmail: "",
        returnUrl: window.location.href
    };

    const [formData, setFormData] = useState<ChangeEmailData>(initialFormData);

    const initialValidationErrors: ValidationErrors = {
        Error:"",
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
                navigate("/account/emailChangeConfirmation");

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
            <h3>Manage email</h3>
            {validationErrors.Error && <span className="text-danger">{validationErrors.Error[0]}</span>}

            <div className="row">
                <div className="col-md-6">
                    <form method="post" onSubmit={submitHandler}>
                        <div className="form-floating mb-3 input-group">
                            <input id="email" type="email" className="form-control" placeholder="Please enter your email." disabled />

                            <div className="input-group-append">
                                <span className="h-100 input-group-text text-success font-weight-bold">✓</span>
                            </div>
                            <label htmlFor="email" className="form-label">{ formData.email}</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input id="newEmail" className="form-control" aria-required="true" placeholder="Please enter new email." onChange={onChangeHandler} />
                            <label htmlFor="newEmail" className="form-label">New email</label>
                            {validationErrors.Email && <span className="text-danger">{validationErrors.Email[0]}</span>}
                        </div>
                        <button type="submit" className="w-100 btn btn-lg btn-primary">Change email</button>
                    </form>
                </div>
            </div >
        </>
    );
}

export default Email;