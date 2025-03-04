const { Schema, model } = require('mongoose');

const TipoSchema = Schema({
    name: { type: String, required: true }, 
    createdAt: { type: Date, required: true }, //fecha de creacion
    updatedAt: { type: Date, required: true }, // fecha de actualizacion
    description: { type: String, required: true }
});

module.exports = model('Tipo', TipoSchema);