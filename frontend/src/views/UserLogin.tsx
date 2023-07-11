import React, { useState } from "react";
import Error from "../components/Error";
import useAuthContext from "../context/AuthContext";

interface LoginFormData {
    email: string;
    password: string;
}

const UserLogin: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, errors } = useAuthContext();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: LoginFormData = { email, password };
        login(formData);
    };

    return (
        <div className="w-11/12 mx-auto my-8 p-8 border-2 rounded-lg bg-gray-50 md:w-4/6 lg:w-1/3">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input
                        type="text"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {errors.email && <Error>{errors.email}</Error>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {errors.password && <Error>{errors.password}</Error>}
                </div>
                <div className="mb-2">
                    <span>Don't have an account? </span>
                    <a className="font-medium" href="/register">
                        Click here to register
                    </a>
                </div>
                <div>
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
};

export default UserLogin;
