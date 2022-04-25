import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Notas } from '../components/alumno/Notas'
import { AlumnoLayout } from '../Layouts/AlumnoLayout'

export const AlumnoRoutes = () => {
    return (
        <Routes>

            <Route path="/" element={<AlumnoLayout />} >
                <Route index element={<Notas />} />
            </Route>

        </Routes>
    )
}
