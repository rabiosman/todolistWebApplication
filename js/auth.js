authForm.onsubmit = function(event){
    event.preventDefault()
    if(authForm.submitAuthForm.innerHTML == 'Acessar')
    {
        firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function (error){
            console.log("Falha no acesso")
            console.log(error)
        })
    }
    else
    {
        
        firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function (error){
            console.log("Falha no cadastro")
            console.log(error)
        })

    }
}

firebase.auth().onAuthStateChanged(function (user){
    if(user)
    {
        console.log("Usuário autenticado")
        console.log(user)
    }
    else
    {
        console.log("Usuário não autenticado")
    } 
})