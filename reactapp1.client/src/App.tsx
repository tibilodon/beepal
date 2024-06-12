import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./Layouts/root/RootLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Account/public/Login";
import Register from "./pages/Account/public/Register";
import ManageLayout from "./Layouts/manage/ManageLayout";
import Profile from "./pages/Account/Manage/Profile";
import Email from "./pages/Account/Manage/Email";
import ChangePassword from "./pages/Account/Manage/ChangePassword";
import PersonalData from "./pages/Account/Manage/PersonalData";
import ConfirmEmail from "./pages/Account/ConfirmEmail";
import ForgotPassword from "./pages/Account/public/ForgotPassword";
import ForgotPasswordConfirmation from "./pages/Account/ForgotPasswordConfirmation";
import ResetPassword from "./pages/Account/ResetPassword";
import ResetPasswordConfirmation from "./pages/Account/ResetPasswordConfirmation";
import ConfirmEmailChange from "./pages/Account/Manage/ConfirmEmailChange";

//  cart
import Cart from "./pages/Cart/Cart";
import AdminHome from "./pages/Admin/AdminHome";
import AdminEdit from "./pages/Admin/AdminEdit";
import { GetRootLayoutData } from "./Helpers/dataAccessors/useLoaderDataFetcher";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="account/confirmEmailChange"
        element={<ConfirmEmailChange />}
      />
      {/* <Route path="/admin" element={<AdminHome />}>
        <Route path="admin/edit/:id" element={<AdminEdit />} />
      </Route> */}

      <Route path="/" element={<RootLayout />} loader={GetRootLayoutData}>
        <Route
          index
          element={
            <>
              <Home />
              <Login />
            </>
          }
        />

        <Route path="account" element={<Login />} />

        <Route path="account/register" element={<Register />} />

        <Route
          path="account/confirmEmail"
          element={
            <>
              <ConfirmEmail />
              <Login />
            </>
          }
        />
        {/* <Route
          path="account/resendEmailConfirmation"
          element={<ResendEmailConfirmation />}
        /> */}

        <Route path="account/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="account/resetPassword"
          element={
            <>
              <Login />
              <ResetPassword />
            </>
          }
        />
        <Route
          path="account/resetPasswordConfirmation"
          element={<ResetPasswordConfirmation />}
        />
        <Route
          path="account/forgotPasswordConfirmation"
          element={<ForgotPasswordConfirmation />}
        />

        <Route path="account/manage" element={<ManageLayout />}>
          <Route index element={<Profile />} />
          <Route path="email" element={<Email />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route path="personalData" element={<PersonalData />} />
        </Route>

        <Route path="/cart" element={<Cart />} />
      </Route>

      <Route path="/admin" element={<AdminHome />} />

      <Route path="/admin/edit/:id" element={<AdminEdit />} />
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
