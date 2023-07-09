import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Link from "../components/Link";

interface Farm {
    id: number;
    name: string;
    email: string | null;
    website: string | null;
}

interface FarmsResponse {
    data: Farm[];
    current_page: number;
    last_page: number;
}

const FarmsIndex: React.FC = () => {
    const [farms, setFarms] = useState<Farm[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFarms();
    }, [currentPage]);

    const fetchFarms = async () => {
        try {
            const response = await axios.get<FarmsResponse>("/api/farms", {
                params: {
                    page: currentPage,
                },
            });
            setFarms(response.data.data);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error("Failed to fetch farms:", error);
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

    const handleEditFarm = (id: number) => {
        navigate(`/farms/${id}/edit`);
    };

    const handleDeleteFarm = async (id: number) => {
        try {
            await axios.delete(`/api/farms/${id}`);
            fetchFarms();
        } catch (error) {
            console.error(`Failed to delete farm with ID ${id}:`, error);
        }
    };

    return (
        <div className="container">
            <div className="text-center my-4">
                <h1 className="fw-bold display-4">Farms</h1>
            </div>

            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {farms.map((farm) => (
                        <tr key={farm.id}>
                            <td className="font-medium align-middle">
                                <Link href={`/farms/${farm.id}`}>
                                    {farm.name}
                                </Link>
                            </td>
                            <td className="align-middle">{farm.email}</td>
                            <td className="align-middle">{farm.website}</td>
                            <td
                                className="text-center align-middle"
                                style={{ width: "1%" }}
                            >
                                <div className="d-flex justify-content-end align-items-center">
                                    <button
                                        className="btn btn-warning btn-sm mx-2"
                                        onClick={() => handleEditFarm(farm.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn-close btn-danger mx-2 bg-red-600"
                                        onClick={() =>
                                            handleDeleteFarm(farm.id)
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
        </div>
    );
};

export default FarmsIndex;
