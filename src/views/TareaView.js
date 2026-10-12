export class TareaView {
    listaElement;
    formElement;
    buscadorElement;
    filtroElement;
    constructor() {
        this.listaElement = document.getElementById('lista-tareas');
        this.formElement = document.getElementById('form-tarea');
        this.buscadorElement = document.getElementById('buscador');
        this.filtroElement = document.getElementById('filtro-estado');
    }
    bindAgregarTarea(handler) {
        this.formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const titulo = document.getElementById('titulo').value;
            const desc = document.getElementById('descripcion').value;
            if (titulo && desc) {
                handler(titulo, desc);
                this.formElement.reset();
            }
        });
    }
    bindEliminarTarea(handler) {
        this.listaElement.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('btn-eliminar')) {
                const id = target.parentElement.dataset.id;
                if (confirm('¿Seguro que deseas eliminar esta tarea?')) {
                    handler(id);
                }
            }
        });
    }
    bindToggleTarea(handler) {
        this.listaElement.addEventListener('change', (e) => {
            const target = e.target;
            if (target.type === 'checkbox') {
                const id = target.parentElement.dataset.id;
                handler(id);
            }
        });
    }
    // NUEVO: Escuchar cambios en el buscador
    bindBuscarTarea(handler) {
        this.buscadorElement.addEventListener('input', (e) => {
            handler(e.target.value);
        });
    }
    // NUEVO: Escuchar cambios en el selector de filtro
    bindFiltrarTarea(handler) {
        this.filtroElement.addEventListener('change', (e) => {
            handler(e.target.value);
        });
    }
    renderizar(tareas) {
        this.listaElement.innerHTML = '';
        tareas.forEach(tarea => {
            const li = document.createElement('li');
            li.dataset.id = tarea.id;
            if (tarea.completada) {
                li.classList.add('completada');
            }
            li.innerHTML = `
                <input type="checkbox" ${tarea.completada ? 'checked' : ''} style="cursor: pointer; transform: scale(1.3);">
                <div class="tarea-content">
                    <span class="tarea-titulo">${tarea.titulo}</span>
                    <span class="tarea-desc">${tarea.descripcion}</span>
                </div>
                <button class="btn-eliminar">Eliminar</button>
            `;
            this.listaElement.appendChild(li);
        });
    }
}
