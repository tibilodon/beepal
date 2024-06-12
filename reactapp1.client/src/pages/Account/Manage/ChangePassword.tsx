import styles from "./manage.module.css";
import { useState } from "react";
import SuccessNotification from "../../../Components/notification/SuccessNotification";
import Input from "../../../Components/form/input/Input";
import ButtonA from "../../../Components/buttons/ButtonA";
// import { useAppProvider } from "../../../Context/AppContext";
// import { useNavigate } from "react-router-dom";

type ValidationError = {
  Error: string;
  Password: string;
  NewPassword: string;
  ConfirmPassword: string;
};

type ChangePasswordData = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

function ChangePassword() {
  // const navigate = useNavigate();
  // const { checkUser } = useAppProvider();

  const [notification, setNotification] = useState<boolean>(false);

  const initialFormData = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState<ChangePasswordData>(initialFormData);

  const initialErrors = {
    Error: "",
    Password: "",
    NewPassword: "",
    ConfirmPassword: "",
  };

  const [validationErrors, setValidationErrors] =
    useState<ValidationError>(initialErrors);

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
        //navigate("/account/changePasswordConfirmation");
        // await checkUser();
        // navigate(0);
        setNotification(true);
        setFormData(initialFormData);
      } else {
        const result = await response.json();
        setValidationErrors(result.errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header>
        <h3 className={styles.pageHeader}>Jelszó</h3>
      </header>
      <SuccessNotification show={notification} />
      {validationErrors.Error && (
        <span className="danger">{validationErrors.Error[0]}</span>
      )}

      <div className={styles.wrap}>
        <form method="post" onSubmit={handleSubmit}>
          <div className={styles.inputs}>
            <span className={styles.inputWrap}>
              <h6 className="">Jelenlegi jelszó</h6>
              <Input
                type="password"
                value={formData.password}
                id="password"
                onChangeHandler={onChangeHandler}
                placeholder="Jelenlegi jelszó"
              />

              {validationErrors.Password && (
                <span className="danger">{validationErrors.Password[0]}</span>
              )}
            </span>

            <span className={styles.inputWrap}>
              <h6 className="">Új jelszó</h6>
              <Input
                type="password"
                value={formData.newPassword}
                id="newPassword"
                onChangeHandler={onChangeHandler}
                placeholder="Új jelszó"
              />
              {validationErrors.NewPassword && (
                <span className="danger">
                  {validationErrors.NewPassword[0]}
                </span>
              )}
            </span>
            <span className={styles.inputWrap}>
              <h6 className="">Új jelszó megerősítése</h6>
              <Input
                type="password"
                value={formData.confirmPassword}
                id="confirmPassword"
                onChangeHandler={onChangeHandler}
                placeholder="Új jelszó megerősítése"
              />
              {validationErrors.ConfirmPassword && (
                <span className="danger">
                  {validationErrors.ConfirmPassword[0]}
                </span>
              )}
            </span>
          </div>
          <ButtonA
            label="Mentés"
            disabled={
              !formData.password ||
              !formData.newPassword ||
              !formData.confirmPassword
            }
            type="submit"
          />
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
