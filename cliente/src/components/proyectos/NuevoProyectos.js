import React, { useContext, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyectos = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext( proyectoContext );
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

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
        if( nombre.trim() === ''){
            mostrarError();
            return;
        };

        // agregar al state
        agregarProyecto( proyecto );

        // reiniciar el form
        setProyecto({
            nombre: ''
        })

    }

    // mostrar el formulario
    const handleOnClick = () => {
        mostrarFormulario();
    }

    return (
        <>
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={ handleOnClick }
            >Nuevo Proyecto</button>

            {
                formulario &&
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
            }
            {
                errorformulario &&
                    <p className='mensaje error'>El Nombre del Proyecto es Obligatorio</p>
            }
        </>
    )
}

export default NuevoProyectos;