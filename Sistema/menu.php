<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<nav class="navbar navbar-expand-lg nav-color" data-bs-theme="dark"> <!-- bg-body-tertiary -->
    <div class="container-fluid">
        <a class="navbar-brand" href="entrada.php">Projeto</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="entrada.php">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="entrada.php" data-bs-toggle="modal" data-bs-target="#exampleModal">Postar</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="game/jogo.php">Pac-Man</a>
                </li>
                <!--
                <li class="nav-item">
                    <a class="nav-link" href="perfil.php">Perfil</a>
                </li>
                
                <li class="nav-item dropdown perfil">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="../imagens/<?php echo $_SESSION["foto"]; ?>" alt="foto do usuário <?php echo $_SESSION["nome"]; ?>" class="rounded-circle me-2" style="max-width: 32px;">
                        <strong>
                            <?php echo $_SESSION["nome"] ?>
                        </strong>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="perfil.php">Perfil</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <form action="sair_fora.php" method="post">
                                <button name="botao_sair" type="submit">Sair</button>
                            </form>
                        </li>
                    </ul>
                </li>
                -->
                <!--
                <li class="nav-item">
                    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
                -->
            </ul>
            <form method="GET" action="entrada.php" class="d-flex" role="search">
                <!-- imagem do usuário -->
                <!-- style="max-width: 45px;" -->
                <input name="busca" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <ul style="list-style-type: none;" class="text-light">
                <li class="nav-item dropdown perfil">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="../imagens/<?php echo $_SESSION["foto"]; ?>" alt="foto do usuário <?php echo $_SESSION["nome"]; ?>" class="rounded-circle me-2" style="max-width: 32px;">
                        <strong>
                            <?php echo $_SESSION["nome"] ?>
                        </strong>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="perfil.php">Perfil</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <form action="sair_fora.php" method="post">
                                <button name="botao_sair" type="submit">Sair</button>
                            </form>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>