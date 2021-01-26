//Trata a submissao do formulario de tarefas.
todoForm.onsubmit = function (event) {
    event.preventDefault() //Evita o redirecionamento da pagina
    if(todoForm.name.value != '')
    {
        var data = {
            name: todoForm.name.value
        }
        dbRefUsers.child(firebase.auth().currentUser.uid).push(data).then(function (){
            console.log('Tarefa"' + data.name + '"adicionada com sucesso!')
        }).catch(function (error){
            showError('Falha ao adicionar tarefa', error)
        })
    }
        
    else
    {
        alert('O nome da tarefa não pode estar vazio.')
    }
}

//Exibe a lista de tarefas que estao armazenadas no DB
function fillTodoList (dataSnapshot){
    ulTodoList.innerHTML = ''
    var num = dataSnapshot.numChildren()
    todoCount.innerHTML = num +  (num > 1 ? ' tarefas' : ' tarefa ') + ':' //Exibe na interface o numero de tarefas
    dataSnapshot.forEach(function (item){ //percorre todos os elementos exibidos pelo objeto
        var value = item.val()
        var li = document.createElement('li') //cria um elemento do tipo li
        var spanLi = document.createElement('span')
        spanLi.appendChild(document.createTextNode(value.name)) //adiciona o elemento de texto dentro do span
        spanLi.id = item.key //Define o id do spanLi como a chave da tarefa
         li.appendChild(spanLi) //Adiciona o span dentro do li
        var liRemoveBtn = document.createElement('button') //Cria um botao para a remocao da tarefa
        liRemoveBtn.appendChild(document.createTextNode('Excluir')) //Define o texto do botao como 'Excluir'
        liRemoveBtn.setAttribute('onclick', 'removeTodo(\"' + item.key + '\")') //Configurando o onclick do botao de remocao
        liRemoveBtn.setAttribute('class', 'danger todoBtn') //Definindo classes de estilizacao para o botao de remocao
        li.appendChild(liRemoveBtn) //Adiciona o botao de remocao como elemento da lista
        ulTodoList.appendChild(li) //Adiciona o li dentro do ul
    })
}

//Remove tarefas do banco de dados
function removeTodo (key){
    var selectedItem = document.getElementById(key)
    var confirmation = confirm('Deseja realmente remover a tarefa \"' + selectedItem.innerHTML+ '\"?')
    if (confirmation)
    {
        dbRefUsers.child(firebase.auth().currentUser.uid).child(key).remove().catch(function (error){
            showError('Erro ao excluir tarefa!', error)
        })
    }
 }