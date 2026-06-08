import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import PrivateRoute from "./routes/PrivateRoutes";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Catalog from "./pages/Catalog/Catalog";
import PointOfSales from "./pages/PointOfSales/PointOfSales";

import MainLayout from "./layouts/MainLayouts";

import GlobalError from "./components/GlobalErrorHandler";
import ScreenBlocker from "./components/ScreenBlocker";
import Landing from "./pages/Landing/Landing";

import "./App.scss";
import { getTheme } from "./themes/theme";
import GlobalAlert from "./components/global-alerts/GlobalAlert";
import GlobalConfirm from "./components/global-alerts/GlobalConfirm";

const App = () => {

    const theme = getTheme("dark");

    const {
        loading: isLoading,
        loadingMessage,
    } = useSelector(
        (state) => state.ui
    );

    useEffect(() => {

        const root =
            document.documentElement;

        root.style.setProperty(
            "--bg",
            theme.palette.background.default
        );

        root.style.setProperty(
            "--surface",
            theme.palette.background.paper
        );

        root.style.setProperty(
            "--text",
            theme.palette.text.primary
        );

        root.style.setProperty(
            "--text-secondary",
            theme.palette.text.secondary
        );

        root.style.setProperty(
            "--primary",
            theme.palette.primary.main
        );

        root.style.setProperty(
            "--primary-hover",
            theme.palette.primary.dark
        );

        root.style.setProperty(
            "--border",
            theme.palette.border.main
        );

        root.style.setProperty(
            "--success",
            theme.palette.success.main
        );

        root.style.setProperty(
            "--success-hover",
            theme.palette.success.dark
        );

        root.style.setProperty(
            "--danger",
            theme.palette.error.main
        );

    }, [theme]);

    return (
        <>
            <GlobalError />

            <Routes>

                <Route
                    path="/"
                    element={<Landing />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    element={
                        <PrivateRoute>
                            <MainLayout />
                        </PrivateRoute>
                    }
                >
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/catalogo"
                        element={<Catalog />}
                    />

                    <Route
                        path="/punto-de-venta"
                        element={<PointOfSales />}
                    />
                </Route>

            </Routes>

            <GlobalAlert />
			<GlobalConfirm />

            <ScreenBlocker
                open={isLoading}
                message={loadingMessage}
            />
        </>
    );
};

export default App;