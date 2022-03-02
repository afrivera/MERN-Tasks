import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid'

import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS, 
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types';



const ProyectoState = props => {

    const proyectos = [
        {id: 1,nombre: 'Tienda Virtual'},
        {id: 2,nombre: 'Intranet'},
        {id: 3,nombre: 'Diseño Sitio Web'},
        {id: 4,nombre: 'MERN'},
    ]

    const initialState = {
        proyectos : [],
        formulario: false,
        errorformulario: false,
        proyecto: null

    }

    // crear dispatch para ejecutar las acciones

    const [ state, dispatch ] = useReducer( proyectoReducer, initialState);

    // serie de funciones para el crud

    const mostrarFormulario = ()=>{
        dispatch({
            type: FORMULARIO_PROYECTO,

        })
    }

    // obtener los proyectos
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos 
        })
    }

    // Agregar un nuevo proyecto
    const agregarProyecto = proyecto => {
        proyecto.id = uuid();

        // insertar el proyecto en el state
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        });

    }

    // Valida el formulario por errores
    const mostrarError= ()=> {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // Selecciona el proyecto al que se le da click
    const proyectoActual = idProyecto => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: idProyecto
        })
    }

    // Elimina un proyecto
    const eliminarProyecto = idProyecto => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: idProyecto
        });
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,

                obtenerProyectos,
                mostrarFormulario,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            { props.children }
        </proyectoContext.Provider>
    )
}

export default ProyectoState;