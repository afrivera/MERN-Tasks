import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA,
    TAREA_ERROR
 } from '../../types'
 import { useReducer } from 'react'

import tareaContext from './tareaContext-'
import tareaReducer from './tareaReducer'
import clienteAxios from '../../config/axios'


const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false, 
        tareaseleccionada: null,
        mensaje: null
    }

    // crear state y dispatch
    const [state, dispatch] = useReducer( tareaReducer, initialState );

    // Crear las Funciones

    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try {
            const { data } = await clienteAxios.get('/api/tareas', { params: { proyecto }} );
            dispatch({
                type: TAREAS_PROYECTO,
                payload: data.tareas
            });
        } catch (error) {
            // console.log(error.response);
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: TAREA_ERROR,
                payload: alerta
            })
        }
    }

    // agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        try {
            const { data } = await clienteAxios.post('/api/tareas/', tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: data
            })
        } catch (error) {
            // console.log(error.response);
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: TAREA_ERROR,
                payload: alerta
            })
        }
    }

    // valida y muestra un error en caso de ser necesario
    const validaTarea = ()=> {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // eliminar tarea por id
    const eliminarTarea =async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params:{ proyecto }});

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            });
        } catch (error) {
            // console.log(error.response);
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: TAREA_ERROR,
                payload: alerta
            })
        }
    }

    // edita o modifica una tarea
    const actualizarTarea = async tarea => {
        try {
            const { data } = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: data.tareaActualizada
            })
        } catch (error) {
            // console.log(error.response);
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: TAREA_ERROR,
                payload: alerta
            })
        }
    }

    // Extrae una tarea para edición
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
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
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                mensaje: state.mensaje,

                obtenerTareas,
                agregarTarea,
                validaTarea,
                eliminarTarea,
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


