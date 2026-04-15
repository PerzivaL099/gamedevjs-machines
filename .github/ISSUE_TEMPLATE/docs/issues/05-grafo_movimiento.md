---
title: 'feat: Lógica de transferencia de items entre celdas'
labels: feature, sprint-3
---

## 📝 Descripción
Las celdas de nuestra matriz actuarán como nodos de un grafo dirigido. En cada "Tick" de simulación, si una celda contiene un objeto, debe calcular su vector de dirección y mover el objeto a la celda adyacente si está libre.

## 🎯 Criterios de Aceptación
- [ ] Asignar vectores de dirección a las celdas (UP, DOWN, LEFT, RIGHT).
- [ ] Durante un Tick, validar si la celda de destino ($x_{new}, y_{new}$) está dentro de los límites del mapa y no está bloqueada.
- [ ] Transferir los datos lógicos (`item_id`) de la celda origen a la destino.
- [ ] Animar el movimiento del sprite en pantalla desde la posición A a la B.

## 🧠 Detalles Técnicos
Cuidado con procesar la misma pieza dos veces en el mismo Tick. Se recomienda marcar las piezas que ya fueron movidas durante la iteración actual para evitar que "vuelen" a través de toda la matriz en un solo paso. Usar `this.tweens.add` de Phaser para la animación visual.