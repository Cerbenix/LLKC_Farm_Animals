import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

interface FarmCreateForm {
    name: string;
    email: string;
    website: string;
}

const FarmCreate: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FarmCreateForm>({
        name: "",
        email: "",
        website: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        try {
            await axios.post("/api/farms", formData);
            navigate("/farms");
        } catch (error) {
            console.error("Failed to create farm:", error);
        }
    };

    return (
        <div className="container">
            <div className="text-center my-4">
                <h1 className="fw-bold display-4">Create Farm</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="website" className="form-label">
                        Website:
                    </label>
                    <input
                        type="text"
                        id="website"
                        name="website"
                        className="form-control"
                        value={formData.website}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FarmCreate;
