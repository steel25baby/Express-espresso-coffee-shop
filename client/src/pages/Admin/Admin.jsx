import React from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <div>
      <h1>Admin</h1>
      <Link to="/adminMenu">Menu</Link>
    </div>
  );
}

export default Admin;
