# TaskMaster Pro (Gestor de Tareas MVC)

## 1. Introducción
El desarrollo de aplicaciones web modernas exige la implementación de arquitecturas limpias y escalables que garanticen la separación de responsabilidades y una experiencia de usuario fluida en entornos de escritorio. **TaskMaster Pro** es una aplicación web orientada a la gestión eficiente de tareas desarrollada como actualización evolutiva del Laboratorio #2 bajo los estándares de la **Facultad de Ingeniería y Ciencias Aplicadas de la Universidad de Oriente (UNIVO)**.

El sistema consolida los principios de la programación orientada a objetos en TypeScript, integrando validaciones lógicas rigurosas, persistencia local mediante el almacenamiento del navegador (`localStorage`) y un diseño responsivo optimizado en modo oscuro con acentos visuales en azul y dorado.

---

## 2. Planteamiento y Objetivos del Proyecto

### Objetivo General
Actualizar y extender el sistema de gestión de tareas hacia una aplicación robusta bajo el patrón **Modelo-Vista-Controlador (MVC)**, incorporando un conjunto completo de operaciones CRUD, validaciones avanzadas contra duplicados, filtros combinados y persistencia local de datos.

### Objetivos Específicos
- **Aplicar tipado estricto** en TypeScript y organizar la lógica del sistema en clases modulares especializadas.
- **Implementar mecanismos de validación estricta** que eviten registros duplicados y aseguren la integridad de la información ingresada por el usuario.
- **Incorporar características dinámicas avanzadas** como búsqueda en tiempo real, filtros múltiples combinables (estado y prioridad) y ordenamiento por criterios temporales o de urgencia.
- **Desarrollar una interfaz adaptativa** optimizada para pantallas de escritorio amplias con un diseño moderno.

---

## 3. Arquitectura del Sistema (Patrón MVC)
La aplicación implementa de manera estricta el patrón **Modelo-Vista-Controlador (MVC)**, desacoplando completamente la lógica de negocio de la interfaz de usuario:

- **Capa Modelo (`src/models/Tarea.ts`)**: Representa el núcleo de los datos y las reglas de negocio. Define la interfaz `ITarea` estructurada con atributos clave: `id`, `titulo`, `descripcion`, `prioridad`, `fechaLimite`, `horaLimite`, `correoResponsable` y `completada`. Centraliza el almacenamiento de la colección, inserción segura, actualización de registros, borrado con confirmación y la validación de duplicados mediante la normalización de cadenas de texto (insensible a mayúsculas/minúsculas y espacios excedentes).
- **Capa Vista (`src/views/TareaView.ts`)**: Administra la interacción con el DOM. Se encarga de renderizar dinámicamente el listado de tareas, actualizar contadores estadísticos en tiempo real, proyectar etiquetas de prioridad (*Badges*), mostrar alertas visuales y gestionar los formularios tanto para la creación como para la edición de elementos.
- **Capa Controlador (`src/controllers/TareaController.ts`)**: Actúa como el puente reactivo entre las acciones del usuario en la Vista y las operaciones lógicas del Modelo. Escucha eventos de formularios, clics en botones, selectores de filtrado y entradas de búsqueda.
- **Servicio de Almacenamiento (`src/services/StorageService.ts`)**: Encapsula la comunicación con el navegador a través de `localStorage`, garantizando que todas las operaciones de guardado y carga inicial se realicen de forma estructurada bajo formato JSON.
- **Estilos (`styles.css`)**: Hoja de estilos avanzada con un esquema de color oscuro contrastado y diseño responsivo.

---

## 4. Especificación Técnica de los Módulos y Modificaciones

- **Control de Fechas y Horas Límite:** Incorporación de campos avanzados de fecha y hora límite para cada tarea con validaciones de rangos y formato.
- **Sistema de Alertas de Vencimiento:** Implementación de un mecanismo en tiempo real que evalúa constantemente el vencimiento de las actividades, destacando visualmente las tareas vencidas en color rojo.
- **Validación Anti-Duplicados:** Control estricto en la capa de negocio para rechazar el registro o actualización de tareas que compartan el mismo título (sin distinción de mayúsculas).
- **Panel de Estadísticas y Pestañas Dinámicas:** Inclusión de un contador y panel de métricas en tiempo real que muestra el total de tareas, pendientes y completadas, alternando vistas mediante pestañas interactivas.
- **Filtros Combinados y Búsqueda en Tiempo Real:** Capacidad de buscar por título de forma inmediata y aplicar filtros cruzados por estado (Todas, Pendientes, Completadas) y niveles de prioridad (Alta, Media, Baja), además de opciones de ordenamiento.
- **Gestión CRUD Completa y Notificaciones:** Funcionalidad de edición interactiva cargando datos directamente al formulario, eliminación individual con confirmación de seguridad, purga masiva de tareas finalizadas y sistema de notificaciones/alertas visuales.
- **Persistencia Robusta (`localStorage`):** Almacenamiento seguro en el navegador del cliente para preservar los registros de manera independiente tras recargar o cerrar la sesión.

---

## 5. Tecnologías Utilizadas
- **TypeScript** (Lógica tipada orientada a objetos)
- **HTML5** (Estructura semántica)
- **CSS3** (Estilos avanzados, diseño responsivo y esquema de color oscuro)
- **Node.js y npm** (Gestión de paquetes y entorno de compilación)
- **LocalStorage API** (Gestión de datos persistentes en el navegador)

---

## 6. Instalación y Ejecución Local

### Requisitos previos
- Tener instalado **Node.js**.
- Tener instalado **Visual Studio Code**.
- Tener instalada la extensión **Live Server** en Visual Studio Code.

### Pasos para ejecutar el proyecto
1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/Juanh3rn4nd3z/proyecto-1-POE.git](https://github.com/Juanh3rn4nd3z/proyecto-1-POE.git)
Abrir el proyecto: Abre la carpeta en Visual Studio Code.
Ejecutar el HTML: Haz clic derecho sobre el archivo index.html y selecciona "Open with Live Server".

Las tareas se guardan en el almacenamiento local del navegador (localStorage). Los datos permanecen disponibles en el mismo navegador y origen, incluso después de cerrar y volver a abrir la página.
