const { Schema, model } = require('mongoose');

const DirectorSchema = Schema({
    name: { type: String, required: true },
    state: { type: String, required: true, enum: [ 'Activo', 'Inactivo' ]},
    createdAt: { type: Date, required: true }, //fecha de creacion
    updatedAt: { type: Date, required: true } // fecha de actualizacion
});

module.exports = model('Director', DirectorSchema);