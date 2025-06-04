
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pacman</title>
    <style>
        body {
            margin: 0;
            background-color: black; 
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
        }
        #game-container {
            position: relative;
        }
        canvas {
            display: block;
        }
        #debug {
            color: white;
            position: absolute;
            top: 10px;
            left: 10px;
        }

        #btn-fechar {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 28px;
        text-decoration: none;
        color: white;
        background: rgba(0, 0, 0, 0.5);
        padding: 4px 10px;
        border-radius: 50%;
        transition: background 0.3s ease;
        z-index: 1000;
        }

    #btn-fechar:hover {
        background: red;
        color: white;
    }

    </style>
</head>

<body>
    <div id="game-container">
        <canvas id="canvas" width="448" height="600"></canvas>
    </div>

    <div style="display: none">
        <img id="animations" src="assets/animations.png" alt="Pacman Animations">
        <img id="ghost-red" src="assets/ghost-red.png" alt="Red Ghost">
        <img id="ghost-orange" src="assets/ghost-orange.png" alt="Orange Ghost">
        <img id="ghost-blue" src="assets/ghost-blue.png" alt="Blue Ghost">
        <img id="ghost-pink" src="assets/ghost-pink.png" alt="Pink Ghost">
        <img id="map-image" src="assets/map.png" alt="Map Image">
        <img id="startMenuImage" src="assets/pacman-start-menu.png">
    </div>

    <script src="pacman.js"></script>
    <script src="ghost.js"></script>
    <script src="game.js"></script>
    <a href="../entrada.php" id="btn-fechar" title="Voltar para o site">✕</a>
</body>

</html>
