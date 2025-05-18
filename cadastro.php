<form id="cadastro" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
    <h2>Faça seu cadastro</h2>
    <input type="hidden" name="formulario" value="cadastro">
    <div class="form-floating mb-3">
        <input type="text" class="form-control <?php echo $ErroNome; ?>" id="floatingInput" name="inputnome" placeholder="Name">
        <label for="floatingInput">Nome</label>
    </div>
    <div class="form-floating mb-3">
        <input type="number" class="form-control <?php echo $ErroIdade; ?>" id="floatingInput" name="inputidade" placeholder="Idade"> <!-- mudar o type para um adequado a idade -->
        <label for="floatingInput">Idade</label>
    </div>
    <div class="form-floating mb-3">
        <input type="email" class="form-control <?php echo $ErroEmail; ?>" id="floatingInput" name="inputemail" placeholder="name@example.com">
        <label for="floatingInput">Email</label>
    </div>
    <div class="form-floating">
        <input type="password" class="form-control <?php echo $ErroSenha; ?>" id="inputsenha" name="inputsenha" placeholder="Password">
        <span class="btnver" onclick="verSenha()">
            <h4 id="botaoVerSenha">&#128529</h4>
        </span> <!-- &#128529 -->
        <label for="floatingPassword">Senha</label>
    </div>
    <button type="submit" class="btn btn-dark mt-3">Enviar</button>
</form>