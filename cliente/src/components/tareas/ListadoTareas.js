import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext-';

import Tarea from './Tarea'

const ListadoTareas = () => {

    // obtener el state de
    const proyectosContext = useContext( proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    // obtener las tareas del proyecto
    const tareasContext = useContext( tareaContext);
    const { tareasproyecto } = tareasContext;

    // si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un Proyecto</h2>

    // Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] = proyecto;


    // función para eliminar el proyecto
    const onClicEliminar = ()=> eliminarProyecto ( proyectoActual.id);

    return (
        <>
            <h2>Proyecto: { proyectoActual.nombre }</h2>

            <ul className='listado-tareas'>
                {
                    (tareasproyecto.length === 0)
                        ? (<li className='tarea'><p>No Hay Tareas</p></li>)
                        : (tareasproyecto.map(tarea=>(
                            <Tarea tarea={ tarea } />
                        )))
                }
            </ul>

            <button
                type='button'
                className='btn btn-eliminar'
                onClick={ onClicEliminar}
            >Eliminar Proyecto &times;</button>
        </>

    )
}

export default ListadoTareas