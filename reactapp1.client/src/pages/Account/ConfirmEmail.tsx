import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusMessage from "../../Components/statusMessage/StatusMessage";

function ConfirmEmail() {
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState("");
  useEffect(() => {
    populateData();
  });
  return (
    <>
      {/* {statusMessage && <h1>{statusMessage}</h1>} */}
      {statusMessage && (
        <StatusMessage
          buttonLabel="Tovább a főoldalra"
          type="success"
          statusMessage={statusMessage}
          onClickHandler={() => navigate("/")}
        />
      )}
    </>
  );
  async function populateData() {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");
    const userId = urlParams.get("userId");

    try {
      const response = await fetch("/api/account/confirmEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: codeParam, userId }),
      });
      if (response.ok) {
        // const responseData = await response.json();
        setStatusMessage("E-mail cím megerősítve. Sikeres regisztráció!");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default ConfirmEmail;
