import React from 'react'
import ListadoProyectos from '../proyectos/ListadoProyectos';
import NuevoProyectos from '../proyectos/NuevoProyectos';

const Sidebar = () => {
  return (
    <aside>
        <h1>MERN <span>Tasks</span></h1>

        <NuevoProyectos />
        
        <div className="proyectos">
            <h2>Tus Proyectos</h2>
            
            <ListadoProyectos />
        </div>
    </aside>
  )
}

export default Sidebar;