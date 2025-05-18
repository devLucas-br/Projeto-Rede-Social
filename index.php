<?php
// é obrigatório ser a primeira linha da página que usa session
session_start();
$nome = $email = $senha = "";
$idade = 0;
$ErroNome = $ErroIdade = $ErroEmail = $ErroSenha = "";
$cadastrou = "";
$mensagemLogin = "";

// Verificar se foi um POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar qual formulário foi enviado
    if (isset($_POST["formulario"])) {
        $formulario = $_POST["formulario"];
        echo "<script>alert('formulário enviado: $formulario')</script>";

        if ($formulario == "cadastro") {
            // Processar Cadastro
            if (empty($_POST["inputnome"])) {
                $ErroNome = " is-invalid";
            } else {
                $nome = test_input($_POST["inputnome"]);
            }

            if (empty($_POST["inputidade"])) {
                $ErroIdade = " is-invalid";
            } else {
                $idade = test_input($_POST["inputidade"]);
            }

            if (empty($_POST["inputemail"])) {
                $ErroEmail = " is-invalid";
            } else {
                $email = test_input($_POST["inputemail"]);
            }

            if (empty($_POST["inputsenha"])) {
                $ErroSenha = " is-invalid";
            } else {
                $senha = test_input($_POST["inputsenha"]);
            }

            if (empty($ErroNome) && empty($ErroIdade) && empty($ErroEmail) && empty($ErroSenha)){
                require 'app/conexao.php';

                $hash_da_senha = md5($senha);
                $sql = "INSERT INTO usuarios (nome, idade, email, senha) VALUES ('$nome', '$idade', '$email', '$hash_da_senha')";

                if ($conn->query($sql) === TRUE) {
                    $cadastrou = "Cadastro realizado com sucesso!";
                } else {
                    $cadastrou = "Erro ao cadastrar: " . $conn->error;
                }
                $conn->close();
            }else{
                echo "<script>alert('Preencha todos os campos')</script>";
            }
        } elseif ($formulario == "login") {
            // Processar Login
            if (empty($_POST["inputemail"]) || empty($_POST["inputsenha"])) {
                echo "<script>alert('Preencha todos os campos')</script>";
            } else {
                $email = test_input($_POST["inputemail"]);
                $senha = test_input($_POST["inputsenha"]);
                $hash_da_senha = md5($senha);

                require 'app/conexao.php';

                $sql = "SELECT * FROM usuarios WHERE email='$email' AND senha='$hash_da_senha'";
                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        // carregar as variáveis de Sessão do usuário
                        $_SESSION["id_user"] = $row["id"];
                        $_SESSION["email"] = $row["email"];
                        $_SESSION["nome"] = $row["nome"];
                        $_SESSION["idade"] = $row["idade"];
                        $_SESSION["foto"] = $row["foto"];
                        // redirecionar para página de entrada segura
                        header("location:Sistema/entrada.php");
                    }
                } else {
                    echo "<script>alert('Email ou senha inválidos!')</script>";
                }
                $conn->close();
            }
        }
    }
}

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>


<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projeto</title>
    <link rel="shortcut icon" href="imagens/logo.png" type="image/x-icon">
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
</head>

<body>

    <div class="container-formulario">

        <div class="box">

            <?php require "login.php"; ?>

            <?php require "cadastro.php"; ?>

            <div class="box-hide" id="box-hide">
                <h1 class="text-light">SemNome</h1>
                <h2 class="text-light" id="conta">Já possui uma conta?</h2>
                <button id="btn-troca" onclick="troca()" class="btn btn-dark">Clique Aqui</button>
            </div>

        </div>

    </div>

</body>

</html>