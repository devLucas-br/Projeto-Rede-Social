<?php
// é obrigatório ser a primeira linha da página que usa session
session_start();
// se existir alguma session criada, o user pode entrar
if (empty($_SESSION["id_user"])) {
    // se veio vazio, redireciona o user de volta p login
    header("location:index.php?erro=sem_session");
} else {
    // pode entrar que acertou os dados
}

// Código do cadastro da coisa (Continuar daqui)
$titulo = $descricao = $foto = $tags = $comentario = "";
$exibeMensagem = "";
// Variáveis de controle, para verificar o que não foi preenchido
$vazioTitulo = $vazioDescricao = $vazioComentario = "";
// verificar se foi POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //botão curtir clicado
    if (isset($_POST["btn-curtir"])) {
        $id_coisa_postada = $_POST["id_coisa_curtida"];
        $id_usuario_curtiu = $_SESSION["id_user"];
        require '../app/conexao.php';

        // Verifica se o usuário já curtiu
        $verifica_sql = "SELECT * FROM curtidas 
                        WHERE id_coisa = '$id_coisa_postada' AND id_usuario = '$id_usuario_curtiu'";
        $verifica_resultado = $conn->query($verifica_sql);

        if ($verifica_resultado->num_rows > 0) {
            echo "<script>alert('Você já curtiu isso.');</script>";
        } else {
            // Faz a curtida
            $sql = "INSERT INTO curtidas (id_coisa, id_usuario)
                    VALUES ('$id_coisa_postada', '$id_usuario_curtiu')";

            if ($conn->query($sql) === TRUE) {
                echo "<script>alert('Foi curtido!!!');</script>";
            } else {
                echo "<script>alert('Erro ao curtir: " . $conn->error . "');</script>";
            }
        }

        $conn->close();
    }
    if(isset($_POST["botaoComment"])){
            $id_usuario_comentou = $_SESSION["id_user"];
            $id_coisa_comentada = $_POST["id_coisa_comentada"];
            if(empty($_POST["InputComment"])){
                $vazioComentario = "Comentário está vazio!";
                echo "<script>alert('Comentário vazio!')</script>";
            }else{
                $comentario = $_POST["InputComment"];
            }
        if(empty($vazioComentario)){
            // Conectar com o banco
            require '../app/conexao.php';
            // Inserir no banco com SQL
            $sql = "INSERT INTO `comentarios` (`id_coisa`, `id_usuario`, `comentario`) VALUES ('$id_usuario_comentou','$id_coisa_comentada', '$comentario')";
            if ($conn->query($sql) === TRUE) {
                // echo "New record created successfully";
                $exibeMensagem = "show";
                $textoMensagem = "Seu comentário foi realizado com sucesso!";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

            $conn->close();
        }
    }
    if(isset($_POST["botao_teste"])){
        $id_coisa_comentada = $_POST["id_coisa_comentada"];
        if(isset($_POST["botaoComment"])){
            $id_usuario_comentou = $_SESSION["id_user"];
            if(empty($_POST["InputComment"])){
                $vazioComentario = "Comentário está vazio!";
                echo "<script>alert('Comentário vazio!')</script>";
            }else{
                $comentario = $_POST["InputComment"];
            }
        if(empty($vazioComentario)){
            // Conectar com o banco
            require '../app/conexao.php';
            // Inserir no banco com SQL
            $sql = "INSERT INTO `comentarios` (`id_coisa`, `id_usuario`, `comentario`) VALUES ('$id_usuario_comentou','$id_coisa_comentada', '$comentario')";
            if ($conn->query($sql) === TRUE) {
                // echo "New record created successfully";
                $exibeMensagem = "show";
                $textoMensagem = "Seu comentário foi realizado com sucesso!";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

            $conn->close();
        }
    }
    }
    if (isset($_POST["botao_postar"])) {
        // Verificar se preencheu tudo que precisa
        // Título
        if (empty($_POST["inputTitulo"])) {
            $vazioTitulo = "Título está vazio";
            $exibeMensagem = "show";
            $textoMensagem = "Não preencheu o título";
        } else {
            $titulo = $_POST["inputTitulo"];
        }
        // Descrição
        if (empty($_POST["inputDescricao"])) {
            $vazioDescricao = "Descrição está vazio";
            $exibeMensagem = "show";
            $textoMensagem = "Não preencheu a descrição";
        } else {
            $descricao = $_POST["inputDescricao"];
        }
        if (empty($_POST["inputTags"])) {
            $tags = "";
        } else {
            $tags = $_POST["inputTags"];
        }
        $foto = "semfoto.png";
        // Se o $vazioTitulo e $vazioDescricao estão vazios, pode gravar
        if (empty($vazioTitulo) || empty($vazioDescricao)) { // verificar && ou ||
            // verificar imagem
            $foto = tratarImagem();
            if ($foto == "") {
                $foto = "uploads/sem_foto.png";
            }
            // Conectar com o banco
            require '../app/conexao.php';
            // Inserir no banco com SQL
            $idusuario = $_SESSION["id_user"];
            $sql = "INSERT INTO `tb_postagens`(`id_usuario`, `titulo`, `descricao`, `imagem`, `tags`) VALUES ('$idusuario','$titulo','$descricao','$foto','$tags')";
            if ($conn->query($sql) === TRUE) {
                // echo "New record created successfully";
                $exibeMensagem = "show";
                $textoMensagem = "Seu POST foi realizado com sucesso!";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

            $conn->close();
        }
    } else {
        // botao sair
    }
}

function tratarImagem()
{
    $uploadOk = "0";
    $mensagemIMG = "";
    //verificando se veio arquivo
    //$_FILES["nome do input type=file do arquivo"]["informação que desejo do arquivo"]
    if ($_FILES["inputImagem"]["error"] === UPLOAD_ERR_OK) {
        //ver se realmente é imagem
        // Check if image file is a actual image or fake image
        $check = getimagesize($_FILES["inputImagem"]["tmp_name"]);
        if ($check !== false) {
            //echo "File is an image - " . $check["mime"] . ".";
            $pasta_salvar = "uploads/";
            $arquivo_postado = basename($_FILES["inputImagem"]["name"]);
            $uploadOk = 1;
            $extensaoDoArquivo = strtolower(pathinfo($arquivo_postado, PATHINFO_EXTENSION));
            //testar se o tipo é aceito
            if ($extensaoDoArquivo != "jpg" && $extensaoDoArquivo != "png" && $extensaoDoArquivo != "jpeg" && $extensaoDoArquivo != "gif") {
                //echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
                $uploadOk = 0;
                $mensagemIMG .= "Extenção da imagem não é aceita. ";
            } else {
                //extensão da Imagem esta OK
                $uploadOk = 1;
                //testar o tamanho da imagem < 5MB
                if ($_FILES["inputImagem"]["size"] > 500000) {
                    //echo "Sorry, your file is too large.";
                    $uploadOk = 0;
                    $mensagemIMG .= "Imagem maior que 5MB. ";
                } else {
                    //tamanho menor que 5MB
                    //trocar o nome enquanto existir na pasta
                    $nomeExiste = 0;
                    while ($nomeExiste != 1) {
                        //ver se existe na pasta
                        if (file_exists($arquivo_postado)) {
                            //ja existe arquivo com o nome
                            //echo "Sorry, file already exists.";
                            $nomeExiste = 0;
                        } else {
                            //criar um novo nome
                            $arquivo_postado = date("Y") .
                                date("m") . date("d") .
                                date("H") . date("i") . date("s") .
                                "foto" . md5($arquivo_postado)
                                . "." . $extensaoDoArquivo;
                            $nomeExiste = 1;
                            if (file_exists($arquivo_postado)) {
                                //ja existe arquivo com o nome
                                $nomeExiste = 0;
                            }
                        }
                    }
                    //salvar / gravar arquivo na pasta
                    if (move_uploaded_file($_FILES["inputImagem"]["tmp_name"], $pasta_salvar . $arquivo_postado)) {
                        $uploadOk = 1;
                        return $pasta_salvar . $arquivo_postado;
                    } else {
                        $mensagemIMG .= " Erro ao salvar a imagem!";
                        $uploadOk = 0;
                        return "";
                    }
                }
            }
        } else {
            //echo "File is not an image.";
            $uploadOk = 0;
            $mensagemIMG = "Não é arquivo de imagem!";
        }
    } else {
        $mensagemIMG = "Não veio o arquivo";
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projeto</title>
    <style>
        .nav-color {
            background-color: purple;
        }

        .cabecalho {
            display: flex;
            gap: 3%;
        }

        .img_comment {
            width: 8%;
        }

        .dataComment {
            position: relative;
            left: 48%;
        }

        .CommentsLike {
            display: flex;
        }

        .postComment {
            display: flex;
            gap: 10px;
        }

        .botao{
            margin: 20px;
        }
    </style>
</head>

<body>
    <?php require "menu.php"; ?>

    <!--
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Postar
    </button>
    -->

    <div class="container p-2">
        <h2 style="text-align: center;">Postagens</h2>
        <div class="container">
            <div class="row text-center">
                <div class="col-lg-4">
                    <form method="GET">
                        <input name="filtro" type="hidden" value="menor">
                        <button class="ms-2 btn btn-secondary" type="submit">Mais Antigo</button>
                    </form>
                </div>
                <div class="col-lg-4">
                    <h4>Filtos</h4>
                </div>
                <div class="col-lg-4">
                    <form method="GET">
                        <input name="filtro" type="hidden" value="maior">
                        <button class="btn btn-secondary" type="submit">Mais Recente</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="container p-2">
            <?php
            //chama o arquivo da conexão
            require '../app/conexao.php';
            //seleciona as coisas
            $sql = "SELECT * FROM view_postagens_com_total_curtidas";
            if (!empty($_GET['busca'])) {
                $sql = "SELECT * FROM view_postagens_com_total_curtidas " .
                    "WHERE titulo LIKE '%" . $_GET['busca'] . "%' OR " .
                    "descricao LIKE '%" . $_GET['busca'] . "%' OR " .
                    "nome LIKE '%" . $_GET['busca'] . "%' ";
            }
            //se tem algum filtro
            if (!empty($_GET['filtro'])) {
                $filtro = $_GET['filtro'];
                if ($filtro == "menor") {
                    $sql .= " ORDER BY dataPostagem";
                } else {
                    //se for maior 
                    $sql .= " ORDER BY dataPostagem DESC";
                }
            } else {
                //não teve filtro
                $sql .= " ORDER BY titulo";
            }
            $result = $conn->query($sql);
            //se achou mais que 0 coisas
            if ($result->num_rows > 0) {
                //faz um loop em todas as linhas da Tb_coisa (postagem)
                while ($row = $result->fetch_assoc()) {
                    echo '<!-- POSTAGEM DA COISA -->
    <div class="container w-50 mx-auto p-2 border mb-4 rounded" style="box-shadow: 10px 10px 14px;">
        <div class="container-fluid rounded" >
            <div class="row rounded"">
                <div class="col-lg-2 p-2">
                    <img class="w-100 m-1 rounded-circle" src="../imagens/' . $row["foto"] . '" alt="">
                </div>
                <div class="col-lg-10 pt-4">
                    <h3> ' . $row["nome"] . '</h3>
                </div>
            </div>
            <div class="container-fluid">
                <div class="col-lg-6">
                    <h1> ' . $row["titulo"] . '</h1>
                </div>
                <div class="col-lg-4">
                    <p> ' . $row["dataPostagem"] . '</p>
                </div>
            </div>
            <div class="container-fluid">
                <img class="w-100" src="' . $row["imagem"] . '" alt="">
            </div>
            <div class="container-fluid mt-2">
                <p>' . $row["descricao"] . ' </p>
            </div>
            <div class="container-fluid">
                <p> tags: ' . $row["tags"] . ' </p>
            </div>
            <div class="row">
                <div class="col-lg-2">
                    <form method="post">
                        <input type="hidden" name="id_coisa_curtida" value="' . $row["postagem_id"] . '">
                        <button name="btn-curtir" type="submit" class="btn position-relative">
                            <h3>&#129505</h3>
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                ' . $row["total_curtidas"] . '
                                <span class="visually-hidden">Curtidas</span>
                            </span>
                        </button>
                    </form>
                </div>
                <div class="col-lg-1 pt-2">
                    <form method="post">
                        <button name="botao_teste" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#CommentsModal">
                            &#128488
                        </button>
                    </form>
                </div>
                <div class="col-lg-1 pt-2 ms-5">
                    <h3>&#128386</h3>
                </div>
            </div>
        </div>
    </div>
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
                            <input type="hidden" name="id_coisa_comentada" value="' . $row["postagem_id"] . '">
                            <input type="text" class="form-control ms-3" id="InputComment" name="InputComment" placeholder="Digite seu comentário">
                            <label for="InputComment" class="ms-3">Comentário</label>
                        </div>
                        <button class="btn btn-dark botao" name="botaoComment">Enviar</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                </div>
            </div>
        </div>
    </div>
    <!-- FIM - POSTAGEM DA COISA -->';
                }
            } else {
                echo "0 results";
            }
            $conn->close();
            ?>

        </div>

    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Poste uma ideia</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post" enctype="multipart/form-data"> <!-- adicionado enctype -->
                    <div class="modal-body">
                        <h3>Preencha os dados</h3>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" name="inputTitulo" id="inputTitulo" placeholder="Título">
                            <label for="inputTitulo">Título</label>
                        </div>
                        <div class="form-floating mb-3">
                            <textarea class="form-control" name="inputDescricao" id="inputDescricao" placeholder="Descrição"></textarea>
                            <label for="inputDescricao">Descrição</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="file" class="form-control" name="inputImagem" id="inputImagem" placeholder="Imagem">
                            <label for="inputImagem">Arquivo da Imagem</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input class="form-control" name="inputTags" id="inputTag" placeholder="Tags"></input>
                            <label for="inputTag">Tags</label>
                        </div>
                        <p>Formato de tags: "#culinária; #literatura; #qualquercoisa"</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button name="botao_postar" type="submit" class="btn btn-primary">Postar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#CommentsModal">
        Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="CommentsModa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <input type="text" class="form-control ms-3" id="InputComment" name="InputComment" placeholder="Digite seu comentário">
                            <label for="InputComment" class="ms-3">Comentário</label>
                        </div>
                        <button class="btn btn-dark botao" name="botaoComment">Enviar</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                </div>
            </div>
        </div>
    </div>

    <!--
        <div class="col-lg-1">
            <h3>&#129505</h3>
        </div>
    -->

</body>

</html>