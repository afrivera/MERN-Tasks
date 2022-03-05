const Proyecto = require("../models/Proyecto")


exports.existeProyectoPorId = async(id) =>{
    const existeProyecto = await Proyecto.findById(id);
    if( !existeProyecto ){
        throw new Error(`el id: ${ id }, no existe`);
    }
}
