import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';


const Login = () => {

    const navigate = useNavigate();

    // extraer los valores del context
    const { alerta, mostrarAlerta } = useContext( AlertaContext );
    const { mensaje, autenticado, iniciarSesion } = useContext( AuthContext );

    // state para iniciar sesión
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    // en caso que el password o usuario no exista
    useEffect(()=> {
        if( autenticado ){
            navigate('/proyectos');
        }
        if(mensaje){
            mostrarAlerta( mensaje.msg, mensaje.categoria );
        }

    }, [mensaje, autenticado, navigate])

    // extraer los datos de usuario
    const { email, password } = usuario;

    const handleChange= e=> {
        setUsuario( {
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    // cuando el usuario realiza el submit
    const handleSubmit = e=> {
        e.preventDefault();

        // validar que no hayan campos vacios
        if( email.trim() ==='' || password.trim() === ''){
            mostrarAlerta('Todos los Campos son Obligatorios', 'alerta-error')
            return;
        }

        // pasarlo al action
        iniciarSesion({ email, password });
        
    }


    return (
        <div className='form-usuario'>
            {
                alerta && 
                <div className={`alerta ${alerta.categoria}`}>{ alerta.msg }</div>
            }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Tu Email'
                            value={ email }
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Tu Password'
                            value={ password }
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type='submit'
                            className='btn btn-primario btn-block '
                            value='Iniciar Sesión'
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className='enlace-cuenta'>Obtener Cuenta</Link>
            </div>
        </div>
    )
}

export default Login