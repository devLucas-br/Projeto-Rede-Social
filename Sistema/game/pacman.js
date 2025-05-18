class Pacman {
    constructor(x, y, width, heght, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = heght;
        this.speed = 4;
        this.direction = DIRECTION_RIGHT;
        this.nextDirection = this.direction;
        this.currentFrame = 1;
        this.frameCount = 7;

        setInterval(() => {
            this.changeAnimation();
        }, 70)
    }

    moveProcess() {
        this.changeDirectionIfPossible();
        this.moveFowards();
        if (this.checkCollision()) {
            this.moveBackwards();
        }
        this.handleMapBoundaries();
    }

    handleMapBoundaries() {
        const mapWidth = map[0].length * oneBlockSize;
        
        // Teleporte da direita para a esquerda
        if (this.x > mapWidth - oneBlockSize/2) {
            this.x = 0;
        }
        // Teleporte da esquerda para a direita
        else if (this.x < -oneBlockSize/2) {
            this.x = mapWidth - oneBlockSize;
        }
    }

    eat() {
        for(let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[0].length; j++) {
                if (
                    map[i][j] == 2 &&
                    this.getMapX() == j &&
                    this.getMapY() == i
                ) {
                    map[i][j] = 3;
                    score += 10;

                    checkVictory();
                }
            }
        }
    }

    moveFowards() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x += this.speed
                break

            case DIRECTION_UP:
                this.y -= this.speed
                break

            case DIRECTION_LEFT:
                this.x -= this.speed
                break

            case DIRECTION_BOTTOM:
                this.y += this.speed
                break


        }
    }

    moveBackwards() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x -= this.speed
                break

            case DIRECTION_UP:
                this.y += this.speed
                break

            case DIRECTION_LEFT:
                this.x += this.speed
                break

            case DIRECTION_BOTTOM:
                this.y -= this.speed
                break
        }
    }

    checkCollision() {
        let isColided = false;
        if (
            map[this.getMapY()][this.getMapX()] == 1 ||
            map[this.getMapYRightSide()][this.getMapX()] == 1 ||
            map[this.getMapY()][this.getMapXRightSide()] == 1 ||
            map[this.getMapYRightSide()][this.getMapXRightSide()] == 1
        ) {
            return true;
        }
        return false;
    }

    checkGhostColision() {
        // Raio de colisão (metade do tamanho de um bloco)
        const collisionRadius = oneBlockSize / 2;
        
        for (let i = 0; i < ghosts.length; i++) {
            // Calcula a distância entre o centro do Pacman e o centro do fantasma
            const centerX = this.x + oneBlockSize / 2;
            const centerY = this.y + oneBlockSize / 2;
            const ghostCenterX = ghosts[i].x + oneBlockSize / 2;
            const ghostCenterY = ghosts[i].y + oneBlockSize / 2;
            
            const distance = Math.sqrt(
                Math.pow(centerX - ghostCenterX, 2) + 
                Math.pow(centerY - ghostCenterY, 2)
            );
            
            // Se a distância for menor que a soma dos raios, houve colisão
            if (distance < collisionRadius * 1.5) {
                console.log("Colisão com fantasma detectada!");
                gameOver();
                return true;
            }
        }
        return false;
    }

    changeDirectionIfPossible() {
        if (this.direction == this.nextDirection) return;

        let tempDirection = this.direction;
        this.direction = this.nextDirection;
        this.moveFowards();
        if(this.checkCollision()) {
            this.moveBackwards();
            this.direction = tempDirection;
        } else {
            this.moveBackwards();
        }
    }

    changeAnimation() {
        this.currentFrame = this.currentFrame == this.frameCount ? 1: this.currentFrame + 1;
    }

    draw() {
        canvasContext.save();
        canvasContext.translate(
            this.x + oneBlockSize / 2, 
            this.y + oneBlockSize / 2
        );
        canvasContext.rotate((this.direction * 90 * Math.PI) / 180)

        canvasContext.translate(
            -this.x - oneBlockSize / 2, 
            -this.y - oneBlockSize / 2
        );

        canvasContext.drawImage(
            pacmanFrames,
            (this.currentFrame - 1) * 32,
            0,
            32,
            32,
            this.x,
            this.y,
            this.width,
            this.height
        );

        canvasContext.restore();
    }

    getMapX() {
        return parseInt(this.x / oneBlockSize)
    }

    getMapY() {
        return parseInt(this.y / oneBlockSize)
    }

    getMapXRightSide() {
        return parseInt((this.x + 0.9999 * oneBlockSize) / oneBlockSize)
    }

    getMapYRightSide() {
        return parseInt((this.y + 0.9999 * oneBlockSize) / oneBlockSize)
    }

}
