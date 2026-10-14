import { ITarea } from '../models/Tarea.js';

export class TareaView {
    private listaElement: HTMLElement;
    private formElement: HTMLFormElement;
    private buscadorElement: HTMLInputElement;
    private filtroElement: HTMLSelectElement;
    private btnLimpiarCompletadas: HTMLButtonElement;
    private totalCountEl: HTMLElement;
    private pendingCountEl: HTMLElement;
    private completedCountEl: HTMLElement;

    constructor() {
        this.listaElement = document.getElementById('lista-tareas')!;
        this.formElement = document.getElementById('form-tarea') as HTMLFormElement;
        this.buscadorElement = document.getElementById('buscador') as HTMLInputElement;
        this.filtroElement = document.getElementById('filtro-estado') as HTMLSelectElement;
        this.btnLimpiarCompletadas = document.getElementById('btn-limpiar-completadas') as HTMLButtonElement;
        this.totalCountEl = document.getElementById('total-count')!;
        this.pendingCountEl = document.getElementById('pending-count')!;
        this.completedCountEl = document.getElementById('completed-count')!;
    }

    bindAgregarTarea(handler: (titulo: string, desc: string, prioridad: 'Baja' | 'Media' | 'Alta') => void) {
        this.formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const tituloInput = document.getElementById('titulo') as HTMLInputElement;
            const descInput = document.getElementById('descripcion') as HTMLInputElement;
            const prioridadSelect = document.getElementById('prioridad') as HTMLSelectElement;

            const titulo = tituloInput.value.trim();
            const descripcion = descInput.value.trim();
            const prioridad = prioridadSelect.value as 'Baja' | 'Media' | 'Alta';

            if (titulo && descripcion && prioridad) {
                handler(titulo, descripcion, prioridad);
                this.formElement.reset();
            }
        });
    }

    bindEliminarTarea(handler: (id: string) => void) {
        this.listaElement.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('btn-delete')) {
                const li = target.closest('.task-item');
                const id = li?.getAttribute('data-id');
                if (id && confirm('¿Desea eliminar esta tarea?')) {
                    handler(id);
                }
            }
        });
    }

    bindToggleTarea(handler: (id: string) => void) {
        this.listaElement.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement;
            if (target.classList.contains('task-checkbox')) {
                const li = target.closest('.task-item');
                const id = li?.getAttribute('data-id');
                if (id) {
                    handler(id);
                }
            }
        });
    }

    bindBuscarTarea(handler: (termino: string) => void) {
        this.buscadorElement.addEventListener('input', (e) => {
            handler((e.target as HTMLInputElement).value);
        });
    }

    bindFiltrarTarea(handler: (filtro: string) => void) {
        this.filtroElement.addEventListener('change', (e) => {
            handler((e.target as HTMLSelectElement).value);
        });
    }

    bindEliminarCompletadas(handler: () => void) {
        this.btnLimpiarCompletadas.addEventListener('click', () => {
            if (confirm('¿Desea eliminar todas las tareas completadas?')) {
                handler();
            }
        });
    }

    renderizar(tareas: ITarea[], estadisticas: { total: number, pendientes: number, completadas: number }) {
        this.totalCountEl.textContent = estadisticas.total.toString();
        this.pendingCountEl.textContent = estadisticas.pendientes.toString();
        this.completedCountEl.textContent = estadisticas.completadas.toString();

        this.listaElement.innerHTML = '';
        
        if (tareas.length === 0) {
            this.listaElement.innerHTML = `<li class="empty-state">No hay tareas para mostrar.</li>`;
            return;
        }

        tareas.forEach(tarea => {
            const li = document.createElement('li');
            li.className = `task-item ${tarea.completada ? 'completada' : ''}`;
            li.setAttribute('data-id', tarea.id);

            let badgeClass = 'prioridad-baja';
            if (tarea.prioridad === 'Alta') badgeClass = 'prioridad-alta';
            if (tarea.prioridad === 'Media') badgeClass = 'prioridad-media';

            li.innerHTML = `
                <input type="checkbox" ${tarea.completada ? 'checked' : ''} class="task-checkbox">
                <div class="task-details">
                    <div class="task-header-row">
                        <span class="task-title">${escapeHTML(tarea.titulo)}</span>
                        <span class="badge-prioridad ${badgeClass}">${tarea.prioridad}</span>
                    </div>
                    <span class="task-desc">${escapeHTML(tarea.descripcion)}</span>
                    <span class="task-meta">Creada: ${tarea.fechaCreacion}</span>
                </div>
                <button class="btn-delete">Eliminar</button>
            `;
            this.listaElement.appendChild(li);
        });
    }
}

function escapeHTML(str: string): string {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}