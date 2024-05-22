import { Link } from "react-router-dom"
function ResetPasswordConfirmation() {
    return (
        <>
            <p>
                Your password has been reset. Please <Link to={"/account"}>click here to log in</Link>.
            </p>
        </>
    );
}

export default ResetPasswordConfirmation;