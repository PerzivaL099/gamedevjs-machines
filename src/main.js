import * as Phaser from 'phaser';

// Tamaño de cada celda de nuestra fábrica (64x64 píxeles)
const TILE_SIZE = 64; 

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // Un texto estilo terminal para confirmar que todo funciona
        this.add.text(20, 20, '> SISTEMA INICIADO: FACTORIA', { 
            fontFamily: 'monospace', 
            fontSize: '20px', 
            fill: '#00ff88' 
        });

        // Llamamos a la función que dibuja el piso
        this.drawGrid();
    }

    drawGrid() {
        const graphics = this.add.graphics();
        graphics.lineStyle(1, 0x333333, 0.8); // Líneas grises

        // Dibujar columnas (Líneas verticales)
        for (let x = 0; x <= this.scale.width; x += TILE_SIZE) {
            graphics.moveTo(x, 0);
            graphics.lineTo(x, this.scale.height);
        }

        // Dibujar filas (Líneas horizontales)
        for (let y = 0; y <= this.scale.height; y += TILE_SIZE) {
            graphics.moveTo(0, y);
            graphics.lineTo(this.scale.width, y);
        }

        graphics.strokePath();
    }
}

// Configuración del motor
const config = {
    type: Phaser.AUTO,
    width: 832,  // 13 columnas exactas de 64px
    height: 640, // 10 filas exactas de 64px
    parent: 'game-container', 
    backgroundColor: '#1a1a1a',
    scene: [GameScene]
};

// Arrancamos la máquina
const game = new Phaser.Game(config);