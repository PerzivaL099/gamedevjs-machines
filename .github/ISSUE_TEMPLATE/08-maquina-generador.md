---
name: "Sprint 4: Automatización (Spawner)"
about: "Máquina que crea items automáticamente."
title: 'feat: Crear máquina Generador para automatizar materias primas'
labels: feature, sprint-4
---

## 📝 Descripción
Ya no podemos depender de la tecla 'I' para inyectar items manualmente. Necesitamos un nuevo tipo de máquina (Generador) que emita una materia prima cada `X` Ticks de simulación automáticamente hacia la celda a la que apunta.

## 🎯 Criterios de Aceptación
- [ ] Añadir una tecla para construir un Generador (ej. presionar `1` para Cintas, `2` para Generador).
- [ ] El Generador tendrá el `id: 2` en la matriz y se dibujará de color Verde.
- [ ] En la función `processTick`, si la celda es `id: 2`, generar un item en la celda adyacente si está vacía.

## 🧠 Detalles Técnicos
La lógica del Generador debe ejecutarse en el `processTick` ANTES que la lógica de las cintas transportadoras para evitar conflictos de sincronización.