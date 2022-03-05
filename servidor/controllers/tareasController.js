const Proyecto = require("../models/Proyecto");
const Tarea = require("../models/Tarea")


// Crea una nueva tarea
exports.crearTarea = async(req, res )=> {

    const { proyecto, nombre } = req.body;
    
    try {

        // validar el creador
        const creadorProyecto = await Proyecto.findById( proyecto );
        if( creadorProyecto.creador.toString() !== req.usuarioId){
            return res.status(401).json({msg: 'Usuario no Autorizado'})
        }

        // Crear la tarea
        const tarea = new Tarea({ nombre, proyecto } );
        await tarea.save();

        res.json( tarea );
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Función para obtener las tareas de cada proyecto
exports.obtenerTareas = async( req, res )=> {

    const { proyecto } = req.body;

    try {
        
        // validar el creador
        const creadorProyecto = await Proyecto.findById( proyecto );
        if( creadorProyecto.creador.toString() !== req.usuarioId){
            return res.status(401).json({msg: 'Usuario no Autorizado'})
        }

        // obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto });

        res.json(tareas);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

// función para actualizar tarea por id
exports.actualizarTarea = async ( req, res )=> {

    const { proyecto, nombre, estado } = req.body;
    const { id } = req.params;

    try {

        // validar si la tarea existe
        const tarea = await Tarea.findById( id );
        if( !tarea ){
            return res.status(404).json({msg: 'No existe la tarea'});
        }

        // validar el creador
        const creadorProyecto = await Proyecto.findById( proyecto );
        if( creadorProyecto.creador.toString() !== req.usuarioId){
            return res.status(401).json({msg: 'Usuario no Autorizado'})
        }

        // crear objeto con la misma info
        const nuevaTarea = {};
        if( nombre ) nuevaTarea.nombre = nombre;
        if( estado ) nuevaTarea.estado = estado;

        // Actualizar la tarea
        const tareaActualizada = await Tarea.findByIdAndUpdate(id, nuevaTarea, { new: true });

        res.json({
            msg: 'Tarea Actualizada Correctamente', 
            tareaActualizada
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

// borrar una tarea
exports.borrarTarea = async( req, res ) => {

    const { id } = req.params;
    const { proyecto } = req.body;

    try {

        // validar si la tarea existe
        const tarea = await Tarea.findById( id );
        if( !tarea ){
            return res.status(404).json({msg: 'No existe la tarea'});
        }

        // validar el creador
        const creadorProyecto = await Proyecto.findById( proyecto );
        if( creadorProyecto.creador.toString() !== req.usuarioId){
            return res.status(401).json({msg: 'Usuario no Autorizado'})
        }    
        
        // Eliminar
        await Tarea.findByIdAndRemove( id );
        res.json({msg: 'Tarea Eliminada Satisfactoriamente'});
        
    } catch (error) {
        console.log(error);
        res.status.send('Hubo un Error');
    }
}