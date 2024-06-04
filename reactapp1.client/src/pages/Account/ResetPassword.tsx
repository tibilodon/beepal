import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Account/public/accountPublic.module.css";
import Input from "../../Components/form/input/Input";
import ButtonA from "../../Components/buttons/ButtonA";
interface ResetPasswordData {
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
}

type ValidationError = {
  Email: string;
  Password: string;
  ConfirmPassword: string;
  Code: string;
};

function ResetPassword() {
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const initialFormData: ResetPasswordData = {
    email: "",
    password: "",
    confirmPassword: "",
    code: urlParams.get("code")!,
  };

  const [formData, setFormData] = useState<ResetPasswordData>(initialFormData);

  const initialErrors = {
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Code: "",
  };

  const [validationErrors, setValidationErrors] =
    useState<ValidationError>(initialErrors);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/account/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/account/resetpasswordConfirmation");
      } else {
        const result = await response.json();
        setValidationErrors(result.errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { id, value } = e.currentTarget;
    if (id === "newPassword") {
      setFormData((prevVals: ResetPasswordData) => ({
        ...prevVals,
        password: value,
      }));
    }
    if (id === "newPasswordEmail") {
      setFormData((prevVals: ResetPasswordData) => ({
        ...prevVals,
        email: value,
      }));
    }

    setFormData((prevVals: ResetPasswordData) => ({
      ...prevVals,
      [id]: value,
    }));
  };

  return (
    <>
      {/* <h1>Reset password</h1>
            <h2>Reset your password.</h2>
        <hr /> */}
      <div className={`${styles.wrap} ${styles.notLogin}`}>
        <section className={styles.heroSection}>
          <h1>Új jelszó </h1>
          {validationErrors.Code && (
            <span className="text-danger">{validationErrors.Code[0]}</span>
          )}
          <form method="post" onSubmit={submitHandler}>
            <div className={styles.content}>
              <div className={styles.inputs}>
                <Input
                  value={formData.email}
                  id="newPasswordEmail"
                  placeholder="e-mail"
                  type="email"
                  onChangeHandler={onChangeHandler}
                />

                {validationErrors.Email && (
                  <span className="danger">{validationErrors.Email[0]}</span>
                )}

                <Input
                  value={formData.password}
                  id="newPassword"
                  placeholder="új jelszó"
                  type="password"
                  onChangeHandler={onChangeHandler}
                />
                {validationErrors.Password && (
                  <span className="danger">{validationErrors.Password[0]}</span>
                )}

                <Input
                  value={formData.confirmPassword}
                  id="confirmPassword"
                  placeholder="új jelszó megerősítése"
                  type="password"
                  onChangeHandler={onChangeHandler}
                />
                {validationErrors.ConfirmPassword && (
                  <span className="danger">
                    {validationErrors.ConfirmPassword[0]}
                  </span>
                )}
              </div>

              <ButtonA
                type="submit"
                label="Tovább"
                color="success"
                disabled={
                  !formData.email ||
                  !formData.password ||
                  !formData.confirmPassword ||
                  formData.password !== formData.confirmPassword
                }
              />
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default ResetPassword;
