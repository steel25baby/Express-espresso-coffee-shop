import React from 'react';
import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Contacts from './pages/Contacts/Contacts';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Cart, { CartProvider } from './pages/Cart/Cart';
import Admin from './pages/Admin/Admin';
import AdminMenu from './pages/Admin/AdminMenu';
import ViewMenu from './pages/Admin/ViewMenu';
import AdminCustomers from './pages/Admin/AdminCustomers';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/admin' element={<ProtectedRoute requiredRole={["admin"]} element={<Admin />}/>} />
            <Route path='/adminMenu' element={<ProtectedRoute requiredRole={["admin"]} element={<AdminMenu />}/>} />
            <Route path='/viewMenu' element={<ViewMenu />} />
            <Route path='/adminCustomers' element={<ProtectedRoute element={<AdminCustomers/>} requiredRole={["admin"]}/>} />
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
