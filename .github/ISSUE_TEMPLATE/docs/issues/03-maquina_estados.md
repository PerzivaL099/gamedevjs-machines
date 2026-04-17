---
name: "Sprint 2: Máquina de Estados"
about: "Controlar cuándo el juego está en pausa vs en simulación."
title: 'feat: Implementar estados BUILDING y SIMULATING'
labels: feature, sprint-2
---

## 📝 Descripción
El juego debe diferenciar cuándo el jugador está construyendo (tiempo pausado) y cuándo la fábrica está operando. Necesitamos un control (como la tecla Espacio) para alternar entre estos dos modos lógicos.

## 🎯 Criterios de Aceptación
- [ ] Crear una variable de estado global `gameState = 'BUILDING'`.
- [ ] Escuchar la tecla `Espacio` (o un botón UI) para cambiar entre `BUILDING` y `SIMULATING`.
- [ ] Bloquear el sistema de construcción (Issue #2) si el estado es `SIMULATING`.
- [ ] Mostrar un texto en pantalla que indique en qué estado nos encontramos.

## 🧠 Detalles Técnicos
Usar el teclado de Phaser: `this.input.keyboard.on('keydown-SPACE', callback)`. Aplicar el patrón de diseño de Máquina de Estados Finita (FSM) muy básico.