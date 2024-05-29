import styles from "./userProfile.module.css";

import { UserDto, initialUserDto, useAppProvider } from "../../../../Context/AppContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProtectedRoute from "../../../utils/ProtectedRoute";
import ButtonA from "../../../buttons/ButtonA";

type ValidationError = {
    NickName: string,
    UserName: string
}

function UserProfile() {
    const navigate = useNavigate();

    const { checkUser, userDto, showManageUser, setShowManageUser, showUserProfile,setShowUserProfile } = useAppProvider();

    const { userName, email, nickName } = userDto;

    const [formData, setFormData] = useState<UserDto>(initialUserDto);

    const initialErrors = {
        NickName: "",
        UserName: ""
    }

    const [validationErrors, setValidationErrors] = useState<ValidationError>(initialErrors)
    function handlePopUp() {
        setShowManageUser(!showManageUser);
    };


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
                //  refresh page
                navigate(0);
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
        <div className={styles.wrap}>
            <ProtectedRoute>
                {showUserProfile &&
                     <h3>Profile</h3>
            <div className="row">
                <div className="col-md-6">
                    <form method="post" onSubmit={handleSubmit}>
                        <h6 className="pb-2">Username</h6>
                        <div className="form-floating mb-3">
                            <input id="userName" className="form-control" placeholder="Please enter your user name." onChange={onChangeHandler} />
                            <label htmlFor="userName" className="form-label">{formData.userName}</label>
                            {validationErrors.UserName && <span className="text-danger">{validationErrors.UserName[0]}</span>}
                        </div>
                        <h6 className="pb-2">NickName</h6>
                        <div className="form-floating mb-3">
                            <input id="nickName" className="form-control" placeholder="Please enter your user name." onChange={onChangeHandler} />
                            <label htmlFor="nickName" className="form-label">{formData.nickName}</label>
                            {validationErrors.NickName && <span className="text-danger">{validationErrors.NickName[0]}</span>}
                        </div>
                        <button type="submit" className="w-100 btn btn-lg btn-primary">Save</button>
                    </form>
                </div>
            </div>
                }
            </ProtectedRoute>

        </div>
    );
}

export default UserProfile;