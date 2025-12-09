const API_URL = "http://localhost:8080/pontos-acessibilidade";
 
const form = document.getElementById("ponto-form");
const formTitle = document.getElementById("form-title");
const statusMessage = document.getElementById("status-message");
 
const inputId = document.getElementById("ponto-id");
const inputBuscaNome = document.getElementById("ponto-nome-busca");
 
const inputNomeLocal = document.getElementById("nomeLocal");
const inputEndereco = document.getElementById("endereco");
const inputTipoLocal = document.getElementById("tipoLocal");
 
const checkTemRampa = document.getElementById("temRampa");
const checkTemBanheiroAdaptado = document.getElementById("temBanheiroAdaptado");
const checkTemVagaPCD = document.getElementById("temVagaPCD");
const checkPossuiObstaculos = document.getElementById("possuiObstaculos");
 
const selectAcessibilidadeGeral = document.getElementById("acessibilidadeGeral");
const textDescricao = document.getElementById("descricao");
 
const btnSairFiltro = document.getElementById("btn-sair-filtro");
const btnLimpar = document.getElementById("btn-limpar");
const btnBuscarNome = document.getElementById("btn-buscar-nome");
const tbody = document.getElementById("pontos-tbody");
 
function setStatusMessage(msg) {
  statusMessage.textContent = msg;
}
 
function limparFormulario() {
  inputId.value = "";
  inputNomeLocal.value = "";
  inputEndereco.value = "";
  inputTipoLocal.value = "";
 
  checkTemRampa.checked = false;
  checkTemBanheiroAdaptado.checked = false;
  checkTemVagaPCD.checked = false;
  checkPossuiObstaculos.checked = false;
 
  selectAcessibilidadeGeral.value = "";
  textDescricao.value = "";
 
  formTitle.textContent = "Novo ponto de acessibilidade";
  setStatusMessage("");
}
 
function preencherFormulario(ponto) {
  inputId.value = ponto.id || "";
  inputNomeLocal.value = ponto.nomeLocal || "";
  inputEndereco.value = ponto.endereco || "";
  inputTipoLocal.value = ponto.tipoLocal || "";
 
  checkTemRampa.checked = !!ponto.temRampa;
  checkTemBanheiroAdaptado.checked = !!ponto.temBanheiroAdaptado;
  checkTemVagaPCD.checked = !!ponto.temVagaPCD;
  checkPossuiObstaculos.checked = !!ponto.possuiObstaculos;
 
  selectAcessibilidadeGeral.value = ponto.acessibilidadeGeral || "";
  textDescricao.value = ponto.descricao || "";
 
  formTitle.textContent = `Editando ponto #${ponto.id}`;
}
 
function criarTagBool(valor) {
  const span = document.createElement("span");
  span.classList.add("tag", "tag-bool");
  if (valor) {
    span.classList.add("tag-yes");
    span.textContent = "Sim";
  } else {
    span.classList.add("tag-no");
    span.textContent = "Não";
  }
  return span;
}
 
function criarTagIndice(indice) {
  const span = document.createElement("span");
  span.classList.add("tag", "tag-indice");
  span.textContent = `${indice} / 100`;
  return span;
}
 
function criarBotao(texto, classe, onClick) {
  const btn = document.createElement("button");
  btn.textContent = texto;
  btn.className = classe;
  btn.type = "button";
  btn.addEventListener("click", onClick);
  return btn;
}
 
function renderizarTabela(pontos) {
  tbody.innerHTML = "";
 
  pontos.forEach((ponto) => {
    const tr = document.createElement("tr");
 
    const tdId = document.createElement("td");
    tdId.textContent = ponto.id;
    tr.appendChild(tdId);
 
    const tdLocal = document.createElement("td");
    tdLocal.innerHTML = `<strong>${ponto.nomeLocal || ""}</strong>`;
    tr.appendChild(tdLocal);

    const tdEndereco = document.createElement("td");
    tdEndereco.textContent = ponto.endereco || "";
    tr.appendChild(tdEndereco);
 
    const tdTipo = document.createElement("td");
    tdTipo.textContent = ponto.tipoLocal || "";
    tr.appendChild(tdTipo);
 
    const tdRecursos = document.createElement("td");
    const recursos = [
      { label: "Rampa", valor: ponto.temRampa },
      { label: "Banheiro", valor: ponto.temBanheiroAdaptado },
      { label: "Vaga PCD", valor: ponto.temVagaPCD },
      { label: "Obstáculos", valor: ponto.possuiObstaculos },
    ];
 
    recursos.forEach((r, index) => {
      const spanLabel = document.createElement("span");
      spanLabel.textContent = `${r.label}: `;
      tdRecursos.appendChild(spanLabel);
      tdRecursos.appendChild(criarTagBool(r.valor));
      if (index < recursos.length - 1) {
        tdRecursos.appendChild(document.createElement("br"));
      }
    });
 
    tr.appendChild(tdRecursos);
 
    const tdIndice = document.createElement("td");
    const indice = typeof ponto.indiceAcessibilidade === "number"
      ? ponto.indiceAcessibilidade
      : 0;
    tdIndice.appendChild(criarTagIndice(indice));
    tr.appendChild(tdIndice);
 
    const tdAcessGeral = document.createElement("td");
    if (ponto.acessibilidadeGeral) {
      const span = document.createElement("span");
      span.classList.add("tag");
      span.textContent = ponto.acessibilidadeGeral;
      tdAcessGeral.appendChild(span);
    } else {
      tdAcessGeral.textContent = "-";
    }
    tr.appendChild(tdAcessGeral);
 
    const tdDesc = document.createElement("td");
    tdDesc.textContent = ponto.descricao || "";
    tr.appendChild(tdDesc);
 
    const tdAcoes = document.createElement("td");
    const btnEditar = criarBotao("Editar", "secondary", () => preencherFormulario(ponto));
    const btnExcluir = criarBotao("Excluir", "danger", () => deletarPonto(ponto.id));
 
    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(document.createTextNode(" "));
    tdAcoes.appendChild(btnExcluir);
    tr.appendChild(tdAcoes);
 
    tbody.appendChild(tr);
  });
}
 
