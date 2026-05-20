# WebOps Platform - Gerenciador de Deploys & Monitoramento

Uma plataforma completa de **WebOps** desenvolvida para automatizar a hospedagem, o build e o monitoramento em tempo real de containers Docker para projetos escolares/académicos na infraestrutura Oracle Cloud.

## Funcionalidades Principais

- **Automação Git:** O sistema aceita o link de um repositório GitHub e realiza o `git clone` automático no servidor local em `/var/www/`.
- **Orquestração Docker:** Build automatizado de imagens customizadas e inicialização de containers isolados por porta utilizando a biblioteca **Dockerode**.
- **Health Check Contínuo:** Verificação em background (via **Axios**) a cada 30 segundos para checar a saúde das aplicações das equipes.
- **Visualização de Logs:** Endpoint integrado para capturar logs de erro diretamente dos containers sem precisar de acesso SSH.

## Tecnologias Utilizadas

- **Front-end:** React, Tailwind CSS, Lucide React
- **Back-end:** Node.js, Express, Dockerode, Axios, Morgan
- **Banco de Dados:** MongoDB (via Mongoose)
- **Infraestrutura:** Docker, Linux Ubuntu, Oracle Cloud, sslip.io

## Estrutura do Projeto

```text
webops-platform/
├── backend/          # API Node.js, Rotas do Dockerode e Modelos do MongoDB
├── frontend/         # Interface React com o Dashboard de monitoramento
├── .gitignore        # Arquivos ignorados pelo Git
└── README.md         # Documentação oficial do projeto
