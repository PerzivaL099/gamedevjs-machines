---
name: "Sprint 4: Objetivo y Puntuación"
about: "Máquina que consume items y da puntos."
title: 'feat: Crear máquina Meta y sistema de puntuación'
labels: feature, sprint-4
---

## 📝 Descripción
Toda fábrica necesita un propósito. Implementaremos una máquina "Receptora" o "Meta". Cuando una materia prima llegue a esta máquina, se consumirá (desaparecerá) y el jugador ganará un punto.

## 🎯 Criterios de Aceptación
- [ ] Crear la máquina Meta con `id: 3` (color Rojo).
- [ ] Al construirla, el jugador decide dónde termina la línea de ensamblaje.
- [ ] En `processTick`, si un item entra a la celda `id: 3`, destruir el `item_sprite` visual, dejar el `item_id` en `null` e incrementar una variable global de `score`.
- [ ] Mostrar la puntuación en la pantalla (UI).

## 🧠 Detalles Técnicos
Esta máquina actuará como un sumidero (Sink) en nuestro grafo dirigido. No exporta vectores, solo recibe datos y libera la memoria.