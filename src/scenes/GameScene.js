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

        this.input.on('pointerdown', (pointer) => {
            this.handleGridClick(pointer);
        });

        this.input.keyboard.on('keydown-SPACE', () => {
            this.toggleGameState();
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
                    sprite: null
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

        console.log("⏱️ --- TICK LOGICO ---");
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                const cell = this.logicGrid[y][x];
                if (cell.id === 1) {
                    cell.sprite.alpha = 0.5;
                    this.time.delayedCall(150, () => {
                        cell.sprite.alpha = 0.8; 
                    });
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