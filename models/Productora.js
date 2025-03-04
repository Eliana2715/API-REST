const { Schema, model } = require('mongoose');

const ProductoraSchema = Schema({
    name_Producer: { type: String, required: true }, // nombre de la productora
    state: { type: String, required: true, enum: [ 'Activo', 'Inactivo' ]},
    createdAt: { type: Date, required: true }, //fecha de creacion
    updatedAt: { type: Date, required: true }, // fecha de actualizacion
    slogan: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = model('Productora', ProductoraSchema);