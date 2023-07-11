import React from "react";
import useAuthContext from "../context/AuthContext";

const Home: React.FC = () => {
    const { user } = useAuthContext();

    return (
        <div className="flex justify-center mt-10">
            <h1 className="text-5xl">Welcome {user?.name}</h1>
        </div>
    );
};

export default Home;
