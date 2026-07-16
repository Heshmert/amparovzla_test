---
title: Base de Datos
description: Cómo organizamos la información del censo, acopios e inventarios.
order: 3
---

# Estructura de Datos de AMPARO

La base de datos corre sobre Postgres (alojado en Neon) y es gestionada con Drizzle ORM de forma lineal y sencilla.

## 1. Ubicación Geográfica (Estándar de 3 niveles)
Toda la información registrada en el sistema se organiza bajo el estándar geográfico de Venezuela en tres niveles estrictos:
1. **Estado**
2. **Municipio** (Filtrado reactivamente según el estado seleccionado)
3. **Parroquia** (Filtrado reactivamente según el municipio seleccionado)

## 2. Tablas Principales

### Usuarios (`users`)
Guarda las credenciales de las personas autorizadas para gestionar los centros de acopio y actualizar la información del sistema.

### Entidades (`centros_acopio`)
Registra la ubicación física, capacidad y responsable de cada punto de recolección de insumos habilitado.

### Recursos (`inventario`)
Lleva el conteo de qué insumos hay en cada centro de acopio (alimentos, agua, herramientas, ropa, medicinas), conectado directamente con el creador de fichas de despacho para etiquetar las cajas físicas.