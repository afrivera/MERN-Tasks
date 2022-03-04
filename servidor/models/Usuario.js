const {Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        require: true,
        trim: true // elimina los espacios 
    },
    email:{
        type: String,
        require: true,
        trim: true,
        unique: true //el correo será unico 
    },
    password:{
        type: String,
        require: true,
        trim: true
    },
    registro:{
        type: Date,
        default: Date.now()
    }
});


module.exports = model( 'Usuario', UsuarioSchema);