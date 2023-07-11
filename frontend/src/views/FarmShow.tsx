import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import AnimalForm from "../components/AnimalForm";

interface Animal {
    id: number;
    animal_number: string;
    type_name: string;
    years: number | null;
    farm_id?: number;
    farm_name?: string;
}

interface Farm {
    name: string;
    email: string;
    website: string;
}

const FarmShow: React.FC = () => {
    const [farm, setFarm] = useState<Farm | null>(null);
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
    const { farmId } = useParams<{ farmId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchFarm();
        fetchAnimals();
    }, []);

    const fetchFarm = async () => {
        try {
            const response = await axios.get(`/api/farms/${farmId}`);
            setFarm(response.data);
        } catch (error) {
            console.error("Failed to fetch farm:", error);
            handleApiError(error);
        }
    };

    const fetchAnimals = async () => {
        try {
            const response = await axios.get(`/api/farms/${farmId}/animals`);
            setAnimals(response.data);
        } catch (error) {
            console.error("Failed to fetch animals:", error);
            handleApiError(error);
        }
    };

    const handleAddAnimal = async (data: Animal) => {
        try {
            await axios.post(`/api/farms/${farmId}/animals`, data);
            fetchAnimals();
        } catch (error) {
            console.error("Failed to add animal:", error);
            handleApiError(error);
        }
    };

    const handleEditAnimal = (animal: Animal) => {
        setSelectedAnimal(animal);
        setEditMode(true);
    };

    const handleUpdateAnimal = async (data: Animal) => {
        try {
            await axios.put(`/api/animals/${data.id}`, data);
            fetchAnimals();
            setEditMode(false);
            setSelectedAnimal(null);
        } catch (error) {
            console.error("Failed to update animal:", error);
            handleApiError(error);
        }
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setSelectedAnimal(null);
    };

    const handleDeleteAnimal = async (id: number) => {
        try {
            await axios.delete(`/api/animals/${id}`);
            fetchAnimals();
        } catch (error) {
            console.error(`Failed to delete animal with ID ${id}:`, error);
            handleApiError(error);
        }
    };

    const handleApiError = (error: any) => {
        if (error.response && error.response.status === 401) {
            navigate("/");
        }
    };

    const animalCount = animals.length;
    const canAddAnimal = animalCount < 3;

    return (
        <div className="container">
            <div className="text-center my-4">
                <h1 className="fw-bold display-6">{farm?.name}</h1>
                <p className="text-lg">
                    <span className="fw-bold">Email:</span> {farm?.email}
                </p>
                <p className="text-lg">
                    <span className="fw-bold">Website:</span> {farm?.website}
                </p>
            </div>

            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Type</th>
                        <th>Number of animals</th>
                        <th>Years</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {animals.map((animal) => (
                        <tr key={animal.id}>
                            <td className="font-medium align-middle">
                                {animal.type_name}
                            </td>
                            <td className="align-middle">
                                {animal.animal_number}
                            </td>
                            <td className="align-middle">{animal.years}</td>
                            <td
                                className="text-center align-middle"
                                style={{ width: "1%" }}
                            >
                                <div className="d-flex justify-content-end align-items-center">
                                    <button
                                        className="btn btn-warning btn-sm mx-2"
                                        onClick={() => handleEditAnimal(animal)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn-close mx-2 bg-red-600"
                                        onClick={() =>
                                            handleDeleteAnimal(animal.id)
                                        }
                                    ></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="my-4 text-center">
                {!canAddAnimal && !editMode && (
                    <div className="alert alert-danger">
                        You have reached the animal limit for this farm.
                    </div>
                )}
                {editMode ? (
                    <div>
                        {selectedAnimal && (
                            <AnimalForm
                                onSubmit={handleUpdateAnimal}
                                initialData={selectedAnimal}
                                isEdit={true}
                                onCancel={handleCancelEdit}
                            />
                        )}
                    </div>
                ) : (
                    canAddAnimal && <AnimalForm onSubmit={handleAddAnimal} />
                )}
            </div>
        </div>
    );
};

export default FarmShow;
