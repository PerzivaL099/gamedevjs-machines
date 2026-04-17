---
name: "Sprint 4: Rotación de Cintas"
about: "Mecánica para cambiar la dirección y dibujarla."
title: 'feat: Implementar rotación de cintas y feedback visual de dirección'
labels: enhancement, sprint-4
---

## 📝 Descripción
Actualmente todas las cintas miran a la derecha (`RIGHT`). El jugador debe poder rotar las cintas para crear circuitos complejos. Además, necesitamos un indicador visual (una flecha o línea) en el cuadro azul para saber hacia dónde apunta.

## 🎯 Criterios de Aceptación
- [ ] Escuchar la tecla `R` para rotar la cinta sobre la que está el mouse, o implementar que al hacer clic repetidamente sobre una cinta cambie su dirección (RIGHT -> DOWN -> LEFT -> UP).
- [ ] Actualizar el atributo `direction` en la matriz lógica.
- [ ] Dibujar una marca gráfica (ej. un triángulo blanco) sobre el cuadro azul que indique la dirección actual.

## 🧠 Detalles Técnicos
Si se usa la tecla `R`, se puede aprovechar las coordenadas del mouse para buscar en la matriz `this.logicGrid[y][x]` y modificarla solo si el estado es `BUILDING`.