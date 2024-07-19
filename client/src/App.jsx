import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Home from './pages/Home/Home'
import Menu from './pages/Menu/Menu'
import Contacts from './pages/Contacts/Contacts'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/contacts' element={<Contacts/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
     <Footer/>
     </BrowserRouter> 
    </>
  )
}

export default App
