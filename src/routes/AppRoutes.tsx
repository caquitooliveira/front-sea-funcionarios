import {BrowserRouter, Routes, Route} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import Activities from "../pages/Actvities";
import ComingSoon from "../pages/ComingSoon";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="activities" element={<Activities />} />
                    <Route path="/relatorios" element={<ComingSoon />} />
                    <Route path="/configuracoes" element={<ComingSoon />} />
                    <Route path="/etapa-1" element={<ComingSoon />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;