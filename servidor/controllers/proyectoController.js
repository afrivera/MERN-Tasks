const Proyecto = require("../models/Proyecto");

// función para crear proyectos
exports.crearProyecto = async( req, res)=> {

    // sacamos los datos que necesitamos del body
    const { nombre } = req.body;

    try {
        // crear un nuevo proyecto
        const proyecto = new Proyecto({ nombre});
        proyecto.creador = req.usuarioId;
        await proyecto.save();

        res.json(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Se presento un error'});
    }
}

// función para obtener proyectos del usuario autenticado
exports.obtenerProyectos = async(req, res)=> {
    try {
        const proyectos = await Proyecto.find({creador: req.usuarioId}).sort({ creado: -1});
        res.json({proyectos});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
}

// función para actualizar un proyecto
exports.actualizarProyecto = async (req, res)=> {

    const { id } = req.params;
    // extraer la info del proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};

    if( nombre ){
        nuevoProyecto.nombre = nombre;
    }

    try {

        // validar el creador
        const creadorProyecto = await Proyecto.findById( id );
        if( creadorProyecto.creador.toString() !== req.usuarioId){
            return res.status(401).json({msg: 'Usuario no Autorizado'})
        }

        // actualizar el proyecto
        const proyecto = await Proyecto.findByIdAndUpdate( id, nuevoProyecto, { new: true});

        res.json( proyecto );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en el Servidor'});
    }

}

// función para eliminar un proyecto por id
exports.eliminarProyecto = async(req, res)=> {
    const { id } = req.params;

    try {
        // validar el creador
        const creadorProyecto = await Proyecto.findById( id );
        if( creadorProyecto.creador.toString() !== req.usuarioId){
            return res.status(401).json({msg: 'Usuario no Autorizado'})
        }

        // eliminar el proyecto
        await Proyecto.findOneAndDelete({ id });
        res.json({msg: 'Proyecto Eliminado'});

    } catch (error) {
        res.status(500).json({msg: 'Error en el Servidor'});
    }
}