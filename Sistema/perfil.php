<?php
session_start();

// verifica se o usuário está logado
if (empty($_SESSION["id_user"])) {
    header("location:index.php?erro=sem_session");
    exit;
}
$id_usuario_logado = $_SESSION["id_user"];

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil</title>
    <link rel="stylesheet" href="/style2.css">
    <style>
        .nav-color {
            background-color: purple;
        }
        .perfil{
            display: flex;
        }
        .barra{
            display: flex;
            justify-content: center;
        }
    </style>
</head>

<body>

    <?php require "menu.php"; ?>
    <!-- <?php echo $_SESSION["nome"] ?> -->
    <div class="barra">
        <div class="perfil">
            <img src="../imagens/<?php echo $_SESSION["foto"]; ?>" alt="foto do usuário <?php echo $_SESSION["nome"]; ?>" class="rounded-circle me-2" style="max-width: 250px;">
            <div>
                <h2 class="pt-5">
                    <?php echo $_SESSION["nome"]; ?>
                </h2>
                <h3 class="pt-5">
                    idade
                </h3>
            </div>
        </div>
    </div>

    <?php
require '../app/conexao.php'; 

$sql = "SELECT * FROM view_postagens_com_total_curtidas WHERE usuario_id = $id_usuario_logado";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // container flexível para todas as postagens
    echo '<div class="d-flex flex-wrap justify-content-center">';

    while ($row = $result->fetch_assoc()) {
        echo '
<div class="m-3 p-2 border rounded" style="width: 300px; box-shadow: 10px 10px 14px;">
    <div class="container-fluid rounded">
        <div class="row align-items-center">
            <div class="col-3">
                <img class="w-100 rounded-circle" src="../imagens/' . htmlspecialchars($row["foto"]) . '" alt="">
            </div>
            <div class="col-9">
                <h5 class="mt-2">' . htmlspecialchars($row["nome"]) . '</h5>
            </div>
        </div>
        <div class="container-fluid mt-2">
            <h6>' . htmlspecialchars($row["titulo"]) . '</h6>
        </div>
        <div class="container-fluid mt-2">
            <img class="w-100" src="' . htmlspecialchars($row["imagem"]) . '" alt="">
        </div>
        <div class="container-fluid mt-2">
            <p>' . htmlspecialchars($row["descricao"]) . '</p>
        </div>
        <div class="row">
                <div class="col-lg-2">
                    <form method="post">
                        <input type="hidden" name="id_coisa_curtida" value="'.$row["postagem_id"].'">
                        <button name="btn-curtir" type="submit" class="btn position-relative">
                            <h3>&#129505</h3>
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                '.$row["total_curtidas"].'
                                <span class="visually-hidden">Curtidas</span>
                            </span>
                        </button>
                    </form>
                </div>
                <div class="col-lg-1 pt-2 ms-2">
                    <h3>&#128488</h3>
                </div>
                <div class="col-lg-1 pt-2 ms-4">
                    <h3>&#128386</h3>
                </div>
            </div>
    </div>
</div>';
    }

    echo '</div>'; // fecha o d-flex
} else {
    echo "Nenhuma postagem encontrada.";
}
$conn->close();
?>


</body>

</html>