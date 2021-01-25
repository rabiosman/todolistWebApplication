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