import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AlumnosD } from '../components/docente/AlumnosD'
import { NotasD } from '../components/docente/NotasD'
import { DocenteLayout } from '../Layouts/DocenteLayout'

export const DocenteRoutes = () => {
  return (
    <Routes>

    <Route path="/" element={<DocenteLayout />} >
       
        <Route index element={<AlumnosD />} />

        { /*alumnos notas*/}
        <Route path="/notas/:id" element={<NotasD />} />
      
        {/*Alumnos*/}

   
    </Route>

</Routes>
  )
}
