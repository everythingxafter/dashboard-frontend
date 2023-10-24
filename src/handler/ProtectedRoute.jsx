import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("Authorization");
    if (token) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
