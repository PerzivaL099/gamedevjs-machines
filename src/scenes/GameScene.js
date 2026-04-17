import * as Phaser from 'phaser';

// Exportamos las constantes por si otro archivo las necesita
export const TILE_SIZE = 64; 
export const COLS = 13;
export const ROWS = 10;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.logicGrid = []; 
        this.gameState = 'BUILDING'; 
    }

    create() {
        this.statusText = this.add.text(20, 20, '> MODO: CONSTRUCCIÓN (Presiona ESPACIO)', { 
            fontFamily: 'monospace', 
            fontSize: '20px', 
            fill: '#00ff88' 
        });

        this.drawGrid();
        this.initializeGrid();

        // --- INPUTS ---
        this.input.on('pointerdown', (pointer) => {
            this.handleGridClick(pointer);
        });

        this.input.keyboard.on('keydown-SPACE', () => {
            this.toggleGameState();
        });

        // TECLA 'I' para inyectar un item de prueba en [1][1]
        // TECLA 'I' para inyectar un item de prueba en [1][1]
        this.input.keyboard.on('keydown-I', () => {
            const cell = this.logicGrid[1][1]; 
            
            if (cell.id === 1 && cell.item_id === null) {
                cell.item_id = 99; 
                
                const itemSprite = this.add.graphics();
                itemSprite.fillStyle(0xffff00, 1);
                
                // CORRECCIÓN: Dibujamos el cuadro en su origen local (0,0)
                itemSprite.fillRect(0, 0, 32, 32); 
                
                // CORRECCIÓN: Movemos la posición 'x' e 'y' de todo el objeto
                itemSprite.x = 1 * TILE_SIZE + 16;
                itemSprite.y = 1 * TILE_SIZE + 16;
                
                cell.item_sprite = itemSprite;
                console.log("📦 Item inyectado en [1][1]");
            }else {
                console.log("⚠️ Asegúrate de construir una cinta (cuadro azul) en la Fila 1, Columna 1 primero.");
            }
        });

        this.time.addEvent({
            delay: 500,
            callback: this.processTick,
            callbackScope: this,
            loop: true
        });
    }
    //Logica cambio de estados de construccion/simulacion
    toggleGameState() {
        if (this.gameState === 'BUILDING') {
            this.gameState = 'SIMULATING';
            this.statusText.setText('> MODO: SIMULACIÓN (Ejecutando...)');
            this.statusText.setColor('#ffaa00'); 
            console.log("--- MODO SIMULACIÓN INICIADO ---");
        } else {
            this.gameState = 'BUILDING';
            this.statusText.setText('> MODO: CONSTRUCCIÓN (Presiona ESPACIO)');
            this.statusText.setColor('#00ff88'); 
            console.log("--- MODO CONSTRUCCIÓN INICIADO ---");
        }
    }
    //inicializar la grilla logica
   initializeGrid() {
        for (let y = 0; y < ROWS; y++) {
            let row = [];
            for (let x = 0; x < COLS; x++) {
                row.push({
                    id: 0,
                    direction: null,
                    item_id: null,
                    item_sprite: null, // Nuevo: referencia visual del item
                    moved_this_tick: false // Nuevo: bandera anti-teletransportación
                });
            }
            this.logicGrid.push(row);
        }
    }
    //Logica para denegar construccion mientras modo de simulacion
    handleGridClick(pointer) {
        if (this.gameState === 'SIMULATING') {
            console.log("Acción denegada: La fábrica está en marcha.");
            return; 
        }

        const gridX = Math.floor(pointer.x / TILE_SIZE);
        const gridY = Math.floor(pointer.y / TILE_SIZE);

        if (gridX >= 0 && gridX < COLS && gridY >= 0 && gridY < ROWS) {
            const clickedCell = this.logicGrid[gridY][gridX];
            
            if (clickedCell.id === 0) {
                clickedCell.id = 1; 
                clickedCell.direction = 'RIGHT'; 
                
                const rect = this.add.graphics();
                rect.fillStyle(0x00a8ff, 0.8); 
                
                const pixelX = gridX * TILE_SIZE + 2;
                const pixelY = gridY * TILE_SIZE + 2;
                const size = TILE_SIZE - 4;
                
                rect.fillRect(pixelX, pixelY, size, size);
                clickedCell.sprite = rect; 
            }
        }
    }

    processTick() {
        if (this.gameState !== 'SIMULATING') return;

        // Paso A: Limpiar las banderas de movimiento
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                this.logicGrid[y][x].moved_this_tick = false;
            }
        }

        // Paso B: Procesar el movimiento
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                const cell = this.logicGrid[y][x];
                
                // Si la celda tiene una cinta, tiene un item, y no se ha movido
                if (cell.id === 1 && cell.item_id !== null && !cell.moved_this_tick) {
                    
                    let nextX = x;
                    let nextY = y;
                    
                    // Nota: Por ahora todas nuestras cintas miran a la derecha por defecto
                    if (cell.direction === 'RIGHT') nextX += 1;
                    if (cell.direction === 'LEFT') nextX -= 1;
                    if (cell.direction === 'UP') nextY -= 1;
                    if (cell.direction === 'DOWN') nextY += 1;

                    if (nextX >= 0 && nextX < COLS && nextY >= 0 && nextY < ROWS) {
                        const nextCell = this.logicGrid[nextY][nextX];

                        if (nextCell.id === 1 && nextCell.item_id === null) {
                            
                            // TRANSFERENCIA LÓGICA
                            nextCell.item_id = cell.item_id;
                            nextCell.item_sprite = cell.item_sprite;
                            nextCell.moved_this_tick = true; 

                            cell.item_id = null;
                            cell.item_sprite = null;

                            // CORRECCIÓN ANIMACIÓN VISUAL: Movemos las coordenadas X y Y directamente
                            const targetPixelX = nextX * TILE_SIZE + 16;
                            const targetPixelY = nextY * TILE_SIZE + 16;

                            this.tweens.add({
                                targets: nextCell.item_sprite, 
                                x: targetPixelX, 
                                y: targetPixelY, 
                                duration: 400, 
                                ease: 'Linear'
                            });
                        }
                    }
                }
            }
        }
    }

    drawGrid() {
        const graphics = this.add.graphics();
        graphics.lineStyle(1, 0x333333, 0.8);

        for (let x = 0; x <= this.scale.width; x += TILE_SIZE) {
            graphics.moveTo(x, 0);
            graphics.lineTo(x, this.scale.height);
        }
        for (let y = 0; y <= this.scale.height; y += TILE_SIZE) {
            graphics.moveTo(0, y);
            graphics.lineTo(this.scale.width, y);
        }
        graphics.strokePath();
    }
}