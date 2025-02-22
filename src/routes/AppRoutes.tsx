import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/LoginForm";
import Collections from "../pages/Collections";
import ProtectedRoute from "../components/ProtectedRoute";
import CollectionDetails from "../pages/CollectionDetails";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/collections"
        element={
          <ProtectedRoute>
            <Collections />
          </ProtectedRoute>
        }
      />
      <Route
        path="/collections/:collectionId"
        element={<CollectionDetails />}
      />
    </Routes>
  );
};

export default AppRoutes;
