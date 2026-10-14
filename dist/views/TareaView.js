export class TareaView {
    listaElement;
    formElement;
    buscadorElement;
    filtroElement;
    btnLimpiarCompletadas;
    totalCountEl;
    pendingCountEl;
    completedCountEl;
    constructor() {
        this.listaElement = document.getElementById('lista-tareas');
        this.formElement = document.getElementById('form-tarea');
        this.buscadorElement = document.getElementById('buscador');
        this.filtroElement = document.getElementById('filtro-estado');
        this.btnLimpiarCompletadas = document.getElementById('btn-limpiar-completadas');
        this.totalCountEl = document.getElementById('total-count');
        this.pendingCountEl = document.getElementById('pending-count');
        this.completedCountEl = document.getElementById('completed-count');
    }
    bindAgregarTarea(handler) {
        this.formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const tituloInput = document.getElementById('titulo');
            const descInput = document.getElementById('descripcion');
            const prioridadSelect = document.getElementById('prioridad');
            const titulo = tituloInput.value.trim();
            const descripcion = descInput.value.trim();
            const prioridad = prioridadSelect.value;
            if (titulo && descripcion && prioridad) {
                handler(titulo, descripcion, prioridad);
                this.formElement.reset();
            }
        });
    }
    bindEliminarTarea(handler) {
        this.listaElement.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('btn-delete')) {
                const li = target.closest('.task-item');
                const id = li?.getAttribute('data-id');
                if (id && confirm('¿Desea eliminar esta tarea?')) {
                    handler(id);
                }
            }
        });
    }
    bindToggleTarea(handler) {
        this.listaElement.addEventListener('change', (e) => {
            const target = e.target;
            if (target.classList.contains('task-checkbox')) {
                const li = target.closest('.task-item');
                const id = li?.getAttribute('data-id');
                if (id) {
                    handler(id);
                }
            }
        });
    }
    bindBuscarTarea(handler) {
        this.buscadorElement.addEventListener('input', (e) => {
            handler(e.target.value);
        });
    }
    bindFiltrarTarea(handler) {
        this.filtroElement.addEventListener('change', (e) => {
            handler(e.target.value);
        });
    }
    bindEliminarCompletadas(handler) {
        this.btnLimpiarCompletadas.addEventListener('click', () => {
            if (confirm('¿Desea eliminar todas las tareas completadas?')) {
                handler();
            }
        });
    }
    renderizar(tareas, estadisticas) {
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
            if (tarea.prioridad === 'Alta')
                badgeClass = 'prioridad-alta';
            if (tarea.prioridad === 'Media')
                badgeClass = 'prioridad-media';
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
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}
