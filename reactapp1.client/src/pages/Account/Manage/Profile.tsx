import styles from "./manage.module.css";
import { UserDto, initialUserDto, useAppProvider } from "../../../Context/AppContext";
import { useEffect, useState } from "react";
import Input from "../../../Components/form/input/Input";
import ButtonA from "../../../Components/buttons/ButtonA";
import SuccessNotification from "../../../Components/notification/SuccessNotification";

type ValidationError = {
    Error:string
    NickName: string,
    UserName: string
}

function Profile() {
    const { userDto,checkUser } = useAppProvider();
    const [formData, setFormData] = useState<UserDto>(initialUserDto);

    const initialErrors = {
        Error:"",
        NickName: "",
        UserName: ""
    }
    const [validationErrors, setValidationErrors] = useState<ValidationError>(initialErrors)
    const [notification, setNotification] = useState<boolean>(false);


    const onChangeHandler = (
        e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { id, value } = e.currentTarget;
        setFormData((prevVals: UserDto) => ({
            ...prevVals,
            [id]: value,
        }));
    };
 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                //  fetch edited data, reset states, display success message
                await checkUser();
                setNotification(true);
                setFormData(userDto);
            }
            else {
                const result = await response.json();
                console.log(result.errors);
                setValidationErrors(result.errors);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (userDto.email != "") {
            setFormData(userDto);
        }
    }, [userDto]);

    return (
        <>
            <header>
                <h3 className={ styles.pageHeader}>Profilom</h3>
            </header>
            <SuccessNotification show={notification} />
            {validationErrors.Error && <span className="danger">{validationErrors.Error[0]}</span>}

            <div className={styles.wrap}>

                <form method="post" onSubmit={handleSubmit}>
                    <div className={styles.inputs}>
                        <span className={styles.inputWrap}>
                    <h6 className="">Felhasználónév</h6>
                        <Input type="text" value={formData.userName} id="userName" onChangeHandler={onChangeHandler} placeholder="Felhasználónév" />

                        {validationErrors.UserName && <span className="danger">{validationErrors.UserName[0]}</span>}
                        </span>

                        <span className={styles.inputWrap}>
                        <h6 className="">Becenév</h6>
                        <Input type="text" value={formData.nickName} id="nickName" onChangeHandler={onChangeHandler} placeholder="Becenév" />
                        {validationErrors.NickName && <span className="danger">{validationErrors.NickName[0]}</span>}
                        </span>
                    </div>
                    <ButtonA label="Mentés" disabled={formData === userDto && true} type="submit" />
                </form>

            </div>
        </>
    );
}

export default Profile;