import React from 'react';
import { Route } from 'react-router-dom';
// import DashboardHeader from "components/Headers/DashboardHeader.js";

const PublicRoute = ({ component: Component, ...rest }) => {
    let Provider = rest.provider;
    return <Route {...rest} render={props =>
        <Provider>
            <Component {...props} />
        </Provider>} />
}

export default PublicRoute;