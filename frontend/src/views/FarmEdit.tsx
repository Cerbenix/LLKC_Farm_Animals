import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

interface Farm {
    id: number;
    name: string;
    email: string | null;
    website: string | null;
}

const FarmEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [farm, setFarm] = useState<Farm>({
        id: 0,
        name: "",
        email: null,
        website: null,
    });

    useEffect(() => {
        fetchFarm();
    }, []);

    const fetchFarm = async () => {
        try {
            const response = await axios.get(`/api/farms/${id}`);
            setFarm(response.data);
        } catch (error) {
            console.error("Failed to fetch farm:", error);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setFarm((prevFarm) => ({
            ...prevFarm,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        try {
            await axios.put(`/api/farms/${id}`, farm);
            navigate("/farms");
        } catch (error) {
            console.error("Failed to update farm:", error);
        }
    };

    return (
        <div className="container">
            <div className="text-center my-4">
                <h1 className="fw-bold display-4">Edit Farm</h1>
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
                        value={farm.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className="form-control"
                        value={farm.email || ""}
                        onChange={handleInputChange}
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
                        value={farm.website || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FarmEdit;
