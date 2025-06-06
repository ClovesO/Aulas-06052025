/*SCRIPT.JS*/
let contadorCodigo = 1;

function gerarCodigo() {
return contadorCodigo++;
}

const form = document.getElementById('form-catalogo2');
const lista = document.getElementById('listaItens');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // impede o recarregamento

  const nome = document.getElementById('nomeItem').value;
  const categoria = document.getElementById('categoriaItem').value;
  const codigo = gerarCodigo(); // gera um código único para o item

 /*  const novoItem = document.createElement('li');
 novoItem.innerHTML = `
  <strong>${nome}</strong> <em>(${categoria})</em>
  <button class="editar">Editar</button>
  <button class="remover">Remover</button>`;
  lista.appendChild(novoItem); */

  const novaLinha = document.createElement('tr');
  novaLinha.innerHTML = `
  <td><em>${codigo}</em></td>
  <td><strong>${nome}</strong></td>
  <td><em>${categoria}</em></td>
  
  <td class="text-center">
    <button class="btn btn-warning btn-sm editar">Editar</button>
    <button class="btn btn-outline-danger btn-sm remover">Remover</button>
  </td>
  `;
  lista.appendChild(novaLinha);
 
 
  atualizarContadores(); 
  form.reset();
 
});
 


lista.addEventListener('click', function(event) {

  const botao = event.target;
  const linha = botao.closest('tr');


  if (event.target.classList.contains('remover')) {
    if (confirm("Tem certeza que deseja remover este item?")) {
      /* event.target.parentElement.remove(); */
      event.target.closest('tr').remove();
      atualizarContadores(); // Atualiza os contadores após remoção
    }
    atualizarContadores();
  }

 /*  if (event.target.classList.contains('editar')) {
    const li = event.target.parentElement;

    const textoOriginal = li.querySelector('strong').textContent;
    const categoriaOriginal = li.querySelector('em').textContent.replace(/[()]/g, '');

    const novoNome = prompt("Editar nome:", textoOriginal);
    const novaCategoria = prompt("Editar categoria:", categoriaOriginal);

    if (novoNome && novaCategoria) {
      li.innerHTML = `
        <strong>${novoNome}</strong> <em>(${novaCategoria})</em>
        <button class="editar">Editar</button>
        <button class="remover">Remover</button>
      `;
    }
  } */

      if (botao.classList.contains('editar')) {
    const nomeAtual = linha.children[1].textContent.trim();
    const categoriaAtual = linha.children[2].textContent.trim();

    const novoNome = prompt("Editar nome:", nomeAtual);
    const novaCategoria = prompt("Editar categoria:", categoriaAtual);

    if (novoNome && novaCategoria) {
      linha.children[1].innerHTML = `<strong>${novoNome}</strong>`;
      linha.children[2].innerHTML = `<em>${novaCategoria}</em>`;
      
    }
    atualizarContadores(); // Atualiza os contadores após edição
  }
});









document.getElementById('exportar').addEventListener('click', function() {
  const itens = [];

  /* lista.querySelectorAll('li').forEach(li => {
    const nome = li.querySelector('strong')?.textContent;
    const categoria = li.querySelector('em')?.textContent.replace(/[()]/g, ''); */
   
    lista.querySelectorAll('tr').forEach(linha => {
    const nome = linha.children[0]?.textContent.trim();
    const categoria = linha.children[1]?.textContent.trim();


    itens.push({ nome, categoria });
   
  });

  const json = JSON.stringify(itens, null, 2); // transforma em JSON formatado
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = "catalogo.json";
  link.click();
});




document.getElementById('botaoImportar').addEventListener('click', function() {
  document.getElementById('inputImportar').click(); // força o clique no input invisível
});
//Estou alterando

//termino estou alterando

document.getElementById('inputImportar').addEventListener('change', function(event) {
  const arquivo = event.target.files[0];

  if (!arquivo) return;

  const leitor = new FileReader();
  leitor.onload = function(e) {
    const conteudo = e.target.result;
    try {
      const dados = JSON.parse(conteudo);

      lista.innerHTML = ''; // limpa a lista atual

      /* dados.forEach(item => {
        const novoItem = document.createElement('li');
        novoItem.innerHTML = `
          <strong>${item.nome}</strong> <em>(${item.categoria})</em>
          <button class="editar">Editar</button>
          <button class="remover">Remover</button>
        `;
        lista.appendChild(novoItem);
      });
 */

      dados.forEach(item => {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
          <td><strong>${item.nome}</strong></td>
          <td><em>${item.categoria}</em></td>
          <td>
            <button class="btn btn-warning btn-sm editar">Editar</button>
            <button class="btn btn-outline-danger btn-sm remover">Remover</button>
          </td>
        `;
        lista.appendChild(novaLinha);
      });


    } catch (erro) {
      alert("Erro ao ler o arquivo JSON.");
    }
  };

  leitor.readAsText(arquivo);
});

// Atualiza contadores no card
function atualizarContadores() {
const linhas = document.querySelectorAll("#listaItens tr"); 
let contagem = {
Livros: 0,
Eletrônicos: 0,
Papelaria: 0,
Utilidades: 0
};

linhas.forEach(linha => {
const categoria = linha.cells[2].innerText;
if (contagem[categoria] !== undefined) {
contagem[categoria]++;
}
});
document.getElementById("cardLivros").innerText = contagem.Livros;
document.getElementById("cardEletronicos").innerText = contagem.Eletrônicos;
document.getElementById("cardPapelaria").innerText = contagem.Papelaria;
document.getElementById("cardUtilidades").innerText = contagem.Utilidades;

// Repita para os demais
}


//Início do botão Cadastrar do modal
// Abre o modal ao clicar no botão
document.getElementById('btnModalCadastro').addEventListener('click', function() {
  var modal = new bootstrap.Modal(document.getElementById('modalCadastro'));
  modal.show();
});

// Cadastra o item do modal na tabela principal
document.getElementById('form-modal-cadastro').addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('nomeItemmodal').value;
  const categoria = document.getElementById('categoriaItemmodal').value;
  const codigo = Date.now(); // Ou use sua função gerarCodigo()

  const lista = document.getElementById('listaItens');
  const novaLinha = document.createElement('tr');
  novaLinha.innerHTML = `
    <td><em>${codigo}</em></td>
    <td><strong>${nome}</strong></td>
    <td><em>${categoria}</em></td>
    <td class="text-center">
      <button class="btn btn-warning btn-sm editar">Editar</button>
      <button class="btn btn-outline-danger btn-sm remover">Remover</button>
    </td>
  `;
  lista.appendChild(novaLinha);

  // Atualize os contadores, se necessário
  if (typeof atualizarContadores === "function") atualizarContadores();

  // Feche o modal
  var modal = bootstrap.Modal.getInstance(document.getElementById('modalCadastro'));
  modal.hide();

  // Limpe o formulário do modal
  event.target.reset();
});

// ...após cadastrar e fechar o modal:
var modal = bootstrap.Modal.getInstance(document.getElementById('modalCadastro'));
modal.hide();

// Foca no campo do formulário principal
document.getElementById('nomeItem').focus();

// Limpa o formulário do modal
event.target.reset();

function filtrarTabela(){
    const filtro = document.getElementById('categoriaItemconsulta').value;
    const linhas = document.querySelectorAll('#listaItens tbody');

    linhas.forEach(tr => {
      const categoria = tr.cell[2].innerText;
      trstyle.display = (filtro ==='' || categoria === filtro) ? '' : 'nome';
})
}