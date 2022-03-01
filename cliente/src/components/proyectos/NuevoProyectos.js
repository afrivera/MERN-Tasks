import React, { useState } from 'react'

const NuevoProyectos = () => {

    // state para proyecto
    const [proyecto, setProyecto] = useState({
        nombre: ''
    });

    // extraer nombre del proyecto
    const { nombre } = proyecto;

    // lee los contenidos del input
    const onChangeProyecto = e=> {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    // cuando el usuario da submit
    const handleSubmit = e=> {
        e.preventDefault();

        // validar el proyecto

        // agregar al state

        // reiniciar el form

    }

    return (
        <>
            <button
                type='button'
                className='btn btn-block btn-primario'
            >Nuevo Proyecto</button>

            <form 
                className='formulario-nuevo-proyecto'
                onSubmit={ handleSubmit }
            >
                <input
                    type='text'
                    className='input-text'
                    placeholder='Nombre Proyecto'
                    name='nombre'
                    value={nombre}
                    onChange={ onChangeProyecto }
                />

                <input  
                    type='submit'
                    className='btn btn-primario btn-block'
                    value='Agregar Proyecto'
                />

            </form>
        </>
    )
}

export default NuevoProyectos;