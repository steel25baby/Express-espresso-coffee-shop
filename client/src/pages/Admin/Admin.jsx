import React from 'react';
import { Link } from 'react-router-dom';
import "./Admin.css"

function Admin() {
  return (
    <div>
      <h1>Admin</h1>
      <Link to="/adminMenu" className='Links'>Update Menu</Link>
      <Link to="/viewMenu" className='Links'>Delete from Menu</Link>
      <Link to="/adminCustomers" className='Links'>View customers</Link>
    </div>
  );
}

export default Admin;
