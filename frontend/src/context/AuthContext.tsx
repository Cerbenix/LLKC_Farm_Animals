import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface Errors {
    [key: string]: string;
}

interface User {
    [key: string]: string;
}

interface AuthContextType {
    user: User | null;
    errors: Errors;
    login: (data: LoginFormData) => Promise<void>;
    register: (data: RegisterFormData) => Promise<void>;
    getUser: () => Promise<void>;
    logout: () => void;
}

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

interface LoginFormData {
    email: string;
    password: string;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    errors: {},
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    getUser: () => Promise.resolve(),
    logout: () => Promise.resolve(),
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const getUser = async () => {
        try {
            const { data } = await axios.get("api/user");
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (data: LoginFormData) => {
        setErrors({});
        await csrf();
        if (validateLogin(data)) {
            try {
                await axios.post("/login", data);
                await getUser();
                navigate("/");
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response && error.response.status === 422) {
                        setErrors(error.response.data.errors);
                    } else {
                        setErrors({ email: "Something went wrong" });
                    }
                }
            }
        }
    };

    const validateLogin = (data: LoginFormData) => {
        setErrors({});

        const errors: Errors = {};

        if (!data.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
            errors.email = "Email is invalid";
        }

        if (!data.password.trim()) {
            errors.password = "Password is required";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const register = async (data: RegisterFormData) => {
        setErrors({});
        await csrf();
        if (validateRegister(data)) {
            try {
                await axios.post("/register", data);
                await getUser();
                navigate("/");
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response && error.response.status === 422) {
                        setErrors(error.response.data.errors);
                    } else {
                        setErrors({ email: "Something went wrong" });
                    }
                }
            }
        }
    };

    const validateRegister = (data: RegisterFormData) => {
        setErrors({});

        const errors: Errors = {};

        if (!data.name.trim()) {
            errors.name = "Name is required";
        }

        if (!data.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
            errors.email = "Email is invalid";
        }

        if (!data.password.trim()) {
            errors.password = "Password is required";
        } else if (data.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
        } else if (data.password != data.password_confirmation) {
            errors.password = "Passwords do not match";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const logout = () => {
        axios.post("/logout").then(() => {
            setUser(null);
        });
    };

    return (
        <AuthContext.Provider
            value={{ user, errors, getUser, login, register, logout }}
        >
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export default function useAuthContext(): AuthContextType {
    return useContext(AuthContext);
}
