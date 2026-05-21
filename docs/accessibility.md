# Accesibilidad

## Estandar de referencia

Esta aplicacion tiene como objetivo el cumplimiento del nivel AA de las pautas WCAG 2.1.

## Practicas aplicadas

### HTML semantico

- Las paginas usan elementos `<article>`, `<section>`, `<header>`, `<main>` y `<nav>`.
- Los encabezados siguen una jerarquia logica (h1 > h2 > h3).

### Atributos ARIA

- Los botones que alternan un estado incluyen `aria-expanded`.
- Los campos de formulario estan vinculados a sus etiquetas mediante `id` y `for`.
- Los campos invalidos incluyen `aria-invalid="true"`.
- El contenedor de notificaciones tipo toast usa `aria-live="assertive"` y `aria-atomic="true"`.
- El indicador de carga usa `role="status"` y `aria-live="polite"`.
- Los botones que contienen solo iconos incluyen `aria-label`.

### Navegacion por teclado

- Todos los elementos interactivos son accesibles y operables mediante teclado.
- El foco se gestiona correctamente al abrir y cerrar menus desplegables.
- El selector de idioma se cierra con la directiva `ClickOutsideDirective`.

### Contraste de color

- El texto sobre fondos blancos cumple una relacion de contraste minima de 4.5:1.
- Los estados interactivos (hover, focus) son visualmente distinguibles.
- Los estados de error usan tanto color (rojo) como iconografia para comunicar el estado.

### Diseno responsivo

- La interfaz se adapta desde 320px (telefono pequeño) hasta pantallas de 4K.
- Los objetivos tactiles cumplen el minimo de 44x44px en dispositivos moviles.
- La navegacion colapsa en un menu hamburguesa en pantallas menores a 768px.

## Limitaciones conocidas

- Los emojis de bandera en el selector de idioma pueden no renderizarse de forma consistente en todos los sistemas operativos.
- Los anuncios de lector de pantalla para actualizaciones dinamicas dependen de la region `aria-live` en el componente de notificaciones toast.
