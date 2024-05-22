import { useEffect, useState } from "react"

type ValidationError = {
    Error: string,
    Email: string,
    Code: string,
    UserId: string
}
function ConfirmEmailChange() {
    const [statusMessage, setStatusMessage] = useState()

    // receives data in params, Post request to server, which in turn sends out link to confirm new email address
    useEffect(() => {
        populateData()
    });

    const initialErrors: ValidationError = {
        Error: "",
        Email: "",
        Code: "",
        UserId: ""
    }
    const [validationErrors, setValidationErrors] = useState<ValidationError>(initialErrors)


    async function populateData() {
        const urlParams = new URLSearchParams(window.location.search);
        const data = {
            Email: urlParams.get("email"),
            UserId: urlParams.get("userId"),
            Code: urlParams.get("code"),
            ReturnUrl: window.location.href
        };


        try {
            const response = await fetch("/api/user/confirmEmailChange", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const result = await response.json()
                setStatusMessage(result.statusMessage)
                if (result.errors) {
                    setValidationErrors(result.errors);
                }

            }
        } catch (error) {
            console.log(error);
        }
    }


    const nonEmptyErrors = Object.keys(validationErrors).filter(
        key => validationErrors[key as keyof ValidationError] !== ""
    ) as (keyof ValidationError)[];


    return (
        <>
            {nonEmptyErrors.length > 0 ? (
                <div>
                    {nonEmptyErrors.map((key) => {
                        return (
                            <span key={key} className="text-danger">{validationErrors[key]}</span>
                        )
                    })}
                </div>
            ) :
                <h1>{statusMessage}</h1>

            }
        </>
    );
}

export default ConfirmEmailChange;