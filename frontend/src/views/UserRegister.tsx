import React, { useState } from "react";
import Error from "../components/Error";
import useAuthContext from "../context/AuthContext";

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const UserRegister: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const { register, errors } = useAuthContext();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handlePasswordConfirmationChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPasswordConfirmation(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: RegisterFormData = {
            name,
            email,
            password,
            password_confirmation,
        };
        register(formData);
    };

    return (
        <div className="w-11/12 mx-auto my-8 p-8 border-2 rounded-lg bg-gray-50 md:w-4/6 lg:w-1/3">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={handleNameChange}
                    />
                    {errors.name && <Error>{errors.name}</Error>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input
                        type="email"
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
                <div className="mb-3">
                    <label
                        htmlFor="password_confirmation"
                        className="form-label"
                    >
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        className="form-control"
                        value={password_confirmation}
                        onChange={handlePasswordConfirmationChange}
                    />
                </div>
                <div className="mb-2">
                    <span>Already registered? </span>
                    <a className="font-medium" href="/login">
                        Click here to login
                    </a>
                </div>
                <div>
                    <button className="btn btn-primary">Register</button>
                </div>
            </form>
        </div>
    );
};

export default UserRegister;
