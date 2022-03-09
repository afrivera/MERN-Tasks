import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/autenticacion/authContext';
import Barra from '../layouts/Barra';
import Sidebar from '../layouts/Sidebar';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';

const Proyectos = () => {

  // Extraer la información de autenticación
  const { usuarioAutenticado } = useContext( AuthContext );

  useEffect(()=> {
    usuarioAutenticado();
    // eslint-disable-next-line
  },[])

  return (
    <div className="contenedor-app">
        <Sidebar />

        <div className="seccion-principal">
          <Barra />
            <main>

              <FormTarea />
                <div className="contenedor-tareas">
                  <ListadoTareas />
                </div>
            </main>
        </div>
    </div>
  )
}

export default Proyectos;