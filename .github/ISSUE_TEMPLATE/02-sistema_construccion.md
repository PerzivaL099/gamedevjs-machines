---
name: "Sprint 1: Sistema de Construcción"
about: "Mecánica para colocar máquinas usando el mouse."
title: 'feat: Permitir colocar cintas transportadoras con el mouse'
labels: enhancement, sprint-1
---

## 📝 Descripción
Configurar los eventos de puntero (pointerdown) en Phaser. Al hacer clic en una celda, actualizar el valor en la matriz lógica (de vacío a ocupado/cinta) y renderizar un cuadrado de color o sprite en esa posición para tener retroalimentación visual.

## 🎯 Criterios de Aceptación
- [ ] Escuchar el evento de clic del mouse en la escena de Phaser.
- [ ] Modificar el estado de la matriz en los índices correspondientes al clic.
- [ ] Dibujar un rectángulo gráfico de Phaser (color distintivo) centrado en la celda clickeada.
- [ ] Evitar que se dibuje dos veces en la misma celda si ya está ocupada.

## 🧠 Detalles Técnicos
Usar `this.input.on('pointerdown', callback)` de Phaser. Guardar las referencias visuales (Graphics o Sprites) dentro de la misma celda de la matriz para poder manipularlas luego.