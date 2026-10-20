# Gestor de Tareas

Aplicación web para la gestión eficiente de tareas, desarrollada con TypeScript, HTML5, CSS3 y el patrón Modelo-Vista-Controlador (MVC). Permite crear, consultar, editar, eliminar y organizar tareas mediante filtros dinámicos, alertas de vencimiento y almacenamiento persistente en el navegador.

## Tabla de contenidos
* Introducción
* Objetivos del proyecto
* Arquitectura del sistema
* Funcionalidades principales
* Tecnologías utilizadas
* Instalación y ejecución local
* Video explicativo
* Persistencia de datos
* Contexto académico

---

## 1. Introducción

El desarrollo de aplicaciones web modernas requiere arquitecturas organizadas, escalables y fáciles de mantener. El proyecto Gestor de Tareas es una aplicación web desarrollada como actualización evolutiva del Laboratorio #2, aplicando principios de programación orientada a objetos y el patrón arquitectónico Modelo-Vista-Controlador (MVC).

El sistema permite administrar actividades personales o académicas mediante una interfaz moderna, con modo oscuro y acentos visuales en azul y dorado.

La aplicación incorpora validaciones para mantener la integridad de los datos, filtros combinados, alertas de vencimiento y persistencia mediante la API localStorage del navegador.

---

## 2. Objetivos del proyecto

### Objetivo general
Actualizar y ampliar un sistema de gestión de tareas mediante una aplicación web estructurada con el patrón MVC, incorporando operaciones CRUD, validaciones contra duplicados, filtros dinámicos y almacenamiento persistente de información.

### Objetivos específicos
* Aplicar tipado estático y programación orientada a objetos con TypeScript.
* Organizar el código en módulos especializados siguiendo el patrón MVC.
* Implementar validaciones para evitar tareas duplicadas.
* Incorporar búsqueda en tiempo real y filtros combinados por estado y prioridad.
* Permitir ordenar las tareas según criterios temporales o de urgencia.
* Implementar alertas visuales para identificar tareas vencidas.
* Desarrollar una interfaz moderna y adaptable a diferentes tamaños de pantalla.
* Mantener los datos disponibles mediante el almacenamiento local del navegador.

---

## 3. Arquitectura del sistema (MVC)

La aplicación utiliza el patrón Modelo-Vista-Controlador (MVC) para separar las responsabilidades y facilitar el mantenimiento del código.

### Modelo — `src/models/Tarea.ts`
Representa los datos y las reglas de negocio de las tareas.
Responsabilidades principales:
* Definir la estructura de datos mediante la interfaz `ITarea`.
* Administrar los atributos de cada tarea.
* Validar los datos antes de registrar o actualizar tareas.
* Evitar duplicados mediante la normalización de títulos.
* Gestionar las operaciones de creación, actualización y eliminación.

Los atributos de una tarea incluyen:
* `id`
* `titulo`
* `descripcion`
* `prioridad`
* `fechaLimite`
* `horaLimite`
* `correoResponsable`
* `completada`

### Vista — `src/views/TareaView.ts`
Gestiona la interfaz y la interacción con el DOM.
Sus responsabilidades incluyen:
* Renderizar dinámicamente el listado de tareas.
* Actualizar los contadores y las estadísticas.
* Mostrar etiquetas visuales de prioridad.
* Presentar alertas relacionadas con el vencimiento.
* Administrar los formularios de creación y edición.
* Actualizar la interfaz cuando cambian los datos.

### Controlador — `src/controllers/TareaController.ts`
Conecta las acciones del usuario con las operaciones del modelo y la actualización de la vista.
Entre sus responsabilidades se encuentran:
* Gestionar eventos de formularios.
* Atender los clics en los botones de acción.
* Procesar los filtros y las búsquedas.
* Coordinar la creación, edición y eliminación de tareas.
* Actualizar la interfaz después de cada operación.

### Servicio de almacenamiento — `src/services/StorageService.ts`
Centraliza la persistencia de los datos en el navegador mediante `localStorage`.
Sus funciones incluyen:
* Guardar la información en formato JSON.
* Recuperar las tareas almacenadas.
* Mantener los registros disponibles entre sesiones del navegador.

### Estilos — `styles.css`
Define la presentación visual de la aplicación, incluyendo el modo oscuro, los colores de énfasis, las etiquetas de prioridad y la adaptación de la interfaz a distintos tamaños de pantalla.

---

## 4. Funcionalidades principales

### Gestión de tareas (CRUD)
La aplicación permite realizar las operaciones fundamentales de administración de datos:
* **Crear:** registrar nuevas tareas con sus respectivos atributos.
* **Leer:** consultar y visualizar las tareas registradas.
* **Actualizar:** editar los datos de una tarea existente.
* **Eliminar:** borrar tareas individualmente con confirmación.
También incorpora una opción para eliminar de forma masiva las tareas completadas.

