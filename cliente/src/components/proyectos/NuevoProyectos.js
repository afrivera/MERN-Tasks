import React from 'react'

const NuevoProyectos = () => {
  return (
      <>
        <button
            type='button'
            className='btn btn-block btn-primario'
        >Nuevo Proyecto</button>

        <form className='formulario-nuevo-proyecto'>
            <input
                type='text'
                className='input-text'
                placeholder='Nombre Proyecto'
                name='nombre'
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