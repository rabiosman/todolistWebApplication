var authForm = document.getElementById('authForm')
var authFormTitle = document.getElementById('authFormTitle')
var register = document.getElementById('register')
var access = document.getElementById('access')
var loading = document.getElementById('loading')
var auth = document.getElementById('auth')
var userContent = document.getElementById('userContent')
var userEmail = document.getElementById('userEmail')
var emailVerified = document.getElementById('emailVerified')
var sendEmailVerificationDiv = document.getElementById('sendEmailVerificationDiv')
var passwordReset = document.getElementById('passwordReset')
var userName = document.getElementById('userName')
var userImg = document.getElementById('userImg')
var todoForm = document.getElementById('todoForm')
var todoCount = document.getElementById('todoCount')
var ulTodoList = document.getElementById('ulTodoList')





//Alterar o formulario de autenticacao para o cadastro de novas contas
function toggleToRegister() {
    authForm.submitAuthForm.innerHTML = 'Cadastrar conta'
    authFormTitle.innerHTML = 'Insira seus dados para realizar o cadastro'

    hideItem(passwordReset)
    hideItem(register)
    showItem(access)
}

//Alterar o formulario de autenticacao para o acesso de contas ja existentes
function toggleToAccess() {
    authForm.submitAuthForm.innerHTML = 'Acessar'
    authFormTitle.innerHTML = 'Acesse a sua conta para continuar'

    hideItem(access)
    showItem(register)
    showItem(passwordReset)
}

//Simplifica a exibicao de elementos da pagina
function showItem(element) {
    element.style.display = 'block'
}
//Simplifica a remocao de elementos da pagina
function hideItem(element) {
    element.style.display = 'none'
}

//Funcao para mostrar as informacoes dos usuarios autenticados
function showUserContent(user){
    console.log(user)
    if(user.providerData[0].providerId != 'password')
    {
        emailVerified.innerHTML = 'Autenticação realizada por provedor confiável'
        hideItem(sendEmailVerificationDiv)
    }
    else
    {
        if(user.emailVerified)
        {
            emailVerified.innerHTML = 'E-mail verificado'
            hideItem(sendEmailVerificationDiv)
        } 
        else
        {
            emailVerified.innerHTML = 'E-mail não verificado'
            showItem(sendEmailVerificationDiv)
        }
    }
    
    userImg.src = user.photoURL ? user.photoURL : 'img/unknownUser.img'
    userName.innerHTML = user.displayName

    userEmail.innerHTML = user.email
    hideItem(auth)
    dbRefUsers.child(firebase.auth().currentUser.uid).on('value', function (dataSnapshot){
        fillTodoList(dataSnapshot)
    })
    showItem(userContent)
}

//Mostrar conteudo para usuarios nao autenticados 
function showAuth(){
    authForm.email.value = ''
    authForm.password.value = ''
    hideItem(userContent)
    showItem(auth)
}

//Atributos extras de configuração de e-mail
var actionCodeSettings = {
    url: 'https://todolist-b9c36.firebaseapp.com'
}

//Centralizar e traduzir erros
function showError(prefix, error) {
    console.log(error.code)
    hideItem(loading)
    switch (error.code) 
    {
        case 'auth/invalid-email': alert(prefix + ' ' + 'E-mail inválido!')
        break;

        case 'auth/wrong-password': alert(prefix + ' ' + 'Senha incorreta!')
        break;

        case 'auth/weak-password': alert(prefix + ' ' + 'Senha fraca. Insira no mínimo 6 carácteres!')
        break;

        case 'auth/email-already-in-use': alert(prefix + ' ' + 'E-mail em já está em uso por outra conta!')
        break;
        
        case 'auth/popup-closed-by-user': alert(prefix + ' ' + 'Janela de autenticação fechada pelo usuário!')
        break;

        default: alert(prefix + ' ' + error.message)
        break;
    }
}

var database = firebase.database()
var dbRefUsers = database.ref('users')