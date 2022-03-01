import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const Login = () => {

    // state para iniciar sesión
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    })

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


        // pasarlo al action
        
    }


    return (
        <div className='form-usuario'>
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