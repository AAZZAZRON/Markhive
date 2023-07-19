import React, { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import NoPage from "./screens/NoPage";
import Dashboard from "./screens/Dashboard";
import Background from "./components/Background";

export default function Base() {

    return (
        <>
            <NavBar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
            <Background/>
        </>
    );
}
