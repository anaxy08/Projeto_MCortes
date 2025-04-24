// Verificar se o barbeiro está logado ao acessar o painel
function verificarAcessoPainel() {
    if (localStorage.getItem("acesso") !== "permitido") {
        alert("Acesso negado! Faça login primeiro.");
        window.location.href = "login.html";
    }
}

// Carregar agendamentos no painel do barbeiro
function carregarAgendamentos() {
    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    let tabela = document.getElementById("tabelaAgendamentos");
    tabela.innerHTML = "";

    agendamentos.forEach((agendamento, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${agendamento.nome}</td>
            <td>${agendamento.telefone}</td>
            <td>${agendamento.servico}</td>
            <td>${new Date(agendamento.horario).toLocaleString("pt-BR")}</td>
            <td><button class="btn btn-danger" onclick="excluirAgendamento(${index})">Excluir</button></td>
        `;
        tabela.appendChild(row);
    });
}

// Excluir um agendamento
function excluirAgendamento(index) {
    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentos.splice(index, 1);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
    carregarAgendamentos();
}

// Logout do barbeiro
function logout() {
    localStorage.removeItem("acesso");
    window.location.href = "login.html";
}

// Mostrar tela de cadastro de senha
function mostrarCadastro() {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("cadastro-box").style.display = "block";
}

// Mostrar tela de login
function mostrarLogin() {
    document.getElementById("cadastro-box").style.display = "none";
    document.getElementById("login-box").style.display = "block";
}

// Cadastrar nova senha
function cadastrarSenha() {
    let novaSenha = document.getElementById("novaSenha").value;

    if (!novaSenha) {
        alert("Digite uma senha válida!");
        return;
    }

    localStorage.setItem("senhaBarbeiro", novaSenha);
    alert("Senha cadastrada com sucesso!");
    mostrarLogin();
}

// Verificar login com senha armazenada
function verificarLogin() {
    let senhaDigitada = document.getElementById("senha").value;
    let senhaSalva = localStorage.getItem("senhaBarbeiro");

    if (!senhaSalva) {
        alert("Nenhuma senha cadastrada. Cadastre uma senha primeiro.");
        return;
    }

    if (senhaDigitada === senhaSalva) {
        localStorage.setItem("acesso", "permitido");
        window.location.href = "painel.html";
    } else {
        alert("Senha incorreta! Tente novamente.");
    }
}

// Filtrar agendamentos por data e serviço
function filtrarAgendamentos() {
    let dataFiltro = document.getElementById("filtroData").value;
    let servicoFiltro = document.getElementById("filtroServico").value;

    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    let tabela = document.getElementById("tabelaAgendamentos");
    tabela.innerHTML = "";

    let agendamentosFiltrados = agendamentos.filter(agendamento => {
        let dataAgendamento = new Date(agendamento.horario).toISOString().split("T")[0];
        return (!dataFiltro || dataAgendamento === dataFiltro) &&
               (!servicoFiltro || agendamento.servico === servicoFiltro);
    });

    agendamentosFiltrados.forEach((agendamento, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${agendamento.nome}</td>
            <td>${agendamento.telefone}</td>
            <td>${agendamento.servico}</td>
            <td>${new Date(agendamento.horario).toLocaleString("pt-BR")}</td>
            <td><button class="btn btn-danger" onclick="excluirAgendamento(${index})">Excluir</button></td>
        `;
        tabela.appendChild(row);
    });
}

// Carregar agendamentos no painel do barbeiro
function carregarAgendamentos() {
    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    let tabela = document.getElementById("tabelaAgendamentos");
    tabela.innerHTML = "";

    agendamentos.forEach((agendamento, index) => {
        let statusCor = agendamento.status === "Confirmado" ? "🟢" :
                        agendamento.status === "Cancelado" ? "🔴" : "🔵";

        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${agendamento.nome}</td>
        <td>${agendamento.telefone}</td>
        <td>${agendamento.servico}</td>
        <td>${new Date(agendamento.horario).toLocaleString("pt-BR")}</td>
        <td>${statusCor} ${agendamento.status || "Pendente"}</td>
        <td>
            <button class="btn btn-success btn-sm" onclick="alterarStatus(${index}, 'Confirmado'); enviarWhatsApp(${index}, 'Confirmado')">Confirmar</button>
            <button class="btn btn-danger btn-sm" onclick="alterarStatus(${index}, 'Cancelado'); enviarWhatsApp(${index}, 'Cancelado')">Cancelar</button>
            <button class="btn btn-warning btn-sm" onclick="excluirAgendamento(${index})">Excluir</button>
        </td>
    `;
        tabela.appendChild(row);
    });
}

// Alterar status do agendamento
function alterarStatus(index, novoStatus) {
    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentos[index].status = novoStatus;
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
    carregarAgendamentos();
}

// Excluir um agendamento
function excluirAgendamento(index) {
    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentos.splice(index, 1);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
    carregarAgendamentos();
}

// Enviar notificação via WhatsApp
function enviarWhatsApp(index, status) {
    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    let agendamento = agendamentos[index];

    let numeroCliente = agendamento.telefone.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (!numeroCliente.startsWith("55")) {
        numeroCliente = "55" + numeroCliente; // Adiciona código do Brasil, se necessário
    }

    let mensagem = `Olá, ${agendamento.nome}! Seu agendamento para ${agendamento.servico} no dia ${new Date(agendamento.horario).toLocaleString("pt-BR")} foi *${status}*! 🚀`;

    let linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroCliente}&text=${encodeURIComponent(mensagem)}`;

    window.open(linkWhatsApp, "_blank"); // Abre o WhatsApp em nova aba
}