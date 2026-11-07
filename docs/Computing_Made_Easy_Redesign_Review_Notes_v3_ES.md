# Computing Made Easy — Notas de revisión v3

**Fecha:** 7 de noviembre de 2026  
**Sustituye** las notas v2 y el archivo `Computing_Made_Easy_Redesign_v2.zip`.  
**No se publicó.** No hay demostración pública ni cambio de DNS, correo, alojamiento o WordPress.

## Color

Azul de la Fuerza Aérea `#00308F` en el encabezado, el inicio y las introducciones de servicio. Oro `#FFCD00` en botones y resaltes sobre azul, con texto azul oscuro en el botón. El oro brillante no se usa como texto sobre blanco. Sobre blanco o fondo claro, los enlaces usan oro oscuro `#6B4F00`. El fondo de apoyo es hielo `#E4ECF7`. El blanco queda para la base de la bandera, el retrato y los campos del formulario.

La bandera de los Estados Unidos no se recoloró: sigue en rojo `#B22234`, blanco y azul `#3C3B6E`, con 13 franjas y 50 estrellas. No hay un emblema militar nuevo.

## App Center, página aparte

Una sola pestaña en el menú de escritorio y en el menú móvil lleva a `/app-center` (en español, `/es/app-center`). El pie y las páginas de inicio, servicios y contacto no incluyen el directorio ni enlaces a esas apps. El párrafo propuesto de IA ya no nombra las herramientas del directorio. Sigue sin calendario de clases y sin precio.

La página `/app-center` conserva los 32 enlaces y las frases originales. Tiene un regreso a Computing Made Easy y el cambio de idioma. Las apps hijas del dominio no se borran ni se mudan.

## Comprobaciones

`npx vitest run`: 13 pruebas aprobadas. `npx eslint .`: sin errores. `npx next build`: aprobado. En un servidor local de producción, el inicio tiene un solo enlace a App Center, dentro del encabezado.