### Validación contra duplicados
El sistema valida los títulos de las tareas para evitar registros duplicados. La comparación contempla diferencias entre mayúsculas y minúsculas, así como espacios excedentes, de acuerdo con las reglas de validación implementadas.

### Fechas, horas y alertas de vencimiento
Cada tarea puede incluir una fecha y una hora límite. Las alertas visuales permiten identificar las actividades vencidas y facilitar el seguimiento de las tareas pendientes.

### Búsqueda, filtros y ordenamiento
La aplicación ofrece herramientas para localizar y organizar las actividades:
* Búsqueda por título en tiempo real.
* Filtro por estado: todas, pendientes o completadas.
* Filtro por prioridad: alta, media o baja.
* Combinación de filtros para obtener resultados más específicos.
* Ordenamiento según criterios temporales o de urgencia.

### Panel de estadísticas
Incluye indicadores que permiten consultar el total de tareas, las pendientes y las completadas. Los contadores se actualizan conforme se modifican los registros.

### Notificaciones y confirmaciones
El sistema proporciona notificaciones visuales para informar sobre determinadas acciones y solicita confirmación antes de realizar eliminaciones que requieren una validación adicional.

---

## 5. Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
| --- | --- |
| **TypeScript** | Lógica de negocio, tipado estático y programación orientada a objetos |
| **HTML5** | Estructura de la aplicación web |
| **CSS3** | Diseño visual y adaptación de la interfaz |
| **Node.js** | Entorno de ejecución para herramientas de desarrollo |
| **npm** | Instalación y administración de dependencias |
| **TypeScript Compiler (`tsc`)** | Compilación del código TypeScript a JavaScript |
| **LocalStorage API** | Persistencia local de las tareas |
| **Visual Studio Code** | Entorno de desarrollo |
| **Live Server** | Ejecución local de la aplicación durante el desarrollo |

---

## 6. Instalación y ejecución local

### Requisitos previos
Antes de ejecutar el proyecto, es necesario contar con:
* Node.js instalado.
* npm disponible.
* Visual Studio Code instalado.
* La extensión Live Server instalada en Visual Studio Code.
* Git instalado, si se desea clonar el repositorio.

### Paso 1. Clonar el repositorio
Abre una terminal y ejecuta:
```bash
git clone https://github.com/Juanh3rn4nd3z/proyecto-1-POE.git
```

### Paso 2. Entrar en la carpeta del proyecto
```bash
cd proyecto-1-POE
```

### Paso 3. Instalar las dependencias
```bash
npm install
```
*Este comando instala las dependencias definidas en el archivo package.json.*

### Paso 4. Compilar el código TypeScript
```bash
npx tsc
```
*Este comando compila los archivos TypeScript de acuerdo con la configuración del proyecto.*

### Paso 5. Abrir el proyecto en Visual Studio Code
Desde la terminal, puedes ejecutar:
```bash
code .
```
*También puedes abrir Visual Studio Code manualmente y seleccionar la carpeta del proyecto.*

### Paso 6. Ejecutar la aplicación
1. Localiza el archivo `index.html` en el explorador de archivos de Visual Studio Code.
2. Haz clic derecho sobre el archivo.
3. Selecciona **Open with Live Server**.
4. La aplicación se abrirá en el navegador predeterminado.

*Nota: Si la compilación genera archivos JavaScript en una carpeta específica, asegúrate de que la configuración y las rutas utilizadas por `index.html` correspondan con esos archivos.*

---

## 7. Video explicativo

El siguiente video presenta una explicación del funcionamiento de la aplicación, incluyendo las vistas, los filtros, las alertas de vencimiento y la gestión de tareas.

* **Enlace al video:** https://youtu.be/XEXOkXmW-xA

---

## 8. Persistencia de datos

La aplicación utiliza `localStorage` para guardar automáticamente las tareas en el navegador.

Esta característica permite que los datos permanezcan disponibles después de recargar la página o cerrar y volver a abrir el navegador, siempre que se utilicen el mismo navegador y el mismo origen.

Es importante tener en cuenta que:
* Los datos se almacenan localmente en el navegador del usuario.
* La información no se sincroniza automáticamente entre distintos dispositivos o navegadores.
* Borrar los datos del sitio desde el navegador puede eliminar las tareas guardadas.
* `localStorage` no sustituye a una base de datos centralizada ni a un sistema de copias de seguridad.

---

## 9. Contexto académico

* **Proyecto:** Desarrollado en el contexto de la asignatura de Programación Orientada a Eventos (POE), como actualización evolutiva del Laboratorio #2.
* **Institución:** Universidad de Oriente (UNIVO).
* **Autor:** Juan René Flores Hernández
