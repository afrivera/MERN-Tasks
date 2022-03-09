import React, { useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import alertaContext from '../../context/alertas/alertaContext';

import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext-';

import Tarea from './Tarea'

const ListadoTareas = () => {

    // obtener el state de
    const proyectosContext = useContext( proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    // obtener las tareas del proyecto
    const tareasContext = useContext( tareaContext);
    const { mensaje, tareasproyecto } = tareasContext;

    const { alerta, mostrarAlerta } = useContext(alertaContext);

    useEffect(()=> {
        if( mensaje ){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    },[mensaje]);

    // si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un Proyecto</h2>

    // Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] = proyecto;


    // función para eliminar el proyecto
    const onClicEliminar = ()=> eliminarProyecto ( proyectoActual._id);

    return (
        <>
            {
                alerta &&
                <div className={`alerta ${alerta.categoria}`}>{ alerta.msg }</div>
            }
            <h2>Proyecto: { proyectoActual.nombre }</h2>

            <ul className='listado-tareas'>
                {
                    (tareasproyecto.length === 0)
                        ? (<li className='tarea'><p>No Hay Tareas</p></li>)
                        : 
                        <TransitionGroup>

                           {tareasproyecto.map(tarea=>(
                               <CSSTransition
                                    key= { tarea._id }
                                    timeout={ 200 }
                                    classNames='tarea'             
                               >
                                    <Tarea 
                                        tarea={ tarea } 
                                    />
                               </CSSTransition>
                            ))}
                        </TransitionGroup>
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