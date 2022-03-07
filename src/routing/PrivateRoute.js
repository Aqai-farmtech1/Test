import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
// import Sidebar from "components/Sidebar/Sidebar.js";
// import DashboardHeader from "components/Headers/DashboardHeader.js";

import Login from "../pages/login/Login";
// import AuthenticatedRoute from "../components/wrapper/AuthenticatedRoute";
import PageNotFound from "../pages/error 404/PageNotFound";
import MainLayout from "../components/layout/MainLayout";

const isLogin = () => {
    if (localStorage.getItem('token')) return true;
    return false;
}

const PrivateRoute = ({ element: Component, ...rest }) => {
    console.log('Login check', isLogin());
    let Provider = rest.provider;
    return (isLogin() ? <Routes>
        {/* <Route element={<AuthenticatedRoute />}> */}
        <Route path="/" element={<MainLayout />}>
            <Route element={Component} {...rest} render={props => (isLogin() ?
                <Provider>
                    <div className="relative md:ml-64 bg-blueGray-100">
                        <Component {...props} />
                    </div>
                </Provider> :
                <Navigate replace to="/" />)} />
        </Route>
        {/* </Route> */}
    </Routes> : '');
}

export default PrivateRoute;