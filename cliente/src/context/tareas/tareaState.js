import { 
    TAREAS_PROYECTO,
 } from '../../types'

import { useReducer } from 'react'
import tareaContext from './tareaContext-'
import tareaReducer from './tareaReducer'


const TareaState = props => {
    const initialState = {
        tareas: [
            {proyectoId: 1, nombre: 'Elegir Plataforma', estado: true},
            {proyectoId: 2, nombre: 'Elegir Colores', estado: false},
            {proyectoId: 3, nombre: 'Elegir Plataformas de Pago', estado: false},
            {proyectoId: 4, nombre: 'Elegir Hosting', estado: true},
            {proyectoId: 2, nombre: 'Elegir Plataforma', estado: true},
            {proyectoId: 3, nombre: 'Elegir Colores', estado: false},
            {proyectoId: 4, nombre: 'Elegir Plataformas de Pago', estado: false},
            {proyectoId: 1, nombre: 'Elegir Hosting', estado: true},
            {proyectoId: 3, nombre: 'Elegir Plataforma', estado: true},
            {proyectoId: 4, nombre: 'Elegir Colores', estado: false},
            {proyectoId: 1, nombre: 'Elegir Plataformas de Pago', estado: false},
            {proyectoId: 2, nombre: 'Elegir Hosting', estado: true},
        ],

        tareasproyecto: null,

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

    return (
        <tareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,

                obtenerTareas,
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}

export default TareaState;


