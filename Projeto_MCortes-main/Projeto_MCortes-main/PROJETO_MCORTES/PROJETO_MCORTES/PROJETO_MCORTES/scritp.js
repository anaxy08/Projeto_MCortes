document.getElementById("formAgendamento").addEventListener("submit", function (event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let telefone = document.getElementById("telefone").value;
    let servico = document.getElementById("servico").value;
    let horario = document.getElementById("horario").value;

    if (!nome || !telefone || !servico || !horario) {
        alert("Preencha todos os campos!");
        return;
    }

    let agendamento = { nome, telefone, servico, horario };

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
    document.getElementById("formAgendamento").reset();
});

// Função para carregar avaliações salvas
function carregarAvaliacoes() {
    let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
    let listaAvaliacoes = document.getElementById("listaAvaliacoes");
    listaAvaliacoes.innerHTML = "";

    avaliacoes.forEach(avaliacao => {
        let div = document.createElement("div");
        div.classList.add("col-md-4", "mb-3");
        div.innerHTML = `
            <div class="card bg-secondary text-white p-3">
                <h5 class="fw-bold">${avaliacao.nome}</h5>
                <p>${avaliacao.comentario}</p>
            </div>
        `;
        listaAvaliacoes.appendChild(div);
    });
}

// Função para adicionar uma nova avaliação
function adicionarAvaliacao() {
    let nome = document.getElementById("nomeCliente").value;
    let comentario = document.getElementById("comentarioCliente").value;

    if (!nome || !comentario) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
    avaliacoes.push({ nome, comentario });
    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));

    document.getElementById("nomeCliente").value = "";
    document.getElementById("comentarioCliente").value = "";

    carregarAvaliacoes();
}

// Carregar avaliações ao abrir a página
document.addEventListener("DOMContentLoaded", carregarAvaliacoes);

function verificarLogin() {
    let senhaDigitada = document.getElementById("senha").value;
    let senhaCorreta = "1234"; // Defina uma senha fixa por enquanto

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
    window.location.href = "servicos.html"; // ou a página certa do seu projeto
}

  