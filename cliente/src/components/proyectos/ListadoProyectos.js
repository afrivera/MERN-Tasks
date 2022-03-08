import React, { useContext, useEffect } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext'
import Proyecto from './Proyecto';

const ListadoProyectos = () => {

    // extraer proyectos del state inicial
    const proyectosContext = useContext(proyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

    const { alerta, mostrarAlerta } = useContext(AlertaContext);
    

    // obtener proyectos cuando carga el documento
    useEffect(()=> {
        // si hay un error
        if( mensaje ){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje])

    // revisar si proyectos tiene contenido
    if(proyectos.length === 0 ) return <p>No hay Proyectos, comienza Creando uno</p>;

    return (
        <ul className='listado-proyectos'>
           {
               alerta && 
               <div className={`alerta ${alerta.categoria}`}>{ alerta.msg}</div>
           }
            <TransitionGroup>
                {proyectos.map( proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames='proyecto'
                    >
                        <Proyecto 
                            proyecto={proyecto}
                        /> 

                    </CSSTransition>

                ))}

            </TransitionGroup>
   
        </ul>
    )
}

export default ListadoProyectos;