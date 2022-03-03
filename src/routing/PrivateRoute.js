import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Sidebar from "components/Sidebar/Sidebar.js";
// import DashboardHeader from "components/Headers/DashboardHeader.js";

const isLogin = () => {
    if (localStorage.getItem('token')) return true;
    return false;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    let Provider = rest.provider;
    return <Route {...rest} render={props => (isLogin() ?
        <Provider>
            <div className="relative md:ml-64 bg-blueGray-100">
                <Sidebar />
                <Component {...props} />
            </div></Provider> :
        <Redirect to="/" />)} />
}




export default PrivateRoute;