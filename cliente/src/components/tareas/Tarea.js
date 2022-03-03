import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext-'

const Tarea = ({ tarea }) => {

    // extrae un proyecto si esta activo
    const proyectosContext = useContext (proyectoContext);
    const { proyecto } = proyectosContext;

    // destructuring array para saber el proyecto actual
    const [ proyectoActual ] = proyecto;

    // Obtener la función del context tarea
    const tareasContext = useContext( tareaContext );
    const { eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual } = tareasContext;

    // función que se ejecuta cuando se presiona eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea( id );
        obtenerTareas( proyectoActual.id )
    }

    // función que modifica el estado de la tarea
    const cambiarEstado = tarea => {
        if( tarea.estado){
            tarea.estado = false;
        } else {
            tarea.estado = true
        }
        cambiarEstadoTarea( tarea );
    }

    // función que agrega una tarea actual cuando se quiere editar
    const seleccionarTarea= tarea => {
        guardarTareaActual( tarea );
    }

    return (
        <li className='tarea sombra'>
            <p>{tarea.nombre}</p>

            <div className='estado'>
                {
                    (tarea.estado) 
                    ? 
                        (
                            <button 
                                type='button'
                                className='completo'
                                onClick={ ()=> cambiarEstado( tarea ) }
                            >Completo</button>
                        )
                    :
                    (
                        <button 
                            type='button'
                            className='incompleto'
                            onClick={ ()=> cambiarEstado( tarea ) }
                        >Incompleto</button>
                    )
                                 
                }
            </div>

            <div className='acciones'>
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={ ()=> seleccionarTarea( tarea ) }
                >Editar</button>
                <button
                    type='button'
                    className='btn btn-secundario'
                    onClick={()=> tareaEliminar(tarea.id)}
                >Eliminar</button>
            </div>
        </li>
    )
}

export default Tarea