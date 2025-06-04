<?php
require "../app/conexao.php";
$id_post = $row["postagem_id"];
$sql_comments = "SELECT c.comentario, c.dataHora, u.nome, u.foto 
                FROM comentarios c 
                JOIN usuarios u ON c.id_usuario = u.id 
                WHERE c.id_coisa = '$id_post'
                ORDER BY c.dataHora DESC";
$result_comments = $conn->query($sql_comments);
if ($result_comments->num_rows > 0) {
    while ($comment = $result_comments->fetch_assoc()) {
        echo '
        <div class="container mb-2">
            <div class="cabecalho">
                <img class="img_comment" src="../imagens/' . $comment["foto"] . '" alt="">
                <p>' . htmlspecialchars($comment["nome"]) . '</p>
                <p class="dataComment">' . date("d/m/y", strtotime($comment["dataHora"])) . '</p>
            </div>
            <div class="comentario">
                <p>' . htmlspecialchars($comment["comentario"]) . '</p>
            </div>
            <div>
                <p></p>
            </div>
        </div>';
    }
} else {
    echo "";
}
?>