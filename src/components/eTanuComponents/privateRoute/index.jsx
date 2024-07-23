import React, { useEffect } from 'react';

import { Navigate } from "react-router-dom";
import { useAuth } from '../../../context/authContext';

const PrivateRoute = ({ Component }) => {
 
    const { devMode } = useAuth();
    const token = localStorage.getItem('jwtToken')

    useEffect(() => {
    }, [])

    return (token !== '' || token !== null || token !== undefined ) || devMode ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;