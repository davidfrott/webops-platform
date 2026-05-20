const mongoose = require('mongoose');

const EquipeSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    integrantes: { type: String, required: true },
    portaHost: { type: Number, required: true, unique: true },
    repoGithub: { type: String, required: true },
    dominio: { type: String, required: true },
    containerId: { type: String, default: '' }, 
    status: { type: String, default: 'Building...' },
    ultimaVerificacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Equipe', EquipeSchema);