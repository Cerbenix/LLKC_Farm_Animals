import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/UserLogin";
import Register from "./views/UserRegister";
import Header from "./components/Header";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import FarmsIndex from "./views/FarmIndex";
import AnimalsIndex from "./views/AnimalIndex";
import FarmShow from "./views/FarmShow";

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/farms" element={<FarmsIndex />} />
                    <Route path="/farms/:farmId" element={<FarmShow />} />
                    <Route path="/animals" element={<AnimalsIndex />} />
                </Route>
                <Route element={<GuestLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
