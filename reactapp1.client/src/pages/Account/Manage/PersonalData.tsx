import { useNavigate } from "react-router-dom";
import { useAppProvider } from "../../../Context/AppContext";
import { useState } from "react";

type ValidationErrors = {
    Errors: string
}
function PersonalData() {
    const navigate = useNavigate();
    const { userDto, checkUser } = useAppProvider();

    const initialValidationErrors: ValidationErrors = {
        Errors: "",
    }
    const [validationErrors, setValidationErrors] = useState(initialValidationErrors)

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        try {
            const response = await fetch("/api/user/deletePersonalData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: userDto.id }),
            });
            const result = await response.json();
            if (response.ok) {
                checkUser();
                navigate("/");

            } else {
                setValidationErrors(result.errors)
                console.log(result.errors);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDownload = async () => {
        try {
            const response = await fetch('/api/user/downloadPersonalData', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            if (!response.ok) {
              setValidationErrors(result.errors)
            }
            const fileData = atob(result.file.fileContents);
            const parseJson = JSON.parse(fileData);
            const jsonString = JSON.stringify(parseJson, null, 2)
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'PersonalData.json';
            //  Append anchor to body.
            document.body.appendChild(a);
            //  trigger download.
            a.click();
            //  remove anchor from body.
            document.body.removeChild(a);
            //  clean up the object URL.
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error fetching and downloading data:', error);
        }
    }

    return (
        <>
            <h3>Personal Data</h3>
            {validationErrors.Errors && <span className="text-danger">{validationErrors.Errors[0]}</span>}
            <div className="row">
                <div className="col-md-6">
                    <p>Your account contains personal data that you have given us. This page allows you to download or delete that data.</p>
                    <p>
                        <strong>Deleting this data will permanently remove your account, and this cannot be recovered.</strong>
                    </p>
                    <button className="btn btn-primary" type="button" onClick={handleDownload}>Download</button>
                    <p className="pt-3">
                        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                    </p>
                </div>
            </div>
        </>
    );
}

export default PersonalData;