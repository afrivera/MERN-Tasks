import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'

import Tarea from './Tarea'

const ListadoTareas = () => {

    // obtener el state de
    const proyectosContext = useContext( proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    // si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un Proyecto</h2>

    // Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] = proyecto;

    const tareasProyecto = [
        {nombre: 'Elegir Plataforma', estado: true},
        {nombre: 'Elegir Colores', estado: false},
        {nombre: 'Elegir Plataformas de Pago', estado: false},
        {nombre: 'Elegir Hosting', estado: true}
    ]

    // función para eliminar el proyecto
    const onClicEliminar = ()=> eliminarProyecto ( proyectoActual.id);

    return (
        <>
            <h2>Proyecto: { proyectoActual.nombre }</h2>

            <ul className='listado-tareas'>
                {
                    (tareasProyecto.length === 0)
                        ? (<li className='tarea'><p>No Hay Tareas</p></li>)
                        : (tareasProyecto.map(tarea=>(
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