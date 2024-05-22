import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import Test from "./pages/Test";
import Login from "./pages/Account/Login";
import Register from "./pages/Account/Register";
import ManageLayout from "./Layouts/ManageLayout";
import Profile from "./pages/Account/Manage/Profile";
import Email from "./pages/Account/Manage/Email";
import ChangePassword from "./pages/Account/Manage/ChangePassword";
import PersonalData from "./pages/Account/Manage/PersonalData";
import RegisterConfirmation from "./pages/Account/RegisterConfirmation";
import ConfirmEmail from "./pages/Account/ConfirmEmail";
import ForgotPassword from "./pages/Account/ForgotPassword";
import ForgotPasswordConfirmation from "./pages/Account/ForgotPasswordConfirmation";
import ResetPassword from "./pages/Account/ResetPassword";
import ResetPasswordConfirmation from "./pages/Account/ResetPasswordConfirmation";
import ResendEmailConfirmation from "./pages/Account/ResendEmailConfirmation";
import EmailChangeConfirmation from "./pages/Account/Manage/EmailChangeConfirmation";
import ConfirmEmailChange from "./pages/Account/Manage/ConfirmEmailChange";
import ChangePasswordConfirmation from "./pages/Account/Manage/ChangePasswordConfirmation";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
        <Route index element={<Test />} />

        <Route path="account" element={<Login />} />

        <Route path="account/register" element={<Register />} />
        <Route path="account/registerConfirmation" element={<RegisterConfirmation />} />
        <Route path="account/confirmEmail" element={<ConfirmEmail />} />
        <Route path="account/resendEmailConfirmation" element={<ResendEmailConfirmation />} />

        <Route path="account/forgotPassword" element={<ForgotPassword />} />
        <Route path="account/resetPassword" element={<ResetPassword />} />
        <Route path="account/resetPasswordConfirmation" element={<ResetPasswordConfirmation />} />
        <Route path="account/forgotPasswordConfirmation" element={<ForgotPasswordConfirmation />} />

        <Route path="account/emailChangeConfirmation" element={<EmailChangeConfirmation />} />
        <Route path="account/confirmEmailChange" element={<ConfirmEmailChange />} />

        <Route path="account/changePasswordConfirmation" element={<ChangePasswordConfirmation />} />


        <Route path="account/manage" element={<ManageLayout />}>
            <Route index element={<Profile />} />
            <Route path="email" element={<Email />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="personalData" element={<PersonalData />} />

        </Route>
    </Route>
))

function App() {

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App;