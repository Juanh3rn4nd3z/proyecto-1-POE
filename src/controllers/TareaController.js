import { Tarea } from '../models/Tarea.js';
export class TareaController {
    view;
    storage;
    tareas;
    terminoBusqueda = '';
    filtroActual = 'todas'; // Puede ser: 'todas', 'pendientes', 'completadas'
    constructor(view, storage) {
        this.view = view;
        this.storage = storage;
        this.tareas = this.storage.cargar();
        this.view.bindAgregarTarea(this.handleAgregarTarea.bind(this));
        this.view.bindEliminarTarea(this.handleEliminarTarea.bind(this));
        this.view.bindToggleTarea(this.handleToggleTarea.bind(this));
        // NUEVO: Vincular búsqueda y filtros
        this.view.bindBuscarTarea(this.handleBuscarTarea.bind(this));
        this.view.bindFiltrarTarea(this.handleFiltrarTarea.bind(this));
        this.renderizarActualizado();
    }
    // NUEVO: Método centralizado que aplica filtros y búsqueda antes de mostrar
    renderizarActualizado() {
        let tareasFiltradas = this.tareas;
        // 1. Aplicar filtro de estado
        if (this.filtroActual === 'pendientes') {
            tareasFiltradas = tareasFiltradas.filter(t => !t.completada);
        }
        else if (this.filtroActual === 'completadas') {
            tareasFiltradas = tareasFiltradas.filter(t => t.completada);
        }
        // 2. Aplicar búsqueda por título
        if (this.terminoBusqueda) {
            tareasFiltradas = tareasFiltradas.filter(t => t.titulo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()));
        }
        this.view.renderizar(tareasFiltradas);
    }
    handleBuscarTarea(termino) {
        this.terminoBusqueda = termino;
        this.renderizarActualizado();
    }
    handleFiltrarTarea(filtro) {
        this.filtroActual = filtro;
        this.renderizarActualizado();
    }
    handleAgregarTarea(titulo, descripcion) {
        const nuevaTarea = new Tarea(crypto.randomUUID(), titulo, descripcion);
        this.tareas.push(nuevaTarea);
        this.storage.guardar(this.tareas);
        this.renderizarActualizado();
    }
    handleEliminarTarea(id) {
        this.tareas = this.tareas.filter(t => t.id !== id);
        this.storage.guardar(this.tareas);
        this.renderizarActualizado();
    }
    handleToggleTarea(id) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.completada = !tarea.completada;
            this.storage.guardar(this.tareas);
            this.renderizarActualizado();
        }
    }
}
