import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Alumnos } from '../components/admin/Alumnos'
import { Docentes } from '../components/admin/Docentes'
import { Home } from '../components/admin/Home'
import { AdminLayout } from '../Layouts/AdminLayout'

export const AdminRoutes = () => {
    

    return (



        <Routes>

            <Route path="/" element={<AdminLayout />} >
                
                <Route index element={<Home />} />


                { /*docentes*/}
                <Route path="/docentes" element={<Docentes />} />
              

                {/*Alumnos*/}
                <Route path="/alumnos" element={<Alumnos />} />

           
            </Route>

        </Routes>


    )
}
