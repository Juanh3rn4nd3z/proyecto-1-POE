# Gestor de Tareas MVC

## Descripción
Proyecto desarrollado en TypeScript para administrar una lista de tareas pendientes. Permite registrar actividades, asignarles una prioridad y llevar un control del progreso mediante una interfaz web moderna en modo oscuro.

## Funcionalidades
- Registrar tareas con título, descripción detallada y nivel de prioridad (Baja, Media, Alta).
- Panel de estadísticas en tiempo real (tareas totales, pendientes y completadas).
- Buscar tareas por título en tiempo real.
- Filtrar tareas según su estado (Todas, Pendientes, Completadas).
- Marcar tareas como completadas o pendientes.
- Eliminar tareas individuales con confirmación o eliminar todas las tareas completadas a la vez.
- Guardar los datos en el almacenamiento local del navegador para conservarlos al recargar la página.

## Tecnologías utilizadas
- HTML5
- CSS3
- TypeScript
- JavaScript (ES2022)
- Node.js y npm

## Arquitectura
El proyecto utiliza el patrón MVC (Modelo-Vista-Controlador) para organizar el código:

- **Models:** representa la información y estructura de las tareas (`Tarea.ts`).
- **Views:** administra la interfaz, las estadísticas en pantalla y la presentación de las tareas (`TareaView.ts`).
- **Controllers:** gestiona las acciones del usuario, aplica los filtros y conecta la vista con el modelo (`TareaController.ts`).
- **Services:** se encarga del almacenamiento y la gestión de los datos en el navegador (`StorageService.ts`).
- **Styles:** contiene los estilos visuales de la aplicación en tema oscuro con acentos en azul y dorado (`styles.css`).

## Instalación y ejecución

### Requisitos previos
- Tener instalado Node.js.
- Tener instalado Visual Studio Code.
- Tener instalada la extensión Live Server en Visual Studio Code.

### Pasos para ejecutar el proyecto

1. Clonar el repositorio:
```bash
git clone [https://github.com/Juanh3rn4nd3z/proyecto-1-POE.git](https://github.com/Juanh3rn4nd3z/proyecto-1-POE.git)

2:Entrar en la carpeta del proyecto:
cd proyecto-1-POE

3:Instalar las dependencias:
npm install

4:Compilar el código TypeScript:
npx tsc

Abrir el proyecto: Abre la carpeta en Visual Studio Code.
Ejecutar el HTML: Haz clic derecho sobre el archivo index.html y selecciona "Open with Live Server".

Las tareas se guardan en el almacenamiento local del navegador (localStorage). Los datos permanecen disponibles en el mismo navegador y origen, incluso después de cerrar y volver a abrir la página.
