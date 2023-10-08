import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

import Login from '../pages/Login/login.js';

function AppRoutes(){
    return (
        <Router>
            <Route exact path='/' component={Login}></Route>
        </Router>
    );
}

export default AppRoutes;