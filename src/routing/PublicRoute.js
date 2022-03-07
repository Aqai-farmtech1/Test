import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import DashboardHeader from "components/Headers/DashboardHeader.js";

import Login from "../pages/login/Login";
import AuthenticatedRoute from "../components/wrapper/AuthenticatedRoute";
import PageNotFound from "../pages/error 404/PageNotFound";
import MainLayout from "../components/layout/MainLayout";

const PublicRoute = ({ element: Component, ...rest }) => {
    let Provider = rest.provider;
    return <Routes>
        <Route {...rest} element={Component} render={props =>
            <Provider>
                <Component {...props} />
            </Provider>} />
    </Routes>
}

export default PublicRoute;