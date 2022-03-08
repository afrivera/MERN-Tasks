import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/autenticacion/authContext'

const Barra = () => {

  // Extraer la información de autenticación
  const { usuario, usuarioAutenticado, cerrarSesion} = useContext( AuthContext );

  useEffect(()=> {
    usuarioAutenticado();

    // eslint-disable-next-line
  },[])

  return (
    <header className='app-header'>
      {
        usuario &&
        <p className='nombre-usuario'>Hola <span>{ usuario.nombre }</span></p>
      }

        <nav className='nav-principal'>
            <button
              className='btn btn-blank cerrar-sesion'
              onClick={()=> cerrarSesion()}
            >Cerrar Sesión</button>
        </nav>
    </header>
  )
}

export default Barra