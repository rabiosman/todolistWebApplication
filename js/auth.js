//Traduz a autenticaçãod o firebase para o português brasileiro
firebase.auth().languageCode = 'pt-BR'

//Funcao que trata o envio do formulario de autenticacao
authForm.onsubmit = function(event){
    showItem(loading)
    event.preventDefault()
    if(authForm.submitAuthForm.innerHTML == 'Acessar')
    {
        firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function (error){
            console.log("Falha no acesso")
            console.log(error)
            hideItem(loading)
        })
    }
    else
    {
        
        firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function (error){
            console.log("Falha no cadastro")
            console.log(error)
            hideItem(loading)
        })

    }
}

//Funcao que centraliza e trata a autenticacao
firebase.auth().onAuthStateChanged(function (user){
    hideItem(loading)
    if(user)
    {
        showUserContent(user)
    }
    else
    {
        showAuth()
    } 
})

//Função que permite ao usuário sair da conta
function signOut(){
    firebase.auth().signOut().catch(function(error){
        console.log("Falha ao sair da conta")
        console.log(error)  
    })  
}

//Funcao para o usuario verificar o email
function sendEmailVerification(){
    showItem(loading)
    var user = firebase.auth().currentUser
    user.sendEmailVerification(actionCodeSettings).then(function(){
        alert('O e-mail de verificação foi enviado para'+ user.email +'! Verifique a sua caixa da entrada')
    }).catch(function(error){
        alert('Houve um erro ao enviar o e-mail de verificação')
        console.log(error)
    }).finally(function (){
        hideItem(loading)
    })
}
