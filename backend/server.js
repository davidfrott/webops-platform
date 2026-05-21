const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const axios = require('axios');
const http = require('http'); 
const { Server } = require('socket.io'); 

const equipeRoutes = require('./routes/equipeRoutes');
const Equipe = require('./models/Equipe');

const app = express();
const PORT = 3000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    req.io = io;
    next();
});

const MONGO_URI = 'mongodb://localhost:27017/webops_platform';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Conectado com Sucesso!'))
    .catch(err => console.error('Erro de conexão com MongoDB:', err));

app.use('/api/equipes', equipeRoutes);

io.on('connection', (socket) => {
    console.log(`Conectado ao WebSocket: ${socket.id}`);

    socket.on('pedir_atualizacao', async () => {
        const equipes = await Equipe.find();
        socket.emit('status_atualizado', equipes);
    });

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado do WebSocket: ${socket.id}`);
    });
});

const executarHealthCheck = async () => {
    console.log('Executando varredura preventiva de Health Check nos containers...');
    try {
        const equipes = await Equipe.find({ status: { $ne: 'Building...' } });
        let houveMudanca = false;

        for (const equipe of equipes) {
            try {
                const resposta = await axios.get(`http://${equipe.dominio}`, { timeout: 5000 });
                
                if (resposta.status >= 200 && resposta.status < 400) {
                    if (equipe.status !== 'Online') {
                        await Equipe.findByIdAndUpdate(equipe._id, { status: 'Online', ultimaVerificacao: new Date() });
                        houveMudanca = true;
                    }
                }
            } catch (erroPing) {
                if (equipe.status !== 'Offline') {
                    console.log(`Alerta: O container da equipe [${equipe.nome}] parou de responder.`);
                    await Equipe.findByIdAndUpdate(equipe._id, { status: 'Offline', ultimaVerificacao: new Date() });
                    houveMudanca = true;
                }
            }
        }

        if (houveMudanca) {
            console.log('Alteração de status detectada! Enviando dados atualizados via WebSocket...');
            const listaAtualizada = await Equipe.find();
            io.emit('status_atualizado', listaAtualizada); 
        }

    } catch (err) {
        console.error('Erro ao rodar rotina de monitoramento:', err);
    }
};

setInterval(executarHealthCheck, 30000);

server.listen(PORT, () => {
    console.log(`rodando na porta ${PORT}`);
});