import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext-';

const Proyecto = ({ proyecto }) => {

    // obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;
    
    // obtener la función del context tarea
    const tareasContext = useContext( tareaContext);
    const { obtenerTareas } = tareasContext;

    // función para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id) // fijar un proyecto actual
        obtenerTareas( id ); // filtrar las tareas cuando se dé click

    }

    return (
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={()=> seleccionarProyecto( proyecto._id)}
            >{ proyecto.nombre }</button>
        </li>
    )
}

export default Proyecto