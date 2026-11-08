# Computing Made Easy — Notas de revisión v3

**Fecha:** 7 de noviembre de 2026  
**Sustituye** las notas v2 y el archivo v2.  
**No se publicó.** No hay demostración pública ni cambio de DNS, correo o alojamiento.

Se aplicó la guía de diseño del Bridge sobre el trabajo v3 que ya existía. No se rehizo el sitio blanco de v2.

El azul de marca es `#003B71` y el del encabezado `#002B52`. El oro es `#D4AF37`, con texto tinta `#0B1F3A` en los botones. El oro brillante no es texto sobre blanco. El hero es una franja azul sólida: en escritorio, bandera, texto y retrato; en el teléfono, primero el nombre, luego la bandera, las credenciales cortas y los botones, y al final el retrato.

El retrato dice **Imagen provisional — verificar parecido**. El nombre sigue **Freddy Jara-Almonte**. Las credenciales confirmadas no cambian. El teléfono sigue siendo 407-925-2589.

App Center solo se abre desde la pestaña del menú, también en el móvil. No está en el pie ni dentro de las páginas de inicio, servicios o contacto. `/es/app-center` conserva los 32 enlaces.

Comprobaciones de esta pasada: `npx vitest run` 13 aprobadas, `npx tsc --noEmit` aprobado, `npx eslint .` sin errores. `npx next build` aprobado.
