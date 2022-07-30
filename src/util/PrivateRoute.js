import React from "react";
import {Navigate, Outlet} from "react-router-dom";

// not ideal but will work for now
const PrivateRoute = () =>
{
    return localStorage.getItem("accessToken") ? <Outlet/> : <Navigate to="/"/>
}

export default PrivateRoute;