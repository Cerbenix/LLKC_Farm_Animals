import React, { useEffect, useState } from "react";
import Error from "../components/Error";

interface Farm {
    id: number;
    name: string;
    email: string;
    website: string;
}

interface Errors {
    [key: string]: string;
}

interface FarmFormProps {
    onSubmit: (data: Farm) => Promise<void>;
    initialData?: Farm;
    isEdit?: boolean;
    onCancel?: () => void;
}

const FarmForm: React.FC<FarmFormProps> = ({
    onSubmit,
    initialData,
    isEdit = false,
    onCancel,
}) => {
    
    const [formData, setFormData] = useState<Farm>(
        initialData || {
            id: 0,
            name: "",
            email: "",
            website: "",
        }
    );

    useEffect(() => {
        if (initialData) {
          setFormData(initialData);
        } else {
          setFormData({
            id: 0,
            name: "",
            email: "",
            website: "",
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
                    name: "",
                    email: "",
                    website: "",
                });
            } catch (error) {
                console.error("Failed to submit form:", error);
            }
        }
    };

    const validateForm = (): boolean => {
        setErrors({});

        const errors: Errors = {};

        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }

        if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = "Invalid email";
        }

        if (
            formData.website &&
            !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
                formData.website
            )
        ) {
            errors.website = "Invalid website URL";
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
                    <label htmlFor="name" className="whitespace-nowrap mr-3">
                        Name:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                {errors.name && <Error>{errors.name}</Error>}
            </div>

            <div className="container">
                <div className="container flex flex-row items-center">
                    <label htmlFor="email" className="whitespace-nowrap mr-3">
                        Email:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                {errors.email && <Error>{errors.email}</Error>}
            </div>

            <div className="container">
                <div className="container flex flex-row items-center">
                    <label htmlFor="website" className="whitespace-nowrap mr-3">
                        Website:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                    />
                </div>
                {errors.website && <Error>{errors.website}</Error>}
            </div>

            <div className="flex flex-row items-start">
                <button className="btn btn-primary whitespace-nowrap">
                    {isEdit ? "Update Farm" : "Add Farm"}
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

export default FarmForm;
