import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter,
    Routes,
    Route,

  } from "react-router-dom";


import { AdminRoutes } from './AdminRoutes';
import {NotFound} from '../Layouts/NotFound'
import { AlumnoRoutes } from './AlumnoRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoute } from './PublicRoute';
import { PublicRoutes } from './PublicRoutes';
import { DocenteRoutes } from './DocenteRoutes';
import { fetchWithtoken } from '../Helpers/Fetch';
import { startLogin } from '../Redux/actions/auth';



export const AppRouter = () => {


  const {user, isLogged}=useSelector(state => state.authReducer);

  
  
  return (
    <BrowserRouter>
      <Routes>


        <Route path='/auth/*' element={
          <PublicRoute isLogged={isLogged} user={user}>
            <PublicRoutes />
          </PublicRoute>
        } />


        {
          user?.rol === 'Administrador' &&
          <Route path='/*' element={
            <PrivateRoutes isLogged={isLogged} rol='Administrador' user={user}>
              <AdminRoutes />
            </PrivateRoutes>
          } />
        }
     
        
        {
          user?.rol === 'Docente' &&
          <Route path='/*' element={
            <PrivateRoutes isLogged={isLogged} rol='Docente' user={user}>
              <DocenteRoutes />
            </PrivateRoutes>
          } />
        
        }

        {
          user?.rol === 'Alumno' &&
          <Route path='/*' element={
            <PrivateRoutes isLogged={isLogged} rol='Alumno' user={user} >
              <AlumnoRoutes />
            </PrivateRoutes>
          } />
        }
          
        

        
        <Route path='*' element={<NotFound />} />

      </Routes>
    </BrowserRouter>

  )
}
