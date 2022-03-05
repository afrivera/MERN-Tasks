const { Schema, model} = require('mongoose');

const TareaSchema = Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    estado:{
        type: Boolean,
        default: false
    },
    proyecto:{
        type: Schema.Types.ObjectId,
        ref: 'Proyecto'
    },
    creado:{
        type: Date,
        default: Date.now()
    }
});


module.exports = model( 'Tarea', TareaSchema);