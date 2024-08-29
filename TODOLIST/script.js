const novaTarefaInput = document.getElementById('novaTarefa'); //Carregar texto do input
const listaTarefas = document.getElementById('listaTarefas'); // Carregar lista ul com id listatarefas
// console.log(novaTarefaInput)
window.onload = () => { //Quando a página  carregar...
//Carrega do cache a lista de taregas e coloca na variável tarefasSalvas
  const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefasSalvas.forEach(tarefa => {
    //Reintroduz tudo na UL no método criarTarefa do tipo objecto
    criarTarefa(tarefa.texto, tarefa.concluida);
  });
};



function adicionarTarefa() {
  const textoTarefa = novaTarefaInput.value;
  if (textoTarefa === ''){
    alert("Erro: Pretende introduzir tarefa sem texto. Tente de novo")
    return;
  } 
  criarTarefa(textoTarefa);
  novaTarefaInput.value = '';

  salvarTarefas();
}

function criarTarefa(texto, concluida = false) {//Por default vem falso
  const li = document.createElement('li');
  const p=document.createElement('p');
  p.classList.add('tarefaText');
  p.textContent = texto;
  li.appendChild(p);
  const botaoConcluir = document.createElement('button');
  botaoConcluir.textContent = '✅'; //Todo: Colocar check icon
  botaoConcluir.onclick = () => {

    //Guardar novo estado 
    p.classList.toggle('concluir');
    li.classList.toggle('escurece')
    salvarTarefas();
  };

  const botaoRemover = document.createElement('button');
  botaoRemover.style.backgroundColor='red';
  botaoRemover.textContent = '❌';
  botaoRemover.style.borderRadius='10px';
  
  botaoRemover.onclick = () => {
    if(confirm("REMOVER TAREFA?")==true){
      listaTarefas.removeChild(li);
      salvarTarefas();
    }else{
      return;
    }
  };

  li.appendChild(botaoConcluir);
  li.appendChild(botaoRemover);
  if (concluida) {
    p.classList.add('concluir');
  }
  listaTarefas.appendChild(li);
}
function clickPress(event) {
    if (event.key == "Enter") {
        adicionarTarefa()
    }
}
function salvarTarefas() {
  const tarefas = [];
  const itensLista = listaTarefas.querySelectorAll('p');
 
  itensLista.forEach(item => {
    tarefas.push({
      texto: item.textContent,
      concluida: item.classList.contains('concluir')
    });
  });
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
 
}