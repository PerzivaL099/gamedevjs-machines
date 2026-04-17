import * as Phaser from 'phaser';

const TILE_SIZE = 64; 
const COLS = 13; // 832 / 64
const ROWS = 10; // 640 / 64

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        // Declaramos nuestra matriz a nivel de clase para acceder a ella desde cualquier función
        this.logicGrid = []; 
    }

    create() {
        this.add.text(20, 20, '> SISTEMA INICIADO: FACTORIA', { 
            fontFamily: 'monospace', 
            fontSize: '20px', 
            fill: '#00ff88' 
        });

        this.drawGrid();
        
        // 1. INICIALIZAR LA MATRIZ LÓGICA
        this.initializeGrid();

        // 2. ESCUCHAR EL INPUT DEL JUGADOR
        // Phaser maneja los eventos de mouse o táctiles con 'pointerdown'
        this.input.on('pointerdown', (pointer) => {
            this.handleGridClick(pointer);
        });
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
        // 3. TRADUCTOR: Píxeles a Índices Lógicos
        // Dividimos la posición del clic entre el tamaño del cuadro y redondeamos hacia abajo.
        // Ej: Clic en X=100 -> 100 / 64 = 1.56 -> Math.floor() = 1 (Columna 1)
        const gridX = Math.floor(pointer.x / TILE_SIZE);
        const gridY = Math.floor(pointer.y / TILE_SIZE);

        // 4. VALIDACIÓN DE LÍMITES (Out of Bounds Check)
        // Evitamos errores si el usuario hace clic fuera de la pantalla
        if (gridX >= 0 && gridX < COLS && gridY >= 0 && gridY < ROWS) {
            
            // Accedemos a la celda específica M[y][x]
            const clickedCell = this.logicGrid[gridY][gridX];
            
            console.log(`\n--- CLIC DETECTADO ---`);
            console.log(`Píxeles: X:${Math.round(pointer.x)}, Y:${Math.round(pointer.y)}`);
            console.log(`Índices Matriz: Columna(X):${gridX}, Fila(Y):${gridY}`);
            console.log('Estado de la celda:', clickedCell);
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