import { useEffect, useState } from 'react';


function ConfirmEmail() {

    const [statusMessage, setStatusMessage] = useState()
    useEffect(() => {
        populateData();
    });
    return (
        <>

            {statusMessage && <h1>{statusMessage}</h1>}
        </>
    );
    async function populateData() {
        const urlParams = new URLSearchParams(window.location.search);
        const codeParam = urlParams.get('code');
        const userId = urlParams.get('userId');

        try {
            const response = await fetch("/api/account/confirmEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code: codeParam, userId }),
            });
            if (response.ok) {
                const responseData = await response.json()
                setStatusMessage(responseData.statusMessage)
       
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default ConfirmEmail;