import React from 'react'
import { Navigate } from 'react-router-dom'
import { AdminRoutes } from './AdminRoutes'
import { AlumnoRoutes } from './AlumnoRoutes'
import { DocenteRoutes } from './DocenteRoutes'

export const PublicRoute = ({children, rol, isLogged}) => {

   
    return isLogged == false ? children :  <Navigate to='/' />

}
