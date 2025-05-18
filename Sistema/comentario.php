<div class="modal fade" id="CommentsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Comentários</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- comentários -->
                    <div class="container">
                        <div class="cabecalho">
                            <img class="img_comment" src="../imagens/anonymous.png" alt="">
                            <p>Nome do User</p>
                            <p class="dataComment">11/05/25</p>
                        </div>
                        <div class="comentario">
                            <p>comentário escrito pelo usu[ario</p>
                        </div>
                        <div class="CommentsLike">
                            <h4>&#128077</h4>
                            <h4>&#128078</h4>
                        </div>
                    </div>
                </div>
                <div class="">
                    <form class="postComment" action="" method="post">
                        <div class="form-floating mb-3 w-75">
                            <input type="text" class="form-control ms-3" id="InputComment" placeholder="Digite seu comentário">
                            <label for="InputComment" class="ms-3">Comentário</label>
                        </div>
                        <button name="botaoComment" class="btn btn-dark botao">Enviar</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                </div>
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
        <div class="container">
            <div class="cabecalho">
                <img class="img_comment" src="../imagens/anonymous.png" alt="">
                <p>Nome do User</p>
                <p class="dataComment">11/05/25</p>
            </div>
            <div class="comentario">
                <p>comentário escrito pelo usu[ario</p>
            </div>
            <div class="CommentsLike">
                <h4>&#128077</h4>
                <h4>&#128078</h4>
            </div>
        </div>
        ';
    }

    echo '</div>'; // fecha o d-flex
} else {
    echo "Nenhuma postagem encontrada.";
}
$conn->close();
?>