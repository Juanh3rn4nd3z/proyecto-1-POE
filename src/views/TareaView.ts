import { ITarea } from '../models/Tarea.js';

export class TareaView {
    private listaElement: HTMLElement;
    private formElement: HTMLFormElement;
    private buscadorElement: HTMLInputElement;
    private filtroElement: HTMLSelectElement;

    constructor() {
        this.listaElement = document.getElementById('lista-tareas')!;
        this.formElement = document.getElementById('form-tarea') as HTMLFormElement;
        this.buscadorElement = document.getElementById('buscador') as HTMLInputElement;
        this.filtroElement = document.getElementById('filtro-estado') as HTMLSelectElement;
    }

    bindAgregarTarea(handler: (titulo: string, desc: string) => void) {
        this.formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const titulo = (document.getElementById('titulo') as HTMLInputElement).value;
            const desc = (document.getElementById('descripcion') as HTMLInputElement).value;
            if (titulo && desc) {
                handler(titulo, desc);
                this.formElement.reset();
            }
        });
    }

    bindEliminarTarea(handler: (id: string) => void) {
        this.listaElement.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('btn-eliminar')) {
                const id = target.parentElement!.dataset.id!;
                if(confirm('¿Seguro que deseas eliminar esta tarea?')) {
                    handler(id);
                }
            }
        });
    }

    bindToggleTarea(handler: (id: string) => void) {
         this.listaElement.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement;
            if (target.type === 'checkbox') {
                const id = target.parentElement!.dataset.id!;
                handler(id);
            }
        });
    }

    // NUEVO: Escuchar cambios en el buscador
    bindBuscarTarea(handler: (termino: string) => void) {
        this.buscadorElement.addEventListener('input', (e) => {
            handler((e.target as HTMLInputElement).value);
        });
    }

    // NUEVO: Escuchar cambios en el selector de filtro
    bindFiltrarTarea(handler: (filtro: string) => void) {
        this.filtroElement.addEventListener('change', (e) => {
            handler((e.target as HTMLSelectElement).value);
        });
    }

    renderizar(tareas: ITarea[]) {
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