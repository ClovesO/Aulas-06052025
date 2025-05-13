const form = document.getElementById('form-catalogo')
const list = document.getElementById('listaItens');

form.addEventListener('submit',
    function(event){
        event.preventDefault();
    const nome = document.getElementById('nomeItem').value;
    const categoria = document.getElementById('categoriaItem').value;
    
    const novoItem = document.createElement('li');
    // novoItem.textContent = nome + " (" + categoria + ")";
    //novoItem.innerHTML = `${nome} (${categoria}) <button class="remover" >Remover</button>`; //id="btnRemover"
    novoItem. innerHTML = `
    <strong>${nome}</strong><em>(${categoria})</em>
   <button class="editar">Editar</button>
   <button class="remover">Remover</button>
   `;
   list.appendChild(novoItem);
        
form.reset();
    });
list.addEventListener('click', function(event) {
  if (event.target.classList.contains('remover')) {
    if (confirm("Tem certeza que deseja remover este item?")) {
      event.target.parentElement.remove();
    }
  }

  if (event.target.classList.contains('editar')) {
    const list = event.target.parentElement;

    const textoOriginal = list.querySelector('strong').textContent;
    const categoriaOriginal = list.querySelector('em').textContent.replace(/[()]/g, '');

    const novoNome = prompt("Editar nome:", textoOriginal);
    const novaCategoria = prompt("Editar categoria:", categoriaOriginal);

    if (novoNome && novaCategoria) {
      list.innerHTML = `
        <strong>${novoNome}</strong> <em>(${novaCategoria})</em>
        <button class="editar">Editar</button>
        <button class="remover">Remover</button>
      `;
    }
  }
});