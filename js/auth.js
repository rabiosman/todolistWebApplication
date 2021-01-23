//Traduz a autenticaçãod o firebase para o português brasileiro
firebase.auth().languageCode = 'pt-BR'

//Funcao que trata o envio do formulario de autenticacao
authForm.onsubmit = function(event){
    showItem(loading)
    event.preventDefault()
    if(authForm.submitAuthForm.innerHTML == 'Acessar')
    {
        firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function (error){
            showError('Falha no acesso: ', error)
        })
    }
    else
    {
        
        firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function (error){
            showError('Falha no cadastro: ', error)
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
        showError('Falha ao sair da conta: ', error)
    })  
}

//Funcao para o usuario verificar o email
function sendEmailVerification(){
    showItem(loading)
    var user = firebase.auth().currentUser
    user.sendEmailVerification(actionCodeSettings).then(function(){
        alert('O e-mail de verificação foi enviado para'+ user.email +'! Verifique a sua caixa da entrada')
    }).catch(function(error){
        showError('Houve um erro ao enviar o e-mail de verificação: ', error)
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
            showError('Houve um erro ao enviar o e-mail de redefinição de senha ', error)
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
        showError('Houve um erro ao autenticar usando o Google ', error)
    })
}

//Funcao que permite a autenticacao pelo Github
function signInWithGitHub(){
    showItem(loading)
    firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider()).catch(function (error){
        showError('Houve um erro ao autenticar usando o GitHub ', error)
    })
}

//Funcao que permite a autenticacao pelo Facebook
function signInWithFacebook(){
    showItem(loading)
    firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).catch(function (error){
        showError('Houve um erro ao autenticar usando o Facebook ', error)
    })
}

//Funcao que permite atualizar nomes de usuarios
function updateUserName(){
    var newUserName = prompt('Informe um novo nome de usuário: ', userName.innerHTML)
    if (newUserName && newUserName != '')
    {       
        userName.innerHTML = newUserName
        showItem(loading)
        firebase.auth().currentUser.updateProfile({
            displayName: newUserName
        }).catch(function (error){
            showError('Houve um erro ao atualizar nome de usuário ', error)          
        }).finally(function (){
            hideItem(loading)
        })
    }
    else
    {
        alert('O nome de usuário precisa conter carácteres')
    }

}

//Funcao que permite ao usuario excluir sua conta
function deleteUserAccount () {
    var confirmation = confirm('Deseja realmente excluir sua conta?')
    if (confirmation)
    {
        showItem(loading)
        firebase.auth().currentUser.delete().then(function (){
            alert('Conta excluída com sucesso')
        }).catch(function (error){
            showError('Houve um erro ao excluir a conta', error)
        }).finally(function (){
            hideItem(loading)
        })
    }
}