async function carregarPontos() {
  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) {
      throw new Error("Erro ao buscar pontos");
    }
    const lista = await resp.json();
    renderizarTabela(lista);
  } catch (error) {
    console.error(error);
    setStatusMessage("Erro ao carregar pontos de acessibilidade.");
  }
}

async function buscarPontoPorNome() {
  const nome = inputBuscaNome.value.trim();

  if (!nome) {
    setStatusMessage("Digite um nome para buscar.");
    btnSairFiltro.style.display = "none";
    return;
  }

  try {
    const resp = await fetch(`${API_URL}/nome/${encodeURIComponent(nome)}`);

    if (resp.status === 404) {
      setStatusMessage("Nenhum ponto encontrado com esse nome.");
      tbody.innerHTML = "";
      return;
    }

    if (!resp.ok) {
      throw new Error("Erro ao buscar por nome");
    }

    const lista = await resp.json();

    renderizarTabela(lista);

    setStatusMessage(`${lista.length} ponto(s) encontrado(s).`);
    btnSairFiltro.style.display = "inline-block";
  } catch (error) {
    console.error(error);
    setStatusMessage("Erro ao buscar ponto por nome.");
  }
}

btnSairFiltro.addEventListener("click", () => {
  inputBuscaNome.value = "";
  statusMessage.textContent = "";
  btnSairFiltro.style.display = "none";

  carregarPontos();
});


btnBuscarNome.addEventListener("click", buscarPontoPorNome);
 
async function deletarPonto(id) {
  if (!confirm(`Deseja realmente excluir o ponto ${id}?`)) {
    return;
  }
 
  try {
    const resp = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
 
    if (!resp.ok) {
      throw new Error("Erro ao excluir ponto.");
    }
 
    setStatusMessage(`Ponto ${id} excluído com sucesso.`);
    await carregarPontos();
  } catch (error) {
    console.error(error);
    setStatusMessage("Erro ao excluir ponto.");
  }
}
 
async function salvarPonto(event) {
  event.preventDefault();
 
  const id = inputId.value.trim();
 
  const ponto = {
    nomeLocal: inputNomeLocal.value.trim(),
    endereco: inputEndereco.value.trim(),
    tipoLocal: inputTipoLocal.value,
    temRampa: checkTemRampa.checked,
    temBanheiroAdaptado: checkTemBanheiroAdaptado.checked,
    temVagaPCD: checkTemVagaPCD.checked,
    possuiObstaculos: checkPossuiObstaculos.checked,
    acessibilidadeGeral: selectAcessibilidadeGeral.value,
    descricao: textDescricao.value.trim(),
  };
 
  if (!ponto.nomeLocal || !ponto.endereco || !ponto.tipoLocal) {
    setStatusMessage("Preencha pelo menos nome, endereço e tipo do local.");
    return;
  }
 
  const method = id ? "PUT" : "POST";
  const url = id ? `${API_URL}/${id}` : API_URL;
 
  try {
    const resp = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ponto),
    });
 
    if (!resp.ok) {
      throw new Error("Erro ao salvar ponto.");
    }
 
    const salvo = await resp.json();
 
    setStatusMessage(
      id
        ? `Ponto #${salvo.id} atualizado com sucesso.`
        : `Ponto #${salvo.id} criado com sucesso.`
    );
 
    limparFormulario();
    await carregarPontos();
  } catch (error) {
    console.error(error);
    setStatusMessage("Erro ao salvar ponto.");
  }
}
 
form.addEventListener("submit", salvarPonto);
 
btnLimpar.addEventListener("click", (e) => {
  e.preventDefault();
  limparFormulario();
});
 
carregarPontos();
