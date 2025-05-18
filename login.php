<form id="login" action="" method="post">
    <h2>Faça seu login</h2>
    <input type="hidden" name="formulario" value="login">
    <div class="form-floating mb-3">
        <input type="email" class="form-control <?php echo $ErroEmail; ?>" id="floatingInput" name="inputemail" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
        <input type="password" class="form-control <?php echo $ErroSenha; ?>" id="inputsenhalogin" name="inputsenha" placeholder="Password">
        <span class="btnver" onclick="verSenhaLogin()">
            <h4 id="botaoVerSenhaLogin">&#128529</h4></i>
        </span>
        <label for="floatingPassword">Password</label>
    </div>
    <button type="submit" class="btn btn-dark mt-3">Enviar</button>
</form>