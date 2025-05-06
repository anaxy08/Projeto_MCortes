document.addEventListener('DOMContentLoaded', () => {
    const formAgendamento = document.getElementById('formAgendamento');
    if (formAgendamento) {
        formAgendamento.addEventListener('submit', agendarServico);
    }

    carregarAvaliacoes();
});

function agendarServico(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const servico = document.getElementById('servico').value;
    const horario = document.getElementById('horario').value;

    if (!nome || !telefone || !servico || !horario) {
        alert("Preencha todos os campos!");
        return;
    }

    const agendamento = { nome, telefone, servico, horario };

    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentos.push(agendamento);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    // Formatar horário para exibição
    let horarioFormatado = new Date(horario).toLocaleString("pt-BR");

    // Criar mensagem para WhatsApp
    let mensagem = `Olá, ${nome}! Seu agendamento foi confirmado na nossa barbearia. \n\n📌 Tipo do Serviço: ${servico} \n🕒 Horário:  ${horarioFormatado} \n📞 Contato:  ${telefone} \n\nAguardamos você! ✂️🔥`;
    let linkWhatsApp = `https://api.whatsapp.com/send?phone=+55${telefone.replace(/\D/g, '')}&text=${encodeURIComponent(mensagem)}`;

    alert("Agendamento confirmado! Você será redirecionado para o WhatsApp.");
    window.open(linkWhatsApp, "_blank");

    // Resetar formulário
    formAgendamento.reset();
}

function formatarDataHora(dataHoraString) {
    const dataHora = new Date(dataHoraString);
    const dia = dataHora.getDate().toString().padStart(2, '0');
    const mes = (dataHora.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataHora.getFullYear();
    const hora = dataHora.getHours().toString().padStart(2, '0');
    const minuto = dataHora.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
}

function adicionarAvaliacao() {
    const nomeClienteInput = document.getElementById('nomeCliente');
    const comentarioClienteInput = document.getElementById('comentarioCliente');
    const listaAvaliacoesDiv = document.getElementById('listaAvaliacoes');

    const nome = nomeClienteInput.value.trim();
    const comentario = comentarioClienteInput.value.trim();

    if (!nome || !comentario) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const avaliacao = { nome, comentario };

    let avaliacoes = localStorage.getItem('avaliacoes');
    avaliacoes = avaliacoes ? JSON.parse(avaliacoes) : [];
    avaliacoes.push(avaliacao);
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));

    // Adicionar avaliação visualmente
    const avaliacaoDiv = document.createElement('div');
    avaliacaoDiv.classList.add('avaliacao-card', 'mb-3', 'p-3', 'bg-secondary', 'rounded');
    avaliacaoDiv.innerHTML = `
        <h4>${nome}</h4>
        <p>${comentario}</p>
    `;
    listaAvaliacoesDiv.appendChild(avaliacaoDiv);

    // Limpar campos do formulário
    nomeClienteInput.value = '';
    comentarioClienteInput.value = '';
}

function carregarAvaliacoes() {
    const listaAvaliacoesDiv = document.getElementById('listaAvaliacoes');
    const avaliacoesSalvas = localStorage.getItem('avaliacoes');

    if (avaliacoesSalvas) {
        const avaliacoes = JSON.parse(avaliacoesSalvas);
        avaliacoes.forEach(avaliacao => {
            const avaliacaoDiv = document.createElement('div');
            avaliacaoDiv.classList.add('avaliacao-card', 'mb-3', 'p-3', 'bg-secondary', 'rounded');
            avaliacaoDiv.innerHTML = `
                <h4>${avaliacao.nome}</h4>
                <p>${avaliacao.comentario}</p>
            `;
            listaAvaliacoesDiv.appendChild(avaliacaoDiv);
        });
    }
}

function verificarLogin() {
    let senhaDigitada = document.getElementById("senha").value;
    let senhaCorreta = "1234"; //senha fixa por enquanto

    if (senhaDigitada === senhaCorreta) {
        localStorage.setItem("acesso", "permitido");
        window.location.href = "painel.html"; // Redireciona para o painel do barbeiro
    } else {
        alert("Senha incorreta! Tente novamente.");
    }
}
// Remove os agendamentos
function removerAgendamento(nome, data, hora) {
    if (!confirm(`Deseja cancelar o agendamento de ${nome} às ${hora}?`)) return;

    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentos = agendamentos.filter(a => !(a.nome === nome && a.data === data && a.hora === hora));
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
    carregarAgendamentosDoDia(data);
}
//Ir para Serviços
function irParaServicos() {
    window.location.href = "servicos.html";
}