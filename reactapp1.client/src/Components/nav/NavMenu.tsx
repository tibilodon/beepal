import ProtectedRoute from '../utils/ProtectedRoute';
import './navMenu.css'
import { NavLink, useNavigate } from "react-router-dom"
import { useAppProvider } from "../../Context/AppContext"
import PublicRoute from '../utils/PublicRoute';

function NavMenu() {
    const { checkUser, userDto } = useAppProvider();

    const navigate = useNavigate();
    const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            const response = await fetch("/api/account/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                checkUser();
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="top-row ps-3 navbar navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="">webapi auth</a>
                </div>
            </div>
            <input type="checkbox" title="Navigation menu" className="navbar-toggler" />
            <div className="nav-scrollable">
                <nav className="flex-column">
                    <div className="nav-item px-3">
                        <NavLink to={"/"} className={({ isActive }) => isActive ? "nav-link-main active" : "nav-link-main"}>
                            <span className="bi bi-house-door-fill-nav-menu" aria-hidden="true"></span> Home
                        </NavLink>
                    </div>

                    <ProtectedRoute>
                        <div className="nav-item px-3">
                            <NavLink className={({ isActive }) => isActive ? "nav-link-main active" : "nav-link-main"} to={"Account/Manage"}>
                                <span className="bi bi-person-fill-nav-menu" aria-hidden="true"></span>{userDto.nickName ?? userDto.userName }
                            </NavLink>
                        </div>
                        <div className="nav-item px-3">
                            <form onSubmit={handleLogout}>
                                <button type="submit" className="nav-link-main">
                                    <span className="bi bi-arrow-bar-left-nav-menu" aria-hidden="true"></span> Logout
                                </button>
                            </form>
                        </div>
                    </ProtectedRoute>

                    <PublicRoute>
                        <div className="nav-item px-3">
                            <NavLink to={"/account"} className={({ isActive }) => isActive ? "nav-link-main active" : "nav-link-main"}>
                                <span className="bi bi-person-badge-nav-menu" aria-hidden="true"></span> Login
                            </NavLink>
                        </div>
                    </PublicRoute>
                </nav>
            </div>
        </>

    );
}

export default NavMenu;