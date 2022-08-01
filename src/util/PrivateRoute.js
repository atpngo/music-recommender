import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import NavBar from "../components/NavBar";

// not ideal but will work for now
const PrivateRoute = () =>
{
    return localStorage.getItem("accessToken") ? <><NavBar/><Outlet/></> : <Navigate to="/"/>
}

export default PrivateRoute;