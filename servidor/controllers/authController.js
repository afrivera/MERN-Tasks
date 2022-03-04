const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require("../models/Usuario");


exports.autenticarUsuario = async( req, res )=> {

    // extraer email y password
    const { email, password } = req.body;

    try {
        // revisar que el usuario este registrado
        const usuario = await Usuario.findOne({ email });

        if(!usuario ){
            return res. status(400).json({
                msg: 'usuario o password incorrecto'
            });
        }

        // Revisar el password
        const passCorrecto = await bcryptjs.compare( password, usuario.password);
        if( !passCorrecto ){
            return res.status(400).json({
                msg: 'usuario o password incorrecto'
            });
        }

        // si todo es correcto crear jwt
        const token = await generarJWT( usuario.id );

        res.json({
            estado: true,
            token
        })        
        
    } catch (error) {
        console.log(error);
    }

}