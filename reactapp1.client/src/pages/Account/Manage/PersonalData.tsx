import styles from "./manage.module.css";
import { useNavigate } from "react-router-dom";
import { useAppProvider } from "../../../Context/AppContext";
import { useState } from "react";
import ButtonA from "../../../Components/buttons/ButtonA";
import AlertNotification from "../../../Components/notification/AlertNotification";

type ValidationErrors = {
  Errors: string;
};
function PersonalData() {
  const navigate = useNavigate();
  const { userDto, checkUser, resetShowStates } = useAppProvider();

  const initialValidationErrors: ValidationErrors = {
    Errors: "",
  };
  const [validationErrors, setValidationErrors] = useState(
    initialValidationErrors
  );
  //const [isIntentionalDelete, setIsIntentionalDelete] = useState(false);

  //useEffect(() => {
  //    isIntentionalDelete && handleDelete()
  //}, [isIntentionalDelete])

  const handleDelete = async (): // e: React.MouseEvent<HTMLButtonElement>
  Promise<void> => {
    // e.preventDefault();
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
        await checkUser();
        resetShowStates();
        navigate("/");
      } else {
        setValidationErrors(result.errors);
        console.log(result.errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch("/api/user/downloadPersonalData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (!response.ok) {
        setValidationErrors(result.errors);
      }
      const fileData = atob(result.file.fileContents);
      const parseJson = JSON.parse(fileData);
      const jsonString = JSON.stringify(parseJson, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "PersonalData.json";
      //  Append anchor to body.
      document.body.appendChild(a);
      //  trigger download.
      a.click();
      //  remove anchor from body.
      document.body.removeChild(a);
      //  clean up the object URL.
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching and downloading data:", error);
    }
  };

  const [showAlert, setShowAlert] = useState<boolean>(false);

  return (
    <>
      {setShowAlert && (
        <AlertNotification
          show={showAlert}
          setShow={setShowAlert}
          onClick={handleDelete}
        />
      )}
      <header>
        <h3 className={styles.pageHeader}>Személyes adatok</h3>
        <h4 className={styles.pageHeader}>
          A profilod azokat az adatokat tartalmazza, amelyeket a részünkre
          bocsájtottál.
          <br />
          <br />
          Ezen az oldalon letöltheted vagy törölheted az adataid, illetve a
          profilod.
        </h4>
      </header>
      {validationErrors.Errors && (
        <span className="danger">{validationErrors.Errors[0]}</span>
      )}
      <div className={styles.wrap}>
        <ButtonA
          label="Letöltés"
          type="button"
          onClick={handleDownload}
          color="success"
        />
        <br />
        <br />
        <ButtonA
          label="Profilom törlése"
          type="button"
          onClick={() => setShowAlert(true)}
          color="danger"
        />
      </div>
    </>
  );
}

export default PersonalData;
