var authForm = document.getElementById('authForm')
var authFormTitle = document.getElementById('authFormTitle')
var register = document.getElementById('register')
var access = document.getElementById('access')
var loading = document.getElementById('loading')

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