---
name: "Sprint 4: Demolición"
about: "Permitir borrar errores."
title: 'feat: Permitir eliminar máquinas construidas (Demolición)'
labels: enhancement, sprint-4
---

## 📝 Descripción
El jugador inevitablemente cometerá errores de diseño. Necesitamos una forma de "vender" o "destruir" una máquina para volver a dejar la celda de la matriz vacía.

## 🎯 Criterios de Aceptación
- [ ] Implementar un control de borrado (ej. Clic Derecho o Shift + Clic Izquierdo).
- [ ] Al ejecutar la acción sobre una celda ocupada (`id: 1`), destruir el sprite (`sprite.destroy()`).
- [ ] Reiniciar los valores de la celda en la matriz lógica (`id: 0`, `direction: null`).
- [ ] Solo permitir demoler en el estado `BUILDING`.

## 🧠 Detalles Técnicos
Phaser detecta el clic derecho verificando `pointer.rightButtonDown()`. Es importante usar `destroy()` en el objeto gráfico antes de ponerlo en `null` para liberar la memoria correctamente y no dejar objetos "fantasmas" en la pantalla.