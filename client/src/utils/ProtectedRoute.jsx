import React from 'react'
import useLoginStore from '../pages/Store/login.store'
import useCustomerStore from '../pages/Store/customerStore';
import { Navigate } from 'react-router-dom';

const ProtectedRoute=({element, requiredRole})=>{
    const isAuthenticated=useLoginStore((state)=>state.login);
    const customer=useCustomerStore((state)=>state.customer);

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }

    if (requiredRole && !requiredRole.includes(customer.data.role)) {
        return <Navigate to="/"/>
    }
    return element;
}

export default ProtectedRoute;