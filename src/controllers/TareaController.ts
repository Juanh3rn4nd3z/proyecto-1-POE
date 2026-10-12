import { ITarea, Tarea } from '../models/Tarea.js';
import { TareaView } from '../views/TareaView.js';
import { StorageService } from '../services/StorageService.js';

export class TareaController {
    private tareas: ITarea[];
    private terminoBusqueda: string = '';
    private filtroActual: string = 'todas'; // Puede ser: 'todas', 'pendientes', 'completadas'

    constructor(
        private view: TareaView,
        private storage: StorageService<ITarea>
    ) {
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
    private renderizarActualizado() {
        let tareasFiltradas = this.tareas;

        // 1. Aplicar filtro de estado
        if (this.filtroActual === 'pendientes') {
            tareasFiltradas = tareasFiltradas.filter(t => !t.completada);
        } else if (this.filtroActual === 'completadas') {
            tareasFiltradas = tareasFiltradas.filter(t => t.completada);
        }

        // 2. Aplicar búsqueda por título
        if (this.terminoBusqueda) {
            tareasFiltradas = tareasFiltradas.filter(t => 
                t.titulo.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
            );
        }

        this.view.renderizar(tareasFiltradas);
    }

    handleBuscarTarea(termino: string) {
        this.terminoBusqueda = termino;
        this.renderizarActualizado();
    }

    handleFiltrarTarea(filtro: string) {
        this.filtroActual = filtro;
        this.renderizarActualizado();
    }

    handleAgregarTarea(titulo: string, descripcion: string) {
        const nuevaTarea = new Tarea(crypto.randomUUID(), titulo, descripcion);
        this.tareas.push(nuevaTarea);
        this.storage.guardar(this.tareas);
        this.renderizarActualizado();
    }

    handleEliminarTarea(id: string) {
        this.tareas = this.tareas.filter(t => t.id !== id);
        this.storage.guardar(this.tareas);
        this.renderizarActualizado();
    }

    handleToggleTarea(id: string) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.completada = !tarea.completada;
            this.storage.guardar(this.tareas);
            this.renderizarActualizado();
        }
    }
}