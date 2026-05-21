const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const http = require('http'); 
const { Server } = require('socket.io'); 

const equipeRoutes = require('./routes/equipeRoutes');
const Equipe = require('./models/Equipe');
const { iniciarHealthCheck } = require('./services/healthCheckService');

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
    .then(() => {
        console.log('MongoDB Conectado com Sucesso!');
        iniciarHealthCheck(io);
    })
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

server.listen(PORT, () => {
    console.log(`rodando na porta ${PORT}`);
});
