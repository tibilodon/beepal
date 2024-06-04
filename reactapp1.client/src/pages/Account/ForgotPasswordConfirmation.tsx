import StatusMessage from "../../Components/statusMessage/StatusMessage";
import { useNavigate } from "react-router-dom";

function ForgotPasswordConfirmation() {
  const navigate = useNavigate();
  return (
    <>
      {/* <p>
                Please check your email to reset your password.
            </p> */}
      <StatusMessage
        buttonLabel="Tovább a főoldalra"
        type="success"
        statusMessage="Jelszó helyreállító e-mail megküldve. Kérlek ellenőrizd e-mail fiókod."
        onClickHandler={() => navigate("/")}
      />
    </>
  );
}

export default ForgotPasswordConfirmation;
