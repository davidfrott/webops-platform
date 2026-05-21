const axios = require("axios");
const Equipe = require("../models/Equipe");

const INTERVALO_PADRAO_MS = 30000;
const TIMEOUT_PADRAO_MS = 5000;

const intervaloHealthCheck =
  Number(process.env.HEALTH_CHECK_INTERVAL_MS) || INTERVALO_PADRAO_MS;
const timeoutHealthCheck =
  Number(process.env.HEALTH_CHECK_TIMEOUT_MS) || TIMEOUT_PADRAO_MS;

let intervaloAtivo = null;
let verificacaoEmAndamento = false;

function montarUrlHealthCheck(equipe) {
  const dominio = String(equipe.dominio || "").trim();

  if (dominio) {
    return /^https?:\/\//i.test(dominio) ? dominio : `http://${dominio}`;
  }

  return `http://localhost:${equipe.portaHost}`;
}

async function atualizarStatusEquipe(equipe, novoStatus) {
  const atualizacao = {
    status: novoStatus,
    ultimaVerificacao: new Date(),
  };

  if (equipe.status === novoStatus) {
    await Equipe.findByIdAndUpdate(equipe._id, {
      ultimaVerificacao: atualizacao.ultimaVerificacao,
    });
    return false;
  }

  await Equipe.findByIdAndUpdate(equipe._id, atualizacao);
  return true;
}

async function executarHealthCheck(io) {
  if (verificacaoEmAndamento) {
    return;
  }

  verificacaoEmAndamento = true;

  try {
    const equipes = await Equipe.find({ status: { $ne: "Building..." } });
    let houveMudanca = false;

    for (const equipe of equipes) {
      const url = montarUrlHealthCheck(equipe);

      try {
        await axios.get(url, {
          timeout: timeoutHealthCheck,
          validateStatus: (status) => status < 500,
        });

        const mudouParaOnline = await atualizarStatusEquipe(equipe, "Online");
        houveMudanca = houveMudanca || mudouParaOnline;
      } catch (erroPing) {
        console.log(
          `Health Check: equipe "${equipe.nome}" nao respondeu em ${url}.`,
        );

        const mudouParaOffline = await atualizarStatusEquipe(equipe, "Offline");
        houveMudanca = houveMudanca || mudouParaOffline;
      }
    }

    if (houveMudanca && io) {
      const listaAtualizada = await Equipe.find();
      io.emit("status_atualizado", listaAtualizada);
    }
  } catch (error) {
    console.error("Erro ao executar Health Check:", error.message);
  } finally {
    verificacaoEmAndamento = false;
  }
}

function iniciarHealthCheck(io) {
  if (intervaloAtivo) {
    return intervaloAtivo;
  }

  executarHealthCheck(io);
  intervaloAtivo = setInterval(
    () => executarHealthCheck(io),
    intervaloHealthCheck,
  );

  console.log(
    `Health Check preventivo iniciado a cada ${intervaloHealthCheck / 1000}s.`,
  );
  return intervaloAtivo;
}

module.exports = {
  executarHealthCheck,
  iniciarHealthCheck,
};
