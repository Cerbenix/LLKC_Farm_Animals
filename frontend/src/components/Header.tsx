import React from "react";
import Link from "./Link";
import useAuthContext from "../context/AuthContext";

const Header: React.FC = () => {
    const { user, logout } = useAuthContext();

    return (
        <header className="flex flex-col justify-between items-baseline mx-10 my-2 border-b-2 sm:flex-row sm:items-center">
            <a className="text-6xl font-extralight" href="/">
                LLKC Farm Animals
            </a>
            <nav className="flex flex-col sm:flex-row">
                {user ? (
                    <div className="flex flex-col sm:flex-row sm:mt-5">
                        <Link href="/farms">My Farms</Link>
                        <Link href="/animals">My Animals</Link>
                        <button
                            className="hover:text-red-500 font-bold mr-5"
                            onClick={logout}
                        >
                            {" "}
                            Logout{" "}
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col sm:flex-row">
                        <Link href="/login">Login/Register</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
