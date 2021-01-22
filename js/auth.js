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

//Função que permite ao usuário redefinir a sua senha
function sendPasswordResetEmail(){
    var email = prompt('Redefinir senha! Informe o seu endereço de e-mail.', authForm.email.value)
    if(email)
    {
        showItem(loading)
        firebase.auth().sendPasswordResetEmail(email, actionCodeSettings).then(function(){
            alert('E-mail de redefinição de senha foi enviado para ' + email + '.')
        }).catch(function (error){
            alerta('Houve um erro ao enviar o e-mail de redefinição de senha')
            console.log(error)
        }).finally(function (){
            hideItem(loading)
        })
    }
    else
    {
        alert('É preciso preencher o campo de e-mail para redefinir a senha!')
    }
}

//Função que permite a autenticação pelo Google
function signInWithGoogle(){
    showItem(loading)
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(function (error){
        alert('Houve um erro ao autenticar usando o Google')
        console.log(error)
        hideItem(loading)
    })
}