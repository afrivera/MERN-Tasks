import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const NuevaCuenta = () => {

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

        // password min 6 carac

        // validar password sean iguales

        // pasarlo al action
        
    }


    return (
        <div className='form-usuario'>
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