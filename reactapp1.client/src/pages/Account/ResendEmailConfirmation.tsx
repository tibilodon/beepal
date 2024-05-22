import { useState } from 'react';
import { useNavigate } from "react-router-dom"

interface ResendEmailConfirmationData {
    email: string,
    returnUrl: string
}
function ResendEmailConfirmation() {
    const navigate = useNavigate();

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
                navigate("/account/registerConfirmation");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <h1>Resend email confirmation</h1>
            <h2>Enter your email.</h2>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    <form method="post" onSubmit={submitHandler}>
                        <div className="form-floating mb-3">
                            <input id="email" type="email" className="form-control" aria-required="true" placeholder="name@example.com" onChange={onChangeHandler} />
                            <label htmlFor="email" className="form-label">Email</label>
                        </div>
                        <button type="submit" className="w-100 btn btn-lg btn-primary">Resend</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResendEmailConfirmation;