import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Link from "../components/Link";
import AnimalForm from "../components/AnimalForm";
import { useNavigate } from "react-router-dom";

interface Animal {
    id: number;
    animal_number: string;
    type_name: string;
    years: number | null;
    farm_id?: number;
    farm_name?: string;
}

interface AnimalsResponse {
    data: Animal[];
    current_page: number;
    last_page: number;
}

const AnimalsIndex: React.FC = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [editingAnimalId, setEditingAnimalId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAnimals();
    }, [currentPage]);

    const fetchAnimals = async () => {
        try {
            const response = await axios.get<AnimalsResponse>("/api/animals", {
                params: {
                    page: currentPage,
                },
            });
            const animalsData = response.data.data;

            const animalsWithFarmNames = await Promise.all(
                animalsData.map(async (animal) => {
                    const farmResponse = await axios.get(
                        `/api/farms/${animal.farm_id}`
                    );
                    const farmName = farmResponse.data.name;
                    return { ...animal, farm_name: farmName };
                })
            );

            setAnimals(animalsWithFarmNames);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error("Failed to fetch animals:", error);
            handleApiError(error);
        }
    };

    const handleEditAnimal = (id: number) => {
        setEditingAnimalId(id);
    };

    const handleCancelEdit = () => {
        setEditingAnimalId(null);
    };

    const handleUpdateAnimal = async (data: Animal) => {
        try {
            await axios.put(`/api/animals/${data.id}`, data);
            setEditingAnimalId(null);
            fetchAnimals();
        } catch (error) {
            console.error(`Failed to update animal with ID ${data.id}:`, error);
            handleApiError(error);
        }
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

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < lastPage) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handleApiError = (error: any) => {
        if (error.response && error.response.status === 401) {
            navigate("/");
        }
    };

    return (
        <div className="container">
            <div className="text-center my-4">
                <h1 className="fw-bold display-4">My Animals</h1>
            </div>

            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Type</th>
                        <th>Number of animals</th>

                        <th>Years</th>
                        <th>Farm</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {animals.map((animal) => (
                        <tr key={animal.id}>
                            <td className="font-medium align-middle">{animal.type_name}</td>
                            <td className="align-middle">
                                {animal.animal_number}
                            </td>
                            <td className="align-middle">{animal.years}</td>
                            <td className="align-middle">
                                <Link href={`/farms/${animal.farm_id}`}>
                                    {animal.farm_name}
                                </Link>
                            </td>
                            <td
                                className="text-center align-middle"
                                style={{ width: "1%" }}
                            >
                                <div className="d-flex justify-content-end align-items-center">
                                    <button
                                        className="btn btn-warning btn-sm mx-2"
                                        onClick={() =>
                                            handleEditAnimal(animal.id)
                                        }
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
            <div className="d-flex justify-content-center align-items-center mt-3">
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li
                            className={`page-item ${
                                currentPage === 1 ? "disabled" : ""
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                aria-label="Previous"
                            >
                                <span aria-hidden="true">&laquo;</span>
                                <span className="visually-hidden">
                                    Previous
                                </span>
                            </button>
                        </li>
                        <li className="page-item" aria-current="page">
                            <span className="page-link">{currentPage}</span>
                        </li>
                        <li
                            className={`page-item ${
                                currentPage === lastPage ? "disabled" : ""
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={handleNextPage}
                                disabled={currentPage === lastPage}
                                aria-label="Next"
                            >
                                <span aria-hidden="true">&raquo;</span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {editingAnimalId && (
                <div className="my-4">
                    <AnimalForm
                        onSubmit={handleUpdateAnimal}
                        onCancel={handleCancelEdit}
                        isEdit={true}
                        initialData={animals.find(
                            (animal) => animal.id === editingAnimalId
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default AnimalsIndex;
