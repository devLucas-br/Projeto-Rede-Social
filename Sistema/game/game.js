const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animations");
const ghostRedImg = document.getElementById("ghost-red");
const ghostOrangeImg = document.getElementById("ghost-orange");
const ghostBlueImg = document.getElementById("ghost-blue");
const ghostPinkImg = document.getElementById("ghost-pink");
const mapImage = document.getElementById("map-image");
const startMenuImage = document.getElementById("startMenuImage");

let createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
};

let fps = 30;
let oneBlockSize = 16;
let wallColor = "#342DCA";
let wallSpaceWidht = oneBlockSize / 1.5;
let wallOfset = (oneBlockSize - wallSpaceWidht) / 2;
let wallInnerColor = "black";
let foodCollor = "#FEB897";
let score = 0;
const ghostImages = [ghostRedImg, ghostOrangeImg, ghostBlueImg, ghostPinkImg];

const GHOST_RED = 0;
const GHOST_ORANGE = 1;
const GHOST_BLUE = 2;
const GHOST_PINK = 3;
const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_BOTTOM = 1;
const GHOST_HOUSE_EXIT = 5;
const EMPTY = 0;
const WALL = 1;
const FOOD = 2;
const POWER_PELLET = 3;
const GHOST_HOUSE = 4;
const GHOST_DOOR = 5;
const GAME_STATE_MENU = 0;
const GAME_STATE_PLAYING = 1;
const GAME_STATE_GAME_OVER = 2;
const GAME_STATE_WIN = 3;

let currentGameState = GAME_STATE_MENU;

let ghosts = [];

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 2, 1, 1, 0, 1, 1, 1, 5, 5, 1, 1, 1, 0, 1, 1, 2, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 4, 4, 4, 4, 4, 4, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1],
    [1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1],
    [1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
map[13][14] = GHOST_DOOR;



let update = () => {
    pacman.moveProcess();
    pacman.eat();

    if (pacman.checkGhostColision()) {
        return;
    }

    ghosts.forEach(ghost => {
        ghost.moveProcess();
    });

    pacman.checkGhostColision();
};


let drawFoods = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == 2) {
                createRect(
                    j * oneBlockSize + oneBlockSize / 3,
                    i * oneBlockSize + oneBlockSize / 3,
                    oneBlockSize / 5,
                    oneBlockSize / 5,
                    foodCollor
                );
            }
        }
    }
}

let drawGhostHouse = () => {
    // Desenha uma linha horizontal acima da casa dos fantasmas
    canvasContext.strokeStyle = "#FFFFFF";
    canvasContext.lineWidth = 2;
    canvasContext.beginPath();

    // Posição da porta - ajuste conforme seu mapa
    const doorY = 13 * oneBlockSize;
    const doorStartX = 13 * oneBlockSize;
    const doorWidth = 2 * oneBlockSize;

    canvasContext.moveTo(doorStartX, doorY);
    canvasContext.lineTo(doorStartX + doorWidth, doorY);
    canvasContext.stroke();
}

let drawScore = () => {
    // Salva o estado atual do contexto
    canvasContext.save();
    
    const x = 10;
    const y = oneBlockSize * (map.length + 1) + 20;
    const width = 200;
    const height = 30;

    // Fundo para o score
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(x - 5, y - height + 5, width, height);

    // Configura o texto do score
    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "yellow";
    canvasContext.textAlign = "left";
    canvasContext.textBaseline = "top";
    canvasContext.fillText("Score: " + score, x, y - 20);
    
    // Restaura o estado anterior do contexto
    canvasContext.restore();
};

let checkVictory = () => {
    // Conta quantas comidas ainda restam no mapa
    let remainingFood = 0;
    
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === 2) { // 2 representa comida
                remainingFood++;
            }
        }
    }
    
    // Se não houver mais comida, o jogador ganhou
    if (remainingFood === 0) {
        victory();
        return true;
    }
    
    return false;
};

let draw = () => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.drawImage(mapImage, 0, 0);
    drawFoods();
    drawGhostHouse();
    pacman.draw();
    ghosts.forEach(ghost => ghost.draw());
    drawScore();
};


let createNewPacman = () => {
    pacman = new Pacman(
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize / 5
    );
};

let createGhosts = () => {
    ghosts = [];

    const positions = [
        { x: 13.5 * oneBlockSize, y: 14 * oneBlockSize },  // Red (left)
        { x: 14.5 * oneBlockSize, y: 14 * oneBlockSize },  // Orange (right)
        { x: 13.5 * oneBlockSize, y: 13.5 * oneBlockSize }, // Blue (top-left)
        { x: 14.5 * oneBlockSize, y: 13.5 * oneBlockSize }  // Pink (top-right)
    ];

    const releaseTimes = [1000, 3000, 5000, 7000]; // ms

    for (let i = 0; i < 4; i++) {
        const ghost = new Ghost(
            positions[i].x, 
            positions[i].y,
            i,     // color index
            2,
            i      // ghost number
        );
        
        ghost.releaseTime = releaseTimes[i];
        ghost.startTime = Date.now();
        ghost.isInGhostHouse = true;
        ghost.hasLeftGhostHouse = false;
        
        ghosts.push(ghost);
    }
};

let victoryAnimation;

let victory = () => {
    // Pausa o jogo
    clearInterval(gameInterval);
    
    // Para qualquer animação anterior
    if (victoryAnimation) {
        clearInterval(victoryAnimation);
        victoryAnimation = null;
    }
    
    // Limpa o canvas
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    
    // Variáveis para animação
    let fontSize = 40;
    let growing = true;
    let maxSize = 60;
    let minSize = 40;
    let animationCounter = 0;
    const maxAnimationTime = 150; // ~3 segundos a 50ms por frame
    
    victoryAnimation = setInterval(() => {
        animationCounter++;
        
        // Limpa o canvas
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        
        // Configura alinhamento centralizado
        canvasContext.textAlign = "center";
        canvasContext.textBaseline = "middle";
        
        // Desenha o texto de vitória com animação
        canvasContext.font = fontSize + "px Arial";
        canvasContext.fillStyle = "yellow";
        canvasContext.fillText("VITÓRIA!", canvas.width / 2, canvas.height / 2 - 60);
        
        // Exibe a pontuação
        canvasContext.font = "24px Arial";
        canvasContext.fillStyle = "white";
        canvasContext.fillText("Pontuação: " + score, canvas.width / 2, canvas.height / 2);
        
        // Anima o tamanho do texto
        if (growing) {
            fontSize += 0.8;
            if (fontSize >= maxSize) growing = false;
        } else {
            fontSize -= 0.8;
            if (fontSize <= minSize) growing = true;
        }
        
        // Após 3 segundos, para a animação e mostra tela final
        if (animationCounter >= maxAnimationTime) {
            clearInterval(victoryAnimation);
            victoryAnimation = null;
            showFinalVictoryScreen();
        }
    }, 50);
};

let showFinalVictoryScreen = () => {
    // Limpa o canvas
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    
    // Configura alinhamento centralizado
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "middle";
    
    // Título de vitória
    canvasContext.font = "50px Arial";
    canvasContext.fillStyle = "yellow";
    canvasContext.fillText("VITÓRIA!", canvas.width / 2, canvas.height / 2 - 80);
    
    // Pontuação
    canvasContext.font = "24px Arial";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Pontuação: " + score, canvas.width / 2, canvas.height / 2 - 20);
    
    // Instrução para reiniciar
    canvasContext.font = "18px Arial";
    canvasContext.fillStyle = "cyan";
    canvasContext.fillText("Pressione ESPAÇO para jogar novamente", canvas.width / 2, canvas.height / 2 + 40);
    
    // Remove handlers anteriores e adiciona novo
    document.removeEventListener("keydown", restartGameHandler);
    document.addEventListener("keydown", restartGameHandler);
};


