import { Tarea } from '../models/Tarea.js';
export class TareaController {
    view;
    storage;
    tareas;
    terminoBusqueda = '';
    filtroActual = 'todas';
    constructor(view, storage) {
        this.view = view;
        this.storage = storage;
        this.tareas = this.storage.cargar();
        this.view.bindAgregarTarea(this.handleAgregarTarea.bind(this));
        this.view.bindEliminarTarea(this.handleEliminarTarea.bind(this));
        this.view.bindToggleTarea(this.handleToggleTarea.bind(this));
        this.view.bindBuscarTarea(this.handleBuscarTarea.bind(this));
        this.view.bindFiltrarTarea(this.handleFiltrarTarea.bind(this));
        this.view.bindEliminarCompletadas(this.handleEliminarCompletadas.bind(this));
        this.actualizarVistaGeneral();
    }
    actualizarVistaGeneral() {
        let tareasFiltradas = [...this.tareas];
        if (this.filtroActual === 'pendientes') {
            tareasFiltradas = tareasFiltradas.filter(t => !t.completada);
        }
        else if (this.filtroActual === 'completadas') {
            tareasFiltradas = tareasFiltradas.filter(t => t.completada);
        }
        if (this.terminoBusqueda.trim() !== '') {
            tareasFiltradas = tareasFiltradas.filter(t => t.titulo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()));
        }
        const estadisticas = {
            total: this.tareas.length,
            pendientes: this.tareas.filter(t => !t.completada).length,
            completadas: this.tareas.filter(t => t.completada).length
        };
        this.view.renderizar(tareasFiltradas, estadisticas);
    }
    handleAgregarTarea(titulo, descripcion, prioridad) {
        const nuevaTarea = new Tarea(crypto.randomUUID(), titulo, descripcion, prioridad);
        this.tareas.unshift(nuevaTarea);
        this.storage.guardar(this.tareas);
        this.actualizarVistaGeneral();
    }
    handleEliminarTarea(id) {
        this.tareas = this.tareas.filter(t => t.id !== id);
        this.storage.guardar(this.tareas);
        this.actualizarVistaGeneral();
    }
    handleToggleTarea(id) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.completada = !tarea.completada;
            this.storage.guardar(this.tareas);
            this.actualizarVistaGeneral();
        }
    }
    handleBuscarTarea(termino) {
        this.terminoBusqueda = termino;
        this.actualizarVistaGeneral();
    }
    handleFiltrarTarea(filtro) {
        this.filtroActual = filtro;
        this.actualizarVistaGeneral();
    }
    handleEliminarCompletadas() {
        this.tareas = this.tareas.filter(t => !t.completada);
        this.storage.guardar(this.tareas);
        this.actualizarVistaGeneral();
    }
}
