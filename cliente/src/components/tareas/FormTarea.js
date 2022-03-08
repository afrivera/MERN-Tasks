import React, { useContext, useEffect, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext-';

const FormTarea = () => {

    // extraer si un proyecto está activo
    const proyectosContext = useContext( proyectoContext );
    const { proyecto } = proyectosContext;

    // obtener función del context tarea
    const tareasContext = useContext( tareaContext );
    const { tareaseleccionada, errortarea, obtenerTareas, agregarTarea, validaTarea, actualizarTarea, limpiartarea } = tareasContext;

    // effect que detecta si hay alguna tarea seleccionada
    useEffect(()=>{
        if( tareaseleccionada !== null){
            setTarea( tareaseleccionada);
        } else {
            setTarea({
                nombre: ''
            })
        }
    },[tareaseleccionada])

    // state del formulario
    const [tarea, setTarea] = useState({
        nombre: ''
    })

    // extraer el nombre del proyecto 
    const { nombre } = tarea;

    // Sí no hay proyecto seleccionado
    if( !proyecto ) return null;

    // array destructuring para extraer el proyecto actual
    const [proyectoActual ] = proyecto;

    // leer los valores del formulario
    const handleChange = e => {
        setTarea( {
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    // función al realizar submit del form
    const handleSubmit = e => {
        e.preventDefault();

        // validar
        if( nombre.trim() === '') {
            validaTarea();
            return;
        }

        // validar si es para editar o nueva tarea
        if(tareaseleccionada === null){
            // agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea( tarea );
        } else {
            // actualizar tarea existente
            actualizarTarea( tarea );

            // elimina tareaseleccionada del state
            limpiartarea();
        }


        // obtener y filtrar tareas del proyecto actual
        obtenerTareas( proyectoActual.id);

        // reiniciar el form
        setTarea({
            nombre:''
        })
    }

    return (
        <div className='formulario'>
            <form
                onSubmit={ handleSubmit }
            >
                <div className='contenedor-input'>
                    <input
                        type='text'
                        className='input-text'
                        placeholder='Nombre Tarea...'
                        name='nombre'
                        value={ nombre }
                        onChange={ handleChange }
                    />
                </div>

                <div className='contenedor-input'>
                    <input 
                        type='submit'
                        className='btn btn-primario btn-submit btn-block'
                        value={ tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea' }
                    />
                </div>
            </form>
            {
                errortarea &&
                    <p className='mensaje error'>El Nombre de la Tarea es Obligatorio</p>
            }
        </div>
    )
}

export default FormTarea