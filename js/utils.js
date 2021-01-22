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



//Alterar o formulario de autenticacao para o cadastro de novas contas
function toggleToRegister() {
    authForm.submitAuthForm.innerHTML = 'Cadastrar conta'
    authFormTitle.innerHTML = 'Insira seus dados para realizar o cadastro'

    hideItem(register)
    showItem(access)
}

//Alterar o formulario de autenticacao para o acesso de contas ja existentes
function toggleToAccess() {
    authForm.submitAuthForm.innerHTML = 'Acessar'
    authFormTitle.innerHTML = 'Acesse a sua conta para continuar'

    hideItem(access)
    showItem(register)
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
    userEmail.innerHTML = user.email
    hideItem(auth)
    showItem(userContent)
}

//Mostrar conteudo para usuarios nao autenticados 
function showAuth(){
    authForm.email.value = ''
    authForm.password.value = ''
    hideItem(userContent)
    showItem(auth)
}