const Usuario = require("../models/Usuario");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

// Función para crear un usuario
exports.crearUsuario = async (req, res)=> {

    // extraer email y password
    const { email, password } = req.body;
    
    try {
        let usuario = await Usuario.findOne({ email });

        if( usuario ){
            return res.status(400).json({ msg: 'El usuario ya existe' })
        }

        // Crea el nuevo usuario
        usuario = new Usuario(req.body);

        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash( password, salt ),

        // guardar el usuario
        await usuario.save();

        // Generar el token
        const token = await generarJWT( usuario.id )

        // mensaje de confirmación
        res.status(201).json({msg: 'Usuario Creado Correctamente', token });

    } catch (error) {
        console.log(error);
        res.status(400).json({msg: 'Hubo un error'});
    }
}