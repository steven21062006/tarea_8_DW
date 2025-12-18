# Reflexión del Proyecto - Steven Jácome.

## 1. Oportunidades de mejora para el hook `useFetch`
Tras implementar el custom hook, considero que aunque cumple su función básica de lectura (GET), está limitado para un entorno de producción real.
* **Escalabilidad:** Actualmente tendríamos que crear lógica adicional para operaciones como POST, PUT o DELETE. Sería ideal que el hook retornara métodos configurables para estas acciones.
* **Gestión de Errores:** El manejo de errores es muy genérico. Sería útil diferenciar entre errores de red (ej. sin conexión) y errores de respuesta HTTP (ej. 404 o 500) para mostrar feedback más preciso al usuario.
* **Optimización:** Implementar un `AbortController` es crucial. Si el componente se desmonta mientras la petición sigue en curso, React lanzará advertencias de memoria. Además, un sistema de caché evitaría llamadas innecesarias a la API si los datos ya fueron cargados previamente.

## 2. Estrategia de estado en formularios
Para la gestión de la creación y edición de posts, opté por un patrón de **"Objeto de Estado Único"**.
En lugar de fragmentar la información en múltiples variables `useState` (uno para título, uno para cuerpo, etc.), se centraliza todo en un solo objeto.
* **¿Cómo funciona?** Utilizamos el evento `onChange` y la propiedad `name` de los inputs. Mediante la sintaxis de *propiedades computadas* de ES6 (`[e.target.name]: e.target.value`), actualizamos dinámicamente el campo correspondiente manteniendo el resto del objeto intacto con el operador spread (`...prev`).
* **Ventaja:** Esto reduce drásticamente el código repetitivo y hace que el formulario sea escalable; si mañana agregamos 5 campos nuevos, la función manejadora no necesita cambios.
