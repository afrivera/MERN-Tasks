import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
 } from '../../types'
 import { useReducer } from 'react'
 import {v4 as uuid} from 'uuid';

import tareaContext from './tareaContext-'
import {tareaReducer} from './tareaReducer'


const TareaState = props => {
    const initialState = {
        tareas: [
            {id: 1, proyectoId: 1, nombre: 'Elegir Plataforma', estado: true},
            {id: 2, proyectoId: 2, nombre: 'Elegir Colores', estado: false},
            {id: 3, proyectoId: 3, nombre: 'Elegir Plataformas de Pago', estado: false},
            {id: 4, proyectoId: 4, nombre: 'Elegir Hosting', estado: true},
            {id: 5, proyectoId: 2, nombre: 'Elegir Plataforma', estado: true},
            {id: 6, proyectoId: 3, nombre: 'Elegir Colores', estado: false},
            {id: 7, proyectoId: 4, nombre: 'Elegir Plataformas de Pago', estado: false},
            {id: 8, proyectoId: 1, nombre: 'Elegir Hosting', estado: true},
            {id: 9, proyectoId: 3, nombre: 'Elegir Plataforma', estado: true},
            {id: 10, proyectoId: 4, nombre: 'Elegir Colores', estado: false},
            {id: 11, proyectoId: 1, nombre: 'Elegir Plataformas de Pago', estado: false},
            {id: 12, proyectoId: 2, nombre: 'Elegir Hosting', estado: true},
        ],

        tareasproyecto: null,
        errortarea: false, 
        tareaseleccionada: null,
    }

    // crear state y dispatch
    const [state, dispatch] = useReducer( tareaReducer, initialState );

    // Crear las Funciones

    // Obtener las tareas de un proyecto
    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }

    // agregar una tarea al proyecto seleccionado
    const agregarTarea = tarea => {
        tarea.id = uuid()
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    // valida y muestra un error en caso de ser necesario
    const validaTarea = ()=> {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // eliminar tarea por id
    const eliminarTarea = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }

    // cambia el estado de cada tarea
    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }

    // Extrae una tarea para edición
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    // edita o modifica una tarea
    const actualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    }

    // elimina la tarea seleccionada
    const limpiartarea = ()=> {
        dispatch({
            type:LIMPIAR_TAREA
        })
    }

    return (
        <tareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,

                obtenerTareas,
                agregarTarea,
                validaTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiartarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}

export default TareaState;


