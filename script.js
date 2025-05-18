function troca() {
    let boxHide = document.querySelector(".box-hide");

    // Alterna a posição da caixa roxa
    if (boxHide.style.left === "50%") {
        boxHide.style.left = "0";
        document.getElementById("conta").innerHTML = "Já possui uma conta?";
    } else {
        boxHide.style.left = "50%";
        document.getElementById("conta").innerHTML = "Não possui uma conta?";
    }
}

function verSenha() {
    //trocar o type para text do campo inputsenha
    iconeDoOlho = document.getElementById("botaoVerSenha");
    campoSenha = document.getElementById("inputsenha");
    if (campoSenha.type == "password") {
        iconeDoOlho.innerHTML = '&#128528';
        campoSenha.type = "text";
    } else {
        iconeDoOlho.innerHTML = '&#128529';
        campoSenha.type = "password";
    }
}

function verSenhaLogin() {
    //trocar o type para text do campo inputsenha
    iconeDoOlho = document.getElementById("botaoVerSenhaLogin");
    campoSenha = document.getElementById("inputsenhalogin");
    if (campoSenha.type == "password") {
        iconeDoOlho.innerHTML = '&#128528';
        campoSenha.type = "text";
    } else {
        iconeDoOlho.innerHTML = '&#128529';
        campoSenha.type = "password";
    }
}