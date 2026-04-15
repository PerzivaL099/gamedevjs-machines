---
title: 'core: Crear el Sistema de Ticks para procesar la fábrica'
labels: core, sprint-3
---

## 📝 Descripción
A diferencia de las físicas que corren a 60 FPS, nuestra fábrica procesará la lógica de movimiento a intervalos regulares (ej. cada 500ms) conocidos como "Ticks". Esto es crucial para la sincronización de las máquinas.

## 🎯 Criterios de Aceptación
- [ ] Crear un temporizador que ejecute una función `processTick()` cada 500 milisegundos.
- [ ] El temporizador solo debe correr si `gameState === 'SIMULATING'`.
- [ ] En cada tick, iterar sobre toda la matriz usando dos bucles `for` anidados.
- [ ] Imprimir un mensaje de consola por cada tick para verificar que funciona.

## 🧠 Detalles Técnicos
Se puede usar el reloj interno de Phaser `this.time.addEvent({ delay: 500, loop: true })` para manejar el Tick independientemente del renderizado gráfico.