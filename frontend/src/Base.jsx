import React, { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import NoPage from "./screens/NoPage";
import Dashboard from "./screens/Dashboard";
import Background from "./components/Background";
import SignupPage from "./screens/SignupPage";
import LoginPage from "./screens/LoginPage";

export default function Base() {

    return (
        <>
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
            {/* <NavBar/> */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
            <Background/>
        </div>
        </div>
        </>
    );
}
