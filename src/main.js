import * as Phaser from 'phaser';

const TILE_SIZE = 64; 
const COLS = 13; // 832 / 64
const ROWS = 10; // 640 / 64

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        // Declaramos nuestra matriz a nivel de clase para acceder a ella desde cualquier función
        this.logicGrid = []; 
        this.gameState = 'BUILDING'; 
    }

    create() {
        // Guardamos el texto en una variable (this.statusText) para poder cambiarlo después
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

        // ESCUCHAMOS LA BARRA ESPACIADORA
        this.input.keyboard.on('keydown-SPACE', () => {
            this.toggleGameState();
        });
    }

    toggleGameState() {
        if (this.gameState === 'BUILDING') {
            this.gameState = 'SIMULATING';
            this.statusText.setText('> MODO: SIMULACIÓN (Ejecutando...)');
            this.statusText.setColor('#ffaa00'); // Cambia a color naranja
            console.log("--- MODO SIMULACIÓN INICIADO ---");
        } else {
            this.gameState = 'BUILDING';
            this.statusText.setText('> MODO: CONSTRUCCIÓN (Presiona ESPACIO)');
            this.statusText.setColor('#00ff88'); // Vuelve a verde
            console.log("--- MODO CONSTRUCCIÓN INICIADO ---");
        }
    }

    initializeGrid() {
        // Llenamos la matriz bidimensional con objetos vacíos
        for (let y = 0; y < ROWS; y++) {
            let row = [];
            for (let x = 0; x < COLS; x++) {
                row.push({
                    id: 0,           // 0: Vacío, 1: Cinta transportadora, etc.
                    direction: null, // Para cuando implementemos el grafo
                    item_id: null,
                    sprite: null     // Para guardar el cuadrito dibujado más adelante
                });
            }
            this.logicGrid.push(row);
        }
        console.log("Matriz lógica inicializada:", this.logicGrid);
    }

    handleGridClick(pointer) {

        //Candado logico
        if (this.gameState === 'SIMULATING'){
            console.log('Error: No puedes construir mientras la simulacion esta ejecutandose. Presiona ESPACIO para volver al modo construcción.');
            return;
        }

        const gridX = Math.floor(pointer.x / TILE_SIZE);
        const gridY = Math.floor(pointer.y / TILE_SIZE);

        if (gridX >= 0 && gridX < COLS && gridY >= 0 && gridY < ROWS) {
            const clickedCell = this.logicGrid[gridY][gridX];
            
            // Lógica de Construcción
            if (clickedCell.id === 0) {
                // 1. Actualizamos la memoria (Estado Lógico)
                clickedCell.id = 1; // 1 representará nuestra Cinta Transportadora
                clickedCell.direction = 'RIGHT'; // Por defecto mirará a la derecha
                
                // 2. Actualizamos la pantalla (Estado Visual)
                const rect = this.add.graphics();
                rect.fillStyle(0x00a8ff, 0.8); // Color azul brillante
                
                // Calculamos las coordenadas en píxeles para dibujar
                // Le sumamos 2 y restamos 4 para dejar un pequeño margen y que se vea la cuadrícula
                const pixelX = gridX * TILE_SIZE + 2;
                const pixelY = gridY * TILE_SIZE + 2;
                const size = TILE_SIZE - 4;
                
                rect.fillRect(pixelX, pixelY, size, size);
                
                // 3. Guardamos la referencia visual en nuestra matriz
                // Esto es crucial para poder borrarlo o animarlo después
                clickedCell.sprite = rect; 
                
                console.log(`Cinta construida en Col:${gridX}, Fila:${gridY}`);
            } else {
                // Si la celda ya tiene algo (id distinto de 0)
                console.log("Error: La celda ya está ocupada.");
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

const config = {
    type: Phaser.AUTO,
    width: COLS * TILE_SIZE,  
    height: ROWS * TILE_SIZE, 
    parent: 'game-container', 
    backgroundColor: '#1a1a1a',
    scene: [GameScene]
};

const game = new Phaser.Game(config);