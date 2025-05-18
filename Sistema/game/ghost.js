class Ghost {
    constructor(x, y, color, speed, ghostNumber) {
        this.x = Math.floor(x / oneBlockSize) * oneBlockSize;
        this.y = Math.floor(y / oneBlockSize) * oneBlockSize;
        this.color = color;            // Índice para a cor do fantasma
        this.speed = 2;               // Reduced speed for better control
        this.direction = DIRECTION_UP;            // Direção atual
        this.nextDirection = DIRECTION_UP;        // Próxima direção
        this.frameCount = 0;           // Para animação de movimento
        this.ghostNumber = ghostNumber;
        this.size = oneBlockSize;
        this.isInGhostHouse = true;    // Começa na casa dos fantasmas
        this.hasLeftGhostHouse = false; // Indica se já saiu da casa
        this.releaseTime = ghostNumber * 2000;  // 2 seconds per ghost
        this.startTime = Date.now();  // Marca o tempo de início
    }

    draw() {
        // Usa o array de imagens para acessar a imagem correta para cada fantasma
        const ghostImg = ghostImages[this.color];

        // Desenha o fantasma com sua imagem específica
        canvasContext.drawImage(
            ghostImg,           // Imagem do fantasma específico
            0,                  // Sem deslocamento X na imagem fonte
            0,                  // Sem deslocamento Y na imagem fonte
            32,                 // Largura original na imagem fonte (32px)
            32,                 // Altura original na imagem fonte (32px)
            this.x,             // Posição X na tela
            this.y,             // Posição Y na tela
            this.size,          // Largura na tela
            this.size           // Altura na tela
        );
    }

    moveProcess() {
        if (this.isInGhostHouse) {
            if (this.checkReleaseTime()) {
                this.exitGhostHouse();
            } else {
                this.moveInGhostHouse();
            }
            return;
        }

        if (this.isAtGridPosition()) {
            if (Math.random() < 0.3) {
                this.changeDirection();
            }
        }

        if (this.canMove()) {
            this.move();
        } else {
            this.forceChangeDirection();
            if (this.canMove()) {
                this.move();
            }
        }
    }
    
    checkReleaseTime() {
        if (!this.isInGhostHouse) return false;
        
        const currentTime = Date.now();
        return (currentTime - this.startTime > this.releaseTime);
    }

    exitGhostHouse() {
        const exitX = 14 * oneBlockSize;
        const exitY = 13 * oneBlockSize - 4;

        if (Math.abs(this.x - exitX) > 2) {
            this.x += (this.x < exitX) ? 2 : -2;
            return;
        }

        this.x = exitX;

        if (this.y > exitY) {
            this.y -= 2;
        } else {
            // Successfully exited - update state
            this.isInGhostHouse = false;
            this.hasLeftGhostHouse = true;
            this.direction = DIRECTION_UP;
            this.y = exitY; // Ensure exact position
        }
    }

    moveInGhostHouse() {
        // Simple up/down movement inside the ghost house
        if (this.frameCount % 20 < 10) {
            this.y += 0.5;
        } else {
            this.y -= 0.5;
        }
        this.frameCount++;
    }

    isAtGridPosition() {
        const gridX = Math.floor(this.x / oneBlockSize) * oneBlockSize;
        const gridY = Math.floor(this.y / oneBlockSize) * oneBlockSize;

        return (Math.abs(this.x - gridX) < 2 && 
                Math.abs(this.y - gridY) < 2);
    }

    move() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x += this.speed;
                break;
            case DIRECTION_UP:
                this.y -= this.speed;
                break;
            case DIRECTION_LEFT:
                this.x -= this.speed;
                break;
            case DIRECTION_BOTTOM:
                this.y += this.speed;
                break;
        }

        this.handleMapBoundaries();

        this.alignToGrid();
    }
    
    // Add teleportation through sides of the map
    handleMapBoundaries() {
        const mapWidth = map[0].length * oneBlockSize;
        
        // Teleport from right to left
        if (this.x > mapWidth - oneBlockSize/2) {
            this.x = 0;
        }
        // Teleport from left to right
        else if (this.x < -oneBlockSize/2) {
            this.x = mapWidth - oneBlockSize;
        }
    }
    
    alignToGrid() {
        if (this.direction == DIRECTION_RIGHT || this.direction == DIRECTION_LEFT) {
            const gridY = Math.floor((this.y + oneBlockSize/2) / oneBlockSize) * oneBlockSize;
            if (Math.abs(this.y - gridY) < 3) {
                this.y = gridY;
            }
        } else {
            const gridX = Math.floor((this.x + oneBlockSize/2) / oneBlockSize) * oneBlockSize;
            if (Math.abs(this.x - gridX) < 3) {
                this.x = gridX;
            }
        }
    }

    getOppositeDirection() {
        switch (this.direction) {
            case DIRECTION_RIGHT: return DIRECTION_LEFT;
            case DIRECTION_LEFT: return DIRECTION_RIGHT;
            case DIRECTION_UP: return DIRECTION_BOTTOM;
            case DIRECTION_BOTTOM: return DIRECTION_UP;
            default: return null;
        }
    }

    isInsideGhostHouse(x, y) {
        return (x >= 13 && x <= 15 && y >= 13 && y <= 15);
    }
    
    // Check if a position is at the ghost house door
    isGhostHouseDoor(x, y) {
        return (x === 14 && y === 13);
    }

    // Choose a new random direction favoring valid paths
    changeDirection() {
        const possibleDirections = [];
        const oppositeDirection = this.getOppositeDirection();
        
        // Get current grid position
        const x = Math.floor(this.x / oneBlockSize);
        const y = Math.floor(this.y / oneBlockSize);
        
        // Check each direction (avoiding opposite direction and ghost house)
        
        // Right
        if (DIRECTION_RIGHT !== oppositeDirection && 
            this.isValidMove(x+1, y)) {
            possibleDirections.push(DIRECTION_RIGHT);
        }
        
        // Up
        if (DIRECTION_UP !== oppositeDirection && 
            this.isValidMove(x, y-1)) {
            possibleDirections.push(DIRECTION_UP);
        }
        
        // Left
        if (DIRECTION_LEFT !== oppositeDirection && 
            this.isValidMove(x-1, y)) {
            possibleDirections.push(DIRECTION_LEFT);
        }
        
        // Down
        if (DIRECTION_BOTTOM !== oppositeDirection && 
            this.isValidMove(x, y+1)) {
            possibleDirections.push(DIRECTION_BOTTOM);
        }
        
        // Choose random direction from possibilities
        if (possibleDirections.length > 0) {
            this.direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
        }
    }
    
    // Check if a grid position is valid for movement
    isValidMove(x, y) {
        // Check map boundaries
        if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) {
            return false;
        }
        
        // Check if position is a wall
        if (map[y][x] === 1) {
            return false;
        }
        
        // Check if position is inside ghost house (after leaving)
        if (this.hasLeftGhostHouse && this.isInsideGhostHouse(x, y)) {
            return false;
        }
        
        return true;
    }
    
    // Force direction change when stuck
    forceChangeDirection() {
        const possibleDirections = [];
        
        // Get current grid position
        const x = Math.floor(this.x / oneBlockSize);
        const y = Math.floor(this.y / oneBlockSize);
        
        // Check all four directions
        if (this.isValidMove(x+1, y)) possibleDirections.push(DIRECTION_RIGHT);
        if (this.isValidMove(x, y-1)) possibleDirections.push(DIRECTION_UP);
        if (this.isValidMove(x-1, y)) possibleDirections.push(DIRECTION_LEFT);
        if (this.isValidMove(x, y+1)) possibleDirections.push(DIRECTION_BOTTOM);
        
        // If no valid directions, try ignoring ghost house restriction
        if (possibleDirections.length === 0) {
            if (x+1 < map[0].length && map[y][x+1] !== 1) possibleDirections.push(DIRECTION_RIGHT);
            if (y-1 >= 0 && map[y-1][x] !== 1) possibleDirections.push(DIRECTION_UP);
            if (x-1 >= 0 && map[y][x-1] !== 1) possibleDirections.push(DIRECTION_LEFT);
            if (y+1 < map.length && map[y+1][x] !== 1) possibleDirections.push(DIRECTION_BOTTOM);
        }
        
        // Choose random direction
        if (possibleDirections.length > 0) {
            this.direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
        }
    }

    // Check if ghost can move in current direction
    canMove() {
        // Calculate next position
        let nextX = this.x;
        let nextY = this.y;
        
        // Adjust based on direction
        switch (this.direction) {
            case DIRECTION_RIGHT: nextX += this.speed; break;
            case DIRECTION_UP: nextY -= this.speed; break;
            case DIRECTION_LEFT: nextX -= this.speed; break;
            case DIRECTION_BOTTOM: nextY += this.speed; break;
        }
        
        // Calculate grid positions for all corners
        const nextBlockTopLeft = {
            x: Math.floor(nextX / oneBlockSize),
            y: Math.floor(nextY / oneBlockSize)
        };
        
        const nextBlockTopRight = {
            x: Math.floor((nextX + this.size - 1) / oneBlockSize),
            y: Math.floor(nextY / oneBlockSize)
        };
        
        const nextBlockBottomLeft = {
            x: Math.floor(nextX / oneBlockSize),
            y: Math.floor((nextY + this.size - 1) / oneBlockSize)
        };
        
        const nextBlockBottomRight = {
            x: Math.floor((nextX + this.size - 1) / oneBlockSize),
            y: Math.floor((nextY + this.size - 1) / oneBlockSize)
        };
        
        // Check all corners for boundaries or walls
        const corners = [
            nextBlockTopLeft,
            nextBlockTopRight,
            nextBlockBottomLeft,
            nextBlockBottomRight
        ];
        
        for (const corner of corners) {
            // Check map boundaries
            if (corner.x < 0 || corner.y < 0 || 
                corner.x >= map[0].length || corner.y >= map.length) {
                // Allow wraparound at map edges (teleport)
                if ((corner.x < 0 || corner.x >= map[0].length) && 
                    (corner.y >= 10 && corner.y <= 20)) {
                    // This is for tunnels - allow movement
                    continue;
                }
                return false;
            }
            
            // Check for walls
            if (map[corner.y][corner.x] === 1) {
                return false;
            }
            
            // Check ghost house restriction
            if (this.hasLeftGhostHouse && this.isInsideGhostHouse(corner.x, corner.y)) {
                // Special case: allow exit through door when moving up
                if (this.isGhostHouseDoor(corner.x, corner.y) && this.direction === DIRECTION_UP) {
                    return true;
                }
                return false;
            }
        }
        
        return true;
    }
}