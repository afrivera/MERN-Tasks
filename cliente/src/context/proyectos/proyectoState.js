import React, { useReducer } from 'react';


import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS, 
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types';
import clienteAxios from '../../config/axios';



const ProyectoState = props => {

    const initialState = {
        proyectos : [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null

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
    const obtenerProyectos = async() => {
        try {
            const { data } = await clienteAxios.get('/api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: data.proyectos 
            })
        } catch (error) {
            // console.log(error);
            const alerta = {
                msg: 'Hubo un Error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    // Agregar un nuevo proyecto
    const agregarProyecto = async proyecto => {
        try {
            const { data } = await clienteAxios.post( '/api/proyectos', proyecto );

            // insertar el proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: data
            });
            
        } catch (error) {
            // console.log(error.response)
            const alerta = {
                msg: 'Hubo un Error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }

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
    const eliminarProyecto = async idProyecto => {
        try {
            await clienteAxios.delete(`/api/proyectos/${ idProyecto }`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: idProyecto
            });
            
        } catch (error) {
            // console.log(error.response);
            const alerta = {
                msg: 'Hubo un Error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
            
        }
        
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,

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