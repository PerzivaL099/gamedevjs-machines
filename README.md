# ⚙️ Factoría de Algoritmos (Algorithmic Factory)

Un juego de puzzle y lógica desarrollado para la **Gamedev.js Jam 2026** bajo el tema *"Machines"*. 
Participando en el **Open Source Challenge** de GitHub.

## 📝 Sobre el Juego
"Factoría de Algoritmos" es un juego donde el jugador debe diseñar y construir una línea de ensamblaje funcional. A través de una cuadrícula interactiva, el usuario coloca cintas transportadoras, rotadores y ensambladoras para guiar materias primas desde un punto de origen hasta su destino, creando una máquina automatizada perfecta.

## 🏗️ Arquitectura y Estructuras de Datos (CS Focus)
Este proyecto está diseñado aplicando conceptos fundamentales de Ciencias de la Computación:

* **Grid System (Matriz 2D):** El "piso" de la fábrica está representado en memoria por una matriz bidimensional. Cada celda `$M[y][x]$` almacena un estado lógico (vacío, cinta, máquina) separando la capa visual (Phaser) de la capa lógica.
* **Flujo de Entidades (Grafos Dirigidos):** Las cintas transportadoras forman nodos de un grafo dirigido. La lógica de movimiento de las piezas calcula el camino (path) evaluando la dirección de salida de la celda actual y la entrada de la celda adyacente.
* **Gestión de Memoria (Object Pooling):** Para evitar la recolección de basura (Garbage Collection) constante al generar y destruir cientos de materias primas en pantalla, se implementará un sistema de *Object Pooling* que recicla las entidades.

## 🚀 Tecnologías Utilizadas
* **Motor Gráfico:** [Phaser 3](https://phaser.io/) (Renderizado Canvas/WebGL).
* **Lenguaje:** JavaScript (ES6+).
* **Bundler:** [Vite](https://vitejs.dev/) para empaquetado optimizado y Hot Module Replacement (HMR).

## 🛠️ Cómo ejecutar localmente
Si deseas clonar este proyecto y probarlo en tu máquina:

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install