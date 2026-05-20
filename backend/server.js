const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan'); 
const axios = require('axios'); 
const equipeRoutes = require('./routes/equipeRoutes');
const Equipe = require('./models/Equipe');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev')); 

const MONGO_URI = 'mongodb://localhost:27017/webops_platform';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Conectado com Sucesso!'))
    .catch(err => console.error('Erro de conexão com MongoDB:', err));

app.use('/api/equipes', equipeRoutes);

const executarHealthCheck = async () => {
    console.log('Executando varredura preventiva de Health Check nos containers...');
    try {
        const equipes = await Equipe.find({ status: { $ne: 'Building...' } }); 

        for (const equipe of equipes) {
            try {
                const resposta = await axios.get(`http://${equipe.dominio}`, { timeout: 5000 });
                
                if (resposta.status >= 200 && resposta.status < 400) {
                    if (equipe.status !== 'Online') {
                        await Equipe.findByIdAndUpdate(equipe._id, { status: 'Online', ultimaVerificacao: new Date() });
                    }
                }
            } catch (erroPing) {
                if (equipe.status !== 'Offline') {
                    console.log(`Alerta: O container da equipe [${equipe.nome}] parou de responder.`);
                    await Equipe.findByIdAndUpdate(equipe._id, { status: 'Offline', ultimaVerificacao: new Date() });
                }
            }
        }
    } catch (err) {
        console.error('Erro ao rodar rotina de monitoramento:', err);
    }
};

setInterval(executarHealthCheck, 30000);

app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});