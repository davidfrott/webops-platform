const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const Docker = require('dockerode');
const Equipe = require('../models/Equipe');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

router.get('/', async (req, res) => {
    try {
        const equipes = await Equipe.find();
        res.json(equipes);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar equipes.' });
    }
});

router.post('/', async (req, res) => {
    const { nome, integrantes, portaHost, repoGithub } = req.body;
    const ipServidor = '137.131.172.170'; 
    const dominioGerado = `app-${portaHost}.${ipServidor}.sslip.io`; 
    try {
        const portaExiste = await Equipe.findOne({ portaHost });
        if (portaExiste) return res.status(400).json({ erro: 'Esta porta de host já está ocupada.' });

        const novaEquipe = new Equipe({
            nome, integrantes, portaHost, repoGithub, dominio: dominioGerado, status: 'Building...'
        });
        await novaEquipe.save();

        res.status(201).json({ mensagem: 'Cadastro realizado. Deploy iniciado em segundo plano.', equipe: novaEquipe });

        const nomePasta = nome.toLowerCase().replace(/\s+/g, '-');
        const pastaDestino = path.join('/var/www', nomePasta);

        if (fs.existsSync(pastaDestino)) fs.rmSync(pastaDestino, { recursive: true, force: true });

        exec(`git clone ${repoGithub} ${pastaDestino}`, async (erroClone) => {
            if (erroClone) {
                await Equipe.findByIdAndUpdate(novaEquipe._id, { status: 'Offline' });
                return;
            }

            const nomeImagem = `img-${nomePasta}`;
            docker.buildImage({
                context: pastaDestino,
                src: ['Dockerfile', 'package.json', 'server.js', 'index.js']
            }, { t: nomeImagem }, async (erroBuild, stream) => {
                if (erroBuild) {
                    await Equipe.findByIdAndUpdate(novaEquipe._id, { status: 'Offline' });
                    return;
                }

                docker.modem.followProgress(stream, async (erroProgress) => {
                    if (erroProgress) {
                        await Equipe.findByIdAndUpdate(novaEquipe._id, { status: 'Offline' });
                        return;
                    }

                    try {
                        const container = await docker.createContainer({
                            Image: nomeImagem,
                            name: `container-${nomePasta}`,
                            ExposedPorts: { '3000/tcp': {} }, 
                            HostConfig: {
                                PortBindings: { '3000/tcp': [{ HostPort: portaHost.toString() }] },
                                RestartPolicy: { Name: 'always' }
                            }
                        });

                        await container.start();
                        
                        await Equipe.findByIdAndUpdate(novaEquipe._id, { 
                            status: 'Online',
                            containerId: container.id 
                        });
                    } catch (erroContainer) {
                        await Equipe.findByIdAndUpdate(novaEquipe._id, { status: 'Offline' });
                    }
                });
            });
        });

    } catch (error) {
        res.status(500).json({ erro: 'Erro interno ao processar cadastro.' });
    }
});

router.put('/:id', async (req, res) => {
    const { nome, integrantes, repoGithub } = req.body;
    try {
        const equipeAtualizada = await Equipe.findByIdAndUpdate(
            req.params.id, 
            { nome, integrantes, repoGithub }, 
            { new: true }
        );
        if (!equipeAtualizada) return res.status(404).json({ erro: 'Equipe não encontrada.' });
        res.json({ mensagem: 'Dados atualizados com sucesso!', equipe: equipeAtualizada });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar equipe.' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const equipe = await Equipe.findById(req.params.id);
        if (!equipe) return res.status(404).json({ erro: 'Equipe não encontrada.' });

        const nomePasta = equipe.nome.toLowerCase().replace(/\s+/g, '-');
        const pastaDestino = path.join('/var/www', nomePasta);

        if (equipe.containerId) {
            try {
                const container = docker.getContainer(equipe.containerId);
                await container.stop();
                await container.remove();
            } catch (e) { console.log('Container não estava rodando ou já foi removido manualmente.'); }
        }

        if (fs.existsSync(pastaDestino)) fs.rmSync(pastaDestino, { recursive: true, force: true });

        await Equipe.findByIdAndDelete(req.params.id);
        res.json({ mensagem: 'Equipe, pasta e container deletados com sucesso!' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao excluir equipe do sistema.' });
    }
});

router.get('/:id/logs', async (req, res) => {
    try {
        const equipe = await Equipe.findById(req.params.id);
        if (!equipe || !equipe.containerId) return res.status(404).json({ erro: 'Logs indisponíveis ou container não criado.' });

        const container = docker.getContainer(equipe.containerId);
        
        container.logs({
            stdout: true,
            stderr: true,
            tail: 100, 
            timestamps: true
        }, (err, buffer) => {
            if (err) return res.status(500).json({ erro: 'Erro ao extrair logs do Docker.' });
            
            res.json({ logs: buffer.toString('utf8') });
        });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao processar logs.' });
    }
});

module.exports = router;