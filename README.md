# Projeto_MCortes

<body>
  <section> 
    <form> 
      <h1>Login</h1>
        <div class = "inputbox">
          <ion-icon name = "mail-ontline"></ion-icon> 
          <input type = "email " required> 
          <label for = "">Usuário</label>
        </div>
      <div class = "inputbox">
        <ion-icon name = "lock-clased-outline"></ion-icon>
        <input type = "password" required>
        <label for = "">Senha</label> 
      </div>
      <div classa = "forget">
        <label for = ""><input type = "checkbox">Rebember</label>
        <a href = "#">Forgot Password</a>
      </div>
      <button>Login</button>
      <div class = "register">
        <p>Criar usuário<a href = "#">Register</a></p>
      </div>
    </form>
  </section>
</body>

*{
margin: 0;
padding: 0;
box-sizing: border box;
font-family: 'popping', sans-serif;
}
body{
display: flex;
aling-items: center;
justtify-content: center; 
min-height: 100vh;
background-image: url("img-jpg") (adicionar IMAGEM)
background-repeat: no-repeat;
background-position: center; 
background-size: cover;
}


salvar dados de serviços para todos os usuarios online, assim, todos tendo acesso as atualização feita falta, sem perder os dados salvos 
mexer com arquivo servicos.html e pailn.html 
resaltar as escritas e ajustes, implementar as integracoes em admin, assim tendo acesso rapido a todas as páginas 
incluir em index um formulario onde o cliente vai ter o obsção de escolher o barbeiro de preferencia, assim logo crinado "QUEM SOMOS ", apresentando todos os funcionarios a baixo

planos: criar campo onde clientes que busca emprego, acessar menu e "TRABALHE CONOSCO", verificando servicos disponiveis e enviar currículo direto para o dono da barbearia 
o diminuir formulario de "enviar mensagem" melhorar visualmente, melhorar o formulario de agendamento (calendario, bloando dias indisponiveis, horarios disponivel para atendimento) 





ATUALIZAR (SERVICOS.HTML)

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Gerenciar Serviços</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"/>
  <style>
    body {
      background-color: #121212;
      color: white;
    }
    .navbar {
      background-color: #1f1f1f;
      border-bottom: 1px solid #ffc107;
    }
    .card {
      background-color: #1e1e1e;
      border: 1px solid #333;
    }
    .form-label {
      color: #fff;
    }
  </style>
</head>
<body>
  <nav class="navbar navbar-dark px-4">
    <span class="navbar-brand mb-0 h1">Serviços da Barbearia</span>
    <button class="btn btn-outline-warning" onclick="voltar()">Voltar</button>
  </nav>

  <div class="container my-4">
    <div class="row g-4">
      <!-- Lista de Serviços -->
      <div class="col-md-6">
        <div class="card p-3">
          <h5>Serviços Cadastrados</h5>
          <ul id="lista-servicos" class="list-group mt-2"></ul>
          <button class="btn btn-outline-danger mt-3 w-100" onclick="limparServicos()">Limpar Todos</button>
        </div>
      </div>

      <!-- Formulário de Cadastro -->
      <div class="col-md-6">
        <div class="card p-3">
          <h5 id="form-title">Novo Serviço</h5>
          <form id="form-servico" class="mt-3">
            <div class="mb-3">
              <label for="nome" class="form-label">Nome do Serviço</label>
              <input type="text" id="nome" class="form-control" required>
            </div>
            <div class="mb-3">
              <label for="duracao" class="form-label">Duração (minutos)</label>
              <input type="number" id="duracao" class="form-control" required min="5" max="180" placeholder="Ex: 30">
            </div>
            <input type="hidden" id="editando-index">
            <button type="submit" class="btn btn-warning w-100">Salvar Serviço</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <script>
    function voltar() {
      window.location.href = "painel.html"; // ou a página principal do painel
    }

    function carregarServicos() {
      const lista = document.getElementById("lista-servicos");
      const servicos = JSON.parse(localStorage.getItem("servicos")) || [];

      lista.innerHTML = "";

      if (servicos.length === 0) {
        lista.innerHTML = `<li class="list-group-item bg-dark text-white">Nenhum serviço cadastrado.</li>`;
        return;
      }

      servicos.sort((a, b) => a.nome.localeCompare(b.nome));

      servicos.forEach((s, i) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center bg-dark text-white";
        li.innerHTML = `
          <span>${s.nome} (${s.duracao} min)</span>
          <div>
            <button class="btn btn-sm btn-outline-warning me-2" aria-label="Editar serviço" onclick="editarServico(${i})">✏️</button>
            <button class="btn btn-sm btn-outline-danger" aria-label="Remover serviço" onclick="removerServico(${i})">🗑️</button>
          </div>
        `;
        lista.appendChild(li);
      });
    }

    function salvarServico(e) {
      e.preventDefault();
      const nome = document.getElementById("nome").value.trim();
      const duracao = parseInt(document.getElementById("duracao").value);
      const index = document.getElementById("editando-index").value;

      let servicos = JSON.parse(localStorage.getItem("servicos")) || [];

      if (index === "") {
        // Evitar duplicatas
        if (servicos.some(s => s.nome.toLowerCase() === nome.toLowerCase())) {
          alert("Este serviço já está cadastrado.");
          return;
        }
        servicos.push({ nome, duracao });
        mostrarMensagem("Serviço adicionado com sucesso!");
      } else {
        servicos[index] = { nome, duracao };
        document.getElementById("form-title").textContent = "Novo Serviço";
        document.getElementById("editando-index").value = "";
        mostrarMensagem("Serviço editado com sucesso!");
      }

      localStorage.setItem("servicos", JSON.stringify(servicos));
      document.getElementById("form-servico").reset();
      carregarServicos();
    }

    function editarServico(index) {
      const servicos = JSON.parse(localStorage.getItem("servicos")) || [];
      const servico = servicos[index];
      document.getElementById("nome").value = servico.nome;
      document.getElementById("duracao").value = servico.duracao;
      document.getElementById("editando-index").value = index;
      document.getElementById("form-title").textContent = "Editar Serviço";
    }

    function removerServico(index) {
      if (!confirm("Deseja remover este serviço?")) return;
      let servicos = JSON.parse(localStorage.getItem("servicos")) || [];
      servicos.splice(index, 1);
      localStorage.setItem("servicos", JSON.stringify(servicos));
      carregarServicos();
    }

    function limparServicos() {
      if (confirm("Deseja remover todos os serviços?")) {
        localStorage.removeItem("servicos");
        carregarServicos();
      }
    }

    function mostrarMensagem(msg, tipo = "success") {
      const div = document.createElement("div");
      div.className = `alert alert-${tipo} mt-3`;
      div.textContent = msg;
      document.querySelector(".card form").appendChild(div);
      setTimeout(() => div.remove(), 3000);
    }

    document.getElementById("form-servico").addEventListener("submit", salvarServico);
    carregarServicos();
  </script>
</body>
</html>
