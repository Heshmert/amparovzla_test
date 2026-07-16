---
title: Desarrolladores y Soporte
description: Programación y mantenimiento con Svelte 5, Drizzle ORM y Postgres para que la plataforma nunca se caiga.
bg: bg-blue-900
---

### ¿De qué forma ayuda tu talento?

La tecnología nos permite coordinar esfuerzos sin que la distancia nos incomode. Si sabes escribir código, nos das una mano enorme manteniendo la base de datos organizada y asegurando que las herramientas funcionen rápido en las pantallas de los voluntarios. 

No necesitamos código vistoso ni animaciones pesadas; necesitamos sistemas estables que respondan al tiro cuando un vecino necesita saber si hay medicinas disponibles.  

### ¿Cómo puedes colaborar hoy con el sistema?

Si tienes conocimientos en desarrollo web, hay tres áreas críticas donde tu ayuda es valiosa hoy mismo:

1. **Optimizar consultas a la base de datos (Postgres + Drizzle ORM):**
   Ayúdanos a estructurar consultas SQL limpias y eficientes a través de Drizzle. Necesitamos que las tablas de inventario y censo traigan la información justa y necesaria, evitando sobrecargar nuestra instancia en Neon y previniendo caídas cuando haya picos de visitas.

2. **Reactividad nativa y limpia (Svelte 5):**
   Mantenemos la interfaz ligera usando estrictamente las runas `$state` y `$derived`. Tu trabajo aquí es asegurar que los formularios pesados (como el selector geográfico de tres niveles: Estado, Municipio y Parroquia) respondan de forma instantánea sin forzar recargas completas de la página ni consumir megas de más en los teléfonos de los voluntarios.

3. **Soporte y guía a los cargadores de datos:**
   No todo el mundo sabe usar un sistema web. Necesitamos desarrolladores con paciencia que asistan a los administradores de los centros de acopio en el terreno, ayudándoles a entender cómo llenar las tablas, verificar que los datos se guarden bien y resolver pequeños problemas de red que puedan surgir en el día a día.

---

### Nota importante sobre el código y la seguridad:
*Actualmente estamos terminando de blindar la seguridad del panel de gestión interna y las conexiones directas con la base de datos. Una vez finiquitados estos apartados generales para evitar cualquier filtración de datos sensibles, abriremos el repositorio de forma pública en GitHub.*
