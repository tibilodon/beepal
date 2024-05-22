import "./rootLayout.css";

import { Outlet } from "react-router-dom";
import NavMenu from "../Components/nav/NavMenu";

function RootLayout() {
    return (
        <div className="page">
            <div className="sidebar">
                <NavMenu />
            </div>

            <main className="h-100">
                <div className="top-row">
                    <a href="https://learn.microsoft.com/aspnet/core/" target="_blank">About</a>
                </div>
                <article className="content">
                    <Outlet />
                </article>
            </main>
        </div>
  );
}

export default RootLayout;