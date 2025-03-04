const { Schema, model } = require('mongoose');

const GeneroSchema = Schema({
    name: { type: String, required: true },
    state: { type: String, required: true, enum: [ 'Activo', 'Inactivo' ]},
    createdAt: { type: Date, required: true }, //fecha de creacion
    updatedAt: { type: Date, required: true }, // fecha de actualizacion
    description: { type: String, required: true }
});

module.exports = model('Genero', GeneroSchema);