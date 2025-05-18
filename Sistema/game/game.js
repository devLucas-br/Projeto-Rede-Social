const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animations");
const ghostRedImg = document.getElementById("ghost-red");
const ghostOrangeImg = document.getElementById("ghost-orange");
const ghostBlueImg = document.getElementById("ghost-blue");
const ghostPinkImg = document.getElementById("ghost-pink");
const mapImage = document.getElementById("map-image");

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
    const x = 0;
    const y = oneBlockSize * (map.length + 2);
    const width = 200;
    const height = 30;

    canvasContext.fillStyle = "black";
    canvasContext.fillRect(x, y - height + 5, width, height);

    canvasContext.font = "20px Emulogic";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Score: " + score, x, y);
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
    
    // Limpa o canvas
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    
    // Exibe mensagem de vitória com animação simples
    let fontSize = 20;
    let growing = true;
    let maxSize = 60;
    let minSize = 40;
    
    // Importante: Limpar qualquer animação anterior que possa estar rodando
    if (victoryAnimation) {
        clearInterval(victoryAnimation);
    }
    
    // Use a variável global, sem "let" para não criar uma nova variável local
    victoryAnimation = setInterval(() => {
        // Limpa o canvas
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        
        // Desenha o texto de vitória com tamanho animado
        canvasContext.font = '${fontSize}px Emulogic';
        canvasContext.fillStyle = "yellow";
        canvasContext.textAlign = "center";
        canvasContext.fillText("VITÓRIA!", canvas.width / 2, canvas.height / 2);
        
        // Exibe a pontuação final
        canvasContext.font = "20px Emulogic";
        canvasContext.fillStyle = "white";
        canvasContext.fillText('Pontuação: ${score}', canvas.width / 2, canvas.height / 2 + 60);
        
        // Anima o tamanho do texto
        if (growing) {
            fontSize += 0.5;
            if (fontSize >= maxSize) growing = false;
        } else {
            fontSize -= 0.5;
            if (fontSize <= minSize) growing = true;
        }
    }, 50);

    setTimeout(() => {
        canvasContext.font = "16px Emulogic";
        canvasContext.fillStyle = "white";
        canvasContext.textAlign = "center";
        canvasContext.fillText(
            "Pressione ESPAÇO para jogar novamente", 
            canvas.width / 2, 
            canvas.height / 2 + 100
        );
        
        // Remove qualquer handler anterior para evitar duplicação
        document.removeEventListener("keydown", restartGameHandler);
        // Adiciona evento para reiniciar
        document.addEventListener("keydown", restartGameHandler);
    }, 2000);
};

let gameOver = () => {
    // Pausa o jogo
    clearInterval(gameInterval);
    
    // Exibe mensagem de game over
    canvasContext.font = "40px Emulogic";
    canvasContext.fillStyle = "red";
    canvasContext.fillText("GAME OVER", canvas.width / 4, canvas.height / 2);
    
    // Adiciona botão para reiniciar
    setTimeout(() => {
        canvasContext.font = "20px Emulogic";
        canvasContext.fillStyle = "white";

        canvasContext.fillText(
        "Pressione ESPAÇO para tentar novamente", 
        canvas.width / 8, 
        canvas.height / 2 + 40
        );
        
        // Evento para reiniciar o jogo
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
    // Garantir que a animação de vitória seja interrompida
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
    
    // Reinicia o loop do jogo
    gameInterval = setInterval(gameLoop, 1000 / fps);
};


let gameLoop = () => {
    update();
    draw();
};


createNewPacman();
createGhosts();
let gameInterval = setInterval(gameLoop, 1000 / fps);


window.addEventListener("keydown", (event) => {
    let k = event.keyCode;

    setTimeout(() => {
        if (k == 37 || k == 65) {
            //esquerda

            pacman.nextDirection = DIRECTION_LEFT;
        } else if (k == 38 || k == 87) {
            //cima

            pacman.nextDirection = DIRECTION_UP;
        } else if (k == 39 || k == 68) {
            // direita 

            pacman.nextDirection = DIRECTION_RIGHT;
        } else if (k == 40 || k == 83) {
            // baixo 

            pacman.nextDirection = DIRECTION_BOTTOM;
        }
    }, 1)
});