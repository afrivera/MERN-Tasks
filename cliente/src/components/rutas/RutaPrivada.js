import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../../context/autenticacion/authContext'

const RutaPrivada = ({ children }) => {

    const { autenticado, cargando, usuarioAutenticado } = useContext(AuthContext );

    useEffect(()=> {
        usuarioAutenticado();
        // eslint-disable-next-line
    },[])

    return !autenticado && !cargando ? (
            <Navigate to='/' />
        ) : children 
}

export default RutaPrivada;
