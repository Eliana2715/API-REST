const { Schema, model } = require('mongoose');

const MediaSchema = Schema({
    serial: { type: String, unique: true },
    titulo: { type: String, },
    sinopsis: { type: String, },
    url_pelicula: { type: String, unique: true },
    image: { type: String, },
    createdAt: { type: Date, required: true }, //fecha de creacion
    updatedAt: { type: Date, required: true }, // fecha de actualizacion
    año_estreno: { type: Number, },
    genero: { type: Schema.Types.ObjectId, ref: 'Genero', required: true },
    director: { type: Schema.Types.ObjectId, ref: 'Director', required: true },
    productora: { type: Schema.Types.ObjectId, ref: 'Productora', required: true },
    tipo: { type: Schema.Types.ObjectId, ref: 'Tipo', required: true },
  });

module.exports = model('Media', MediaSchema);