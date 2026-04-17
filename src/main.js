import * as Phaser from 'phaser';
// Importamos nuestra clase y las constantes desde el nuevo archivo
import GameScene, { COLS, ROWS, TILE_SIZE } from './scenes/GameScene';

const config = {
    type: Phaser.AUTO,
    width: COLS * TILE_SIZE,  
    height: ROWS * TILE_SIZE, 
    parent: 'game-container', 
    backgroundColor: '#1a1a1a',
    // Le pasamos la clase importada al arreglo de escenas
    scene: [GameScene] 
};

// ¡Arrancamos el juego limpio y modular!
const game = new Phaser.Game(config);