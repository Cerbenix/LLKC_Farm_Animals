import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/UserLogin";
import Register from "./views/UserRegister";
import Header from "./components/Header";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import FarmsIndex from "./views/FarmIndex";
import FarmEdit from "./views/FarmEdit";
import FarmCreate from "./views/FarmCreate";

function App() {

    return (
        <div>
            <Header />
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/farms" element={<FarmsIndex />} />
                    <Route path="/farms/:id/edit" element={<FarmEdit />} />
                    <Route path="/farms/create" element={<FarmCreate />} />
                </Route>
                <Route element={<GuestLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                </Route>
            </Routes>
        </div>
    );
}

export default App;
