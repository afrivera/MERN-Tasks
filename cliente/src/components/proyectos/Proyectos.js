import React from 'react'
import Barra from '../layouts/Barra';
import Sidebar from '../layouts/Sidebar';
import FormTarea from '../tareas/FormTarea';

const Proyectos = () => {
  return (
    <div className="contenedor-app">
        <Sidebar />

        <div className="seccion-principal">
          <Barra />
            <main>

              <FormTarea />
                <div className="contenedor-tareas">

                </div>
            </main>
        </div>
    </div>
  )
}

export default Proyectos;