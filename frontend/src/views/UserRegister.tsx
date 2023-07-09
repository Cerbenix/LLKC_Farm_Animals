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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                />
                {errors.name && <Error>{errors.name}</Error>}
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                />
                {errors.email && <Error>{errors.email}</Error>}
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {errors.password && <Error>{errors.password}</Error>}
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password_confirmation"
                    value={password_confirmation}
                    onChange={handlePasswordConfirmationChange}
                />
            </div>
            <button className="btn btn-primary">Register</button>
        </form>
    );
};

export default UserRegister;
