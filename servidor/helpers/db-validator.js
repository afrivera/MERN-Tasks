const Proyecto = require("../models/Proyecto")


exports.existeProyectoPorId = async(id) =>{
    const existeProyecto = await Proyecto.findById(id);
    if( !existeProyecto ){
        throw Error(`el id: ${ id }, no existe`);
    }
}
exports.existeProyectoId = async(req, res, next ) =>{
    const { proyecto } = req.query
    const existeProyecto = await Proyecto.findById(proyecto);
    if( !existeProyecto ){
        return (`el id: ${ proyecto }, no existe`);
    }
    next();
}