let gameOver = () => {
    // Pausa o jogo
    clearInterval(gameInterval);
    
    // Para qualquer animação de vitória
    if (victoryAnimation) {
        clearInterval(victoryAnimation);
        victoryAnimation = null;
    }
    
    // Limpa o canvas
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    
    // Configura alinhamento centralizado
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "middle";
    
    // Exibe mensagem de game over
    canvasContext.font = "40px Arial";
    canvasContext.fillStyle = "red";
    canvasContext.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 40);
    
    // Pontuação final
    canvasContext.font = "24px Arial";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Pontuação: " + score, canvas.width / 2, canvas.height / 2);
    
    // Adiciona instrução para reiniciar após 2 segundos
    setTimeout(() => {
        canvasContext.font = "18px Arial";
        canvasContext.fillStyle = "cyan";
        canvasContext.fillText("Pressione ESPAÇO para tentar novamente", canvas.width / 2, canvas.height / 2 + 40);
        
        // Remove handlers anteriores e adiciona novo
        document.removeEventListener("keydown", restartGameHandler);
        document.addEventListener("keydown", restartGameHandler);
    }, 2000);
};

let restartGameHandler = (event) => {
    if (event.keyCode === 32) { // Código da tecla espaço
        // IMPORTANTE: Limpar a animação de vitória
        if (victoryAnimation) {
            clearInterval(victoryAnimation);
            victoryAnimation = null;
        }
        
        document.removeEventListener("keydown", restartGameHandler);
        restartGame();
    }
};

let restartGame = () => {

    if (victoryAnimation) {
        clearInterval(victoryAnimation);
        victoryAnimation = null;
    }
    
    // Reinicia o mapa (restaura comidas)
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === 3) map[i][j] = 2; // Restaura comida
        }
    }
    
    // Reinicia pontuação
    score = 0;
    
    // Recria pacman e fantasmas
    createNewPacman();
    createGhosts();
    
    // Limpar o canvas antes de reiniciar
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    
    if (currentGameState === GAME_STATE_PLAYING) {
        gameInterval = setInterval(gameLoop, 1000 / fps);
    }

};

let drawMenu = () => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    if (startMenuImage.complete) { // Garante que a imagem foi carregada
        canvasContext.drawImage(startMenuImage, 0, 0, canvas.width, canvas.height);
    } else {
        // Fallback se a imagem não carregar, ou um loader
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        canvasContext.fillStyle = "white";
        canvasContext.font = "24px Arial";
        canvasContext.textAlign = "center";
        canvasContext.fillText("Pressione ESPAÇO para Iniciar", canvas.width / 2, canvas.height / 2);
    }
};


let gameLoop = () => {
    if (currentGameState === GAME_STATE_PLAYING) {
        update();
        draw();
    } else if (currentGameState === GAME_STATE_MENU) {
        drawMenu();
    }
};

window.addEventListener("keydown", (event) => {
    let k = event.keyCode;

    // Lidar com o estado do menu
    if (currentGameState === GAME_STATE_MENU && k === 32) {
        currentGameState = GAME_STATE_PLAYING;
        createNewPacman();
        createGhosts();
        gameInterval = setInterval(gameLoop, 1000 / fps); 
        return;
    }

    setTimeout(() => {
        if (k == 37 || k == 65) {
            //esquerda
            pacman.nextDirection = DIRECTION_LEFT;
        } else if (k == 38 || k == 87) {
            //cima
            pacman.nextDirection = DIRECTION_UP;
        } else if (k == 39 || k == 68) {
            //direita
            pacman.nextDirection = DIRECTION_RIGHT;
        } else if (k == 40 || k == 83) {
            //baixo
            pacman.nextDirection = DIRECTION_BOTTOM;
        }
    }, 1);
});

gameLoop(); 