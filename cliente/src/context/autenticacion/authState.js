import { useReducer } from 'react';
import AuthContext from './authContext.js';
import authReducer from './authReducer.js';

import clienteAxios from '../../config/axios.js';
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types/index.js'
import tokenAuth from '../../config/tokenAuth.js';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Funciones
    const registrarUsuario = async datos => {
        try {
            const { data }  = await clienteAxios.post('/api/usuarios', datos);
            // console.log(data);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: data,
            });
            usuarioAutenticado();
            
        } catch (error) {
            // console.log(error.response);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    // retorna el usuario autenticado
    const usuarioAutenticado = async()=> {
        const token = localStorage.getItem('token');
        if( token ){
            // TODO: Función para enviar el token por header
            tokenAuth( token );
        }

        try {
            const { data } = await clienteAxios.get('/api/auth');
            // console.log(data);
            dispatch({
                type: OBTENER_USUARIO,
                payload: data
            })

        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // cuando el usuario inicia sesión
    const iniciarSesion = async datos => {
        try {
            const { data } = await clienteAxios.post('/api/auth', datos);
            // console.log(data)
            dispatch({
                type: LOGIN_EXITOSO,
                payload: data
            });
            
            // Obtener el usuario 
            usuarioAutenticado();
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })

        }
    }

    // Cierra sesión de usuario
    const cerrarSesion = ()=>{
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,

                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthState;