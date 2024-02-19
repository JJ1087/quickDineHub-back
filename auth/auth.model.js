const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//especificaciones de tipo de datos
const userSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true //gmail solo puede pertenecer a un usuario
    },
    contraseña: {
        type: String,
        required: true,
        trim: true//sin espacios en blanco
    },
    telefono: {
        type: Number,
        required: true,
        trim: true//sin espacios en blanco
    },
    edad: {
        type: Number,
        required: true,
        // trim: true//sin espacios en blanco
    }
},{
    timestamps: true //guardar fecha de creacion y actualizacion de cuentas de usuario "NO REPUDIO"

});

module.exports = mongoose.model('comensales', userSchema)