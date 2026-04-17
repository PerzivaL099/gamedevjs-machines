---
name: "Sprint 1: Matriz Lógica"
about: "Crear la estructura de datos base para el tablero."
title: 'feat: Implementar Matriz Lógica bidimensional para el mapa'
labels: enhancement, sprint-1
---

## 📝 Descripción
Crear la matriz M[y][x] en memoria para rastrear el estado de cada celda del tablero. Crear la función matemática que traduzca las coordenadas del mouse en píxeles (X, Y) a los índices de la matriz (Columna, Fila).

## 🎯 Criterios de Aceptación
- [ ] Crear variable global o atributo en la clase para la Matriz 2D (13 columnas x 10 filas).
- [ ] Inicializar todas las celdas con un objeto base (vacío, sin dirección).
- [ ] Implementar función `getGridCoordinates(mouseX, mouseY)` que retorne `{x, y}`.
- [ ] Al hacer clic en el lienzo, imprimir en consola los índices lógicos de la matriz seleccionada.

## 🧠 Detalles Técnicos
El tamaño de la celda es `TILE_SIZE = 64`. La fórmula para convertir clics a índices será `Math.floor(pointer.x / TILE_SIZE)`.