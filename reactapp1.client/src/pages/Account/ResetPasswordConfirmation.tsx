import { useNavigate } from "react-router-dom";
import StatusMessage from "../../Components/statusMessage/StatusMessage";
function ResetPasswordConfirmation() {
  const navigate = useNavigate();
  return (
    <>
      <StatusMessage
        buttonLabel="Tovább a főoldalra"
        onClickHandler={() => navigate("/")}
        statusMessage="Jelszó sikeresen módosítva!"
        type="success"
      />
    </>
  );
}

export default ResetPasswordConfirmation;
