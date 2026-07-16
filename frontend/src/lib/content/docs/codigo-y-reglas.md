---
title: Reglas de Código
description: Las bases técnicas que debes seguir para escribir código dentro de la plataforma.
order: 4
---

# Cómo programamos en AMPARO

Para que el sistema sea liviano, rápido de descargar y fácil de mantener, seguimos un conjunto de reglas técnicas estrictas. No usamos librerías pesadas de Node ni complicamos el flujo de trabajo.

## 1. Las herramientas base
- **Lenguaje:** Exclusivamente JavaScript puro. Cero TypeScript.
- **Frontend:** Svelte 5 (usando obligatoriamente reactividad nativa con `$state`, `$derived` y `$effect`).
- **Estilos:** Tailwind CSS directo en el marcado HTML.

## 2. Formularios limpios y sin repetir clases
Los elementos nativos como `<input>`, `<select>` y `<textarea>` ya tienen estilos aplicados a nivel global en el CSS del proyecto (fondo, tipografía text-xs uppercase y bordes rectos). **No les agregues clases de diseño repetitivas en cada componente.** Escribe el marcado HTML limpio y estructural. Solo usa Tailwind si necesitas posicionarlos en grillas o layouts específicos.

## 3. Mutaciones de estado sin recargas
Para los formularios que envían información a la base de datos, utiliza siempre `use:enhance` de `$app/forms`. Esto nos permite actualizar la interfaz en tiempo real sin recargar la página completa, ahorrando datos en el teléfono del usuario.

## 4. Seguridad de datos
El sitio público (estático) nunca se conecta directamente a la base de datos. Toda consulta de información pública pasa a través de la API de SvelteKit. Las claves de acceso a la base de datos se quedan seguras en el backend, invisibles para el navegador del usuario.