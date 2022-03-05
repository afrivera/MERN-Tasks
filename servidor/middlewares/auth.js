const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');


const validarJWT = async( req, res, next)=>{

    // leer el token del header
    const token = req.header('x-auth-token');

    // revisar si no hay token
    if( !token ){
        return res.status(401).json({
            msg: 'No hay token, permiso no válido'
        })
    }

    // validar el token
    try {

        const { data } = jwt.verify( token, process.env.SECRETA);

        // validar si el usuario existe en la BD
        const usuario = await Usuario.findById( data );
        if( !usuario ){
            return res.status(401).json({
                msg: 'token no valido, intenta nuevamente'
            });
        }

        // pasar la data 
        req.usuarioId = data;
        next();
        
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido'})
    }

}

module.exports = {
    validarJWT
}