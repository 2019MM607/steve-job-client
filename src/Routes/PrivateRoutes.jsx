import React, { useEffect, useState } from 'react'


import { Navigate } from 'react-router-dom'


export const PrivateRoutes = ({ isLogged, rol, user, children }) => {
    


  
    return isLogged  ? children :  <Navigate to='/auth/login' />
}
