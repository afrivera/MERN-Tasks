import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';


const NuevaCuenta = () => {

    const navigate = useNavigate();

    // extraer valores del context de alerta
    const { alerta, mostrarAlerta} = useContext( AlertaContext );

    // extraer función del context auth
    const { mensaje, autenticado, registrarUsuario } =useContext( AuthContext );

    // en caso de que el usuario se haya autenti cado o registrado o sea un registro duplicado
    useEffect(()=>{
        // if( autenticado ){
        //     navigate('/proyectos')
        // }
        if( mensaje ){
            mostrarAlerta( mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    },[mensaje, autenticado, navigate ]);

    // state para iniciar sesión
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    // extraer los datos de usuario
    const { nombre, email, password, confirmar } = usuario;

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
        if( nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los Campos son Obligatorios', 'alerta-error');
            return;
        }

        // password min 6 carac
        if( password.length < 6 ){
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
            return ;
        }

        // validar password sean iguales
        if( password !== confirmar ){
            mostrarAlerta('Los password no coinciden', 'alerta-error');
            return ;
        }

        // pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        });
        
    }


    return (
        <div className='form-usuario'>
            {
                    alerta && 
                        <div className={`alerta ${alerta.categoria}`}>{ alerta.msg} </div>
            }
            <div className="contenedor-form sombra-dark">
                <h1>Crear Cuenta</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor='nombre'>Nombre</label>
                        <input
                            type='text'
                            id='nombre'
                            name='nombre'
                            placeholder='Tu Nombre'
                            value={ nombre }
                            onChange={handleChange}
                        />
                    </div>
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
                        <label htmlFor='confirmar'>Confirmar Password</label>
                        <input
                            type='password'
                            id='confirmar'
                            name='confirmar'
                            placeholder='Tu confirmar'
                            value={ confirmar }
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type='submit'
                            className='btn btn-primario btn-block '
                            value='Registrarme'
                        />
                    </div>
                </form>
                
                <Link to={'/'} className='enlace-cuenta'>Volver a Iniciar Sesión</Link>
            </div>
        </div>
    )
}

export default NuevaCuenta