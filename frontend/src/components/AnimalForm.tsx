import React, { useEffect, useState } from "react";
import Error from "../components/Error";

interface Animal {
    id: number;
    animal_number: string;
    type_name: string;
    years: number | null;
    farm_id?: number;
    farm_name?: string;
}

interface Errors {
    [key: string]: string;
}

interface AnimalFormProps {
    onSubmit: (data: Animal) => Promise<void>;
    initialData?: Animal;
    isEdit?: boolean;
    onCancel?: () => void;
}

const AnimalForm: React.FC<AnimalFormProps> = ({
    onSubmit,
    initialData,
    isEdit = false,
    onCancel,
}) => {
    const [formData, setFormData] = useState<Animal>(
        initialData || {
            id: 0,
            animal_number: "",
            type_name: "",
            years: null,
        }
    );

    useEffect(() => {
        if (initialData) {
          setFormData(initialData);
        } else {
          setFormData({
            id: 0,
            animal_number: "",
            type_name: "",
            years: null,
          });
        }
      }, [initialData]);

    const [errors, setErrors] = useState<Errors>({});

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
        const isValid = validateForm();
        if (isValid) {
            try {
                await onSubmit(formData);
                setFormData({
                    id: 0,
                    animal_number: "",
                    type_name: "",
                    years: null,
                });
            } catch (error) {
                console.error("Failed to submit form:", error);
            }
        }
    };

    const validateForm = (): boolean => {
        setErrors({});

        const errors: Errors = {};

        if (!formData.animal_number) {
            errors.animal_number = "Animal number is required";
        } else if (
            isNaN(Number(formData.animal_number)) ||
            Number(formData.animal_number) == 0
        ) {
            errors.animal_number = "Animal number must be a valid number";
        }

        if (!formData.type_name.trim()) {
            errors.type_name = "Type is required";
        }

        if (formData.years && isNaN(formData.years)) {
            errors.years = "Years must be a valid number";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col text-xl p-4 border-2 rounded-lg bg-gray-50 md:flex-row"
        >
            <div className="container">
                <div className="container flex flex-row items-center">
                    <label
                        htmlFor="type_name"
                        className="whitespace-nowrap mr-3"
                    >
                        Type:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="type_name"
                        name="type_name"
                        value={formData.type_name}
                        onChange={handleInputChange}
                    />
                </div>
                {errors.type_name && <Error>{errors.type_name}</Error>}
            </div>

            <div className="container">
                <div className="container flex flex-row items-center">
                    <label
                        htmlFor="animal_number"
                        className="whitespace-nowrap mr-3"
                    >
                        Animal number:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="animal_number"
                        name="animal_number"
                        value={formData.animal_number}
                        onChange={handleInputChange}
                    />
                </div>
                {errors.animal_number && <Error>{errors.animal_number}</Error>}
            </div>

            <div className="container">
                <div className="container flex flex-row items-center">
                    <label htmlFor="years" className="whitespace-nowrap mr-3">
                        Years:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="years"
                        name="years"
                        value={formData.years || ""}
                        onChange={handleInputChange}
                    />
                </div>
                {errors.years && <Error>{errors.years}</Error>}
            </div>

            <div className="flex flex-row items-start">
                <button className="btn btn-primary whitespace-nowrap">
                    {isEdit ? "Update Animal" : "Add Animal"}
                </button>
                {isEdit && (
                    <button
                        className="btn btn-secondary whitespace-nowrap ml-2"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default AnimalForm;
