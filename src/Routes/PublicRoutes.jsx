import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthLayout } from '../Layouts/AuthLayout'
import { Login } from '../Layouts/Login'
import { Register } from '../Layouts/Register'

export const PublicRoutes = () => {
  return (
    
 
    <Routes>

      <Route path="/" element={<AuthLayout />} >

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

      </Route>
    </Routes>


  )
}
