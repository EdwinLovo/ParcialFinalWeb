const mongoose = require('mongoose');

var bebidaSchema = new mongoose.Schema({
    marca: String,
    tipo: String,
    anios: String
});

module.exports = mongoose.model('bebidas', bebidaSchema);