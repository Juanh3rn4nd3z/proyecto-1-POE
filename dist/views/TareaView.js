export class TareaView {
    listaElement;
    formElement;
    buscadorElement;
    filtroElement;
    filtroPrioridadElement;
    ordenarElement;
    btnLimpiarCompletadas;
    btnSubmit;
    btnCancelarEdicion;
    totalCountEl;
    pendingCountEl;
    completedCountEl;
    toastContainer;
    editandoId = null;
    constructor() {
        this.listaElement = document.getElementById('lista-tareas');
        this.formElement = document.getElementById('form-tarea');
        this.buscadorElement = document.getElementById('buscador');
        this.filtroElement = document.getElementById('filtro-estado');
        this.filtroPrioridadElement = document.getElementById('filtro-prioridad');
        this.ordenarElement = document.getElementById('ordenar-por');
        this.btnLimpiarCompletadas = document.getElementById('btn-limpiar-completadas');
        this.btnSubmit = document.getElementById('btn-submit');
        this.btnCancelarEdicion = document.getElementById('btn-cancelar-edicion');
        this.totalCountEl = document.getElementById('total-count');
        this.pendingCountEl = document.getElementById('pending-count');
        this.completedCountEl = document.getElementById('completed-count');
        this.toastContainer = document.getElementById('toast-container');
        const fechaInput = document.getElementById('fecha-limite');
        fechaInput?.addEventListener('click', () => {
            if ('showPicker' in HTMLInputElement.prototype) {
                try {
                    fechaInput.showPicker();
                }
                catch (e) { }
            }
        });
        this.configurarPestanas();
    }
    configurarPestanas() {
        const tabs = document.querySelectorAll('.tab-btn');
        const vistas = document.querySelectorAll('.vista-seccion');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                vistas.forEach(v => v.classList.remove('active'));
                tab.classList.add('active');
                const destino = tab.getAttribute('data-vista');
                document.getElementById(destino)?.classList.add('active');
            });
        });
    }
    mostrarNotificacion(mensaje, tipo = 'exito') {
        const alerta = document.createElement('div');
        alerta.className = `notificacion ${tipo}`;
        alerta.textContent = mensaje;
        this.toastContainer.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
    renderEditForm(tarea) {
        this.editandoId = tarea.id;
        document.getElementById('titulo').value = tarea.titulo;
        document.getElementById('descripcion').value = tarea.descripcion;
        document.getElementById('prioridad').value = tarea.prioridad;
        const fechaIso = convertirAISO(tarea.fechaLimite);
        document.getElementById('fecha-limite').value = fechaIso;
        const horaInputVal = convertirA24Horas(tarea.horaLimite);
        document.getElementById('hora-limite').value = horaInputVal;
        document.getElementById('email-responsable').value = tarea.emailResponsable || '';
        this.btnSubmit.textContent = 'Actualizar';
        this.btnCancelarEdicion.style.display = 'block';
        this.formElement.scrollIntoView({ behavior: 'smooth' });
    }
    limpiarFormulario() {
        this.editandoId = null;
        this.formElement.reset();
        this.btnSubmit.textContent = 'Agregar Tarea';
        this.btnCancelarEdicion.style.display = 'none';
    }
    renderCounter(estadisticas) {
        this.totalCountEl.textContent = estadisticas.total.toString();
        this.pendingCountEl.textContent = estadisticas.pendientes.toString();
        this.completedCountEl.textContent = estadisticas.completadas.toString();
    }
    bindFormularioTarea(onAgregar, onActualizar) {
        this.formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const titulo = document.getElementById('titulo').value.trim();
            const descripcion = document.getElementById('descripcion').value.trim();
            const prioridad = document.getElementById('prioridad').value;
            const fechaLimite = document.getElementById('fecha-limite').value;
            const horaLimite = document.getElementById('hora-limite').value;
            const email = document.getElementById('email-responsable').value.trim();
            if (this.editandoId) {
                const exito = onActualizar(this.editandoId, titulo, descripcion, prioridad, fechaLimite, horaLimite, email);
                if (exito)
                    this.limpiarFormulario();
            }
            else {
                const exito = onAgregar(titulo, descripcion, prioridad, fechaLimite, horaLimite, email);
                if (exito)
                    this.limpiarFormulario();
            }
        });
        this.btnCancelarEdicion.addEventListener('click', () => {
            this.limpiarFormulario();
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
    bindEditarTarea(handler) {
        this.listaElement.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('btn-edit')) {
                const li = target.closest('.task-item');
                const id = li?.getAttribute('data-id');
                if (id) {
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
        const emitir = () => handler(this.filtroElement.value, this.filtroPrioridadElement.value);
        this.filtroElement.addEventListener('change', emitir);
        this.filtroPrioridadElement.addEventListener('change', emitir);
    }
    bindOrdenarTarea(handler) {
        this.ordenarElement.addEventListener('change', (e) => {
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
    renderizar(tareas, estadisticas, esVencida) {
        this.renderCounter(estadisticas);
        this.listaElement.innerHTML = '';
        if (tareas.length === 0) {
            this.listaElement.innerHTML = `<li class="empty-state">No hay tareas para mostrar.</li>`;
            return;
        }
        tareas.forEach(tarea => {
            const vencida = esVencida(tarea);
            const li = document.createElement('li');
            li.className = `task-item ${tarea.completada ? 'completada' : ''} ${vencida ? 'vencida' : ''}`;
            li.setAttribute('data-id', tarea.id);
            let badgeClass = 'prioridad-baja';
            if (tarea.prioridad === 'Alta')
                badgeClass = 'prioridad-alta';
            if (tarea.prioridad === 'Media')
                badgeClass = 'prioridad-media';
            const alertaVencida = vencida ? `<span class="badge-vencida">Vencida</span>` : '';
            const fechaHoraTexto = tarea.fechaLimite
                ? `${tarea.fechaLimite} a las ${tarea.horaLimite || '00:00 AM'}`
                : 'Sin fecha límite';
            li.innerHTML = `
                <input type="checkbox" ${tarea.completada ? 'checked' : ''} class="task-checkbox">
                <div class="task-details">
                    <div class="task-header-row">
                        <span class="task-title">${escapeHTML(tarea.titulo)}</span>
                        <span class="badge-prioridad ${badgeClass}">${tarea.prioridad}</span>
                        ${alertaVencida}
                    </div>
                    <span class="task-desc">${escapeHTML(tarea.descripcion)}</span>
                    <span class="task-meta">
                        Vence: ${fechaHoraTexto} | Resp: ${escapeHTML(tarea.emailResponsable || 'N/A')}
                    </span>
                </div>
                <div class="task-actions">
                    <button class="btn-edit" type="button">Editar</button>
                    <button class="btn-delete" type="button">Eliminar</button>
                </div>
            `;
            this.listaElement.appendChild(li);
        });
    }
}
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}
function convertirA24Horas(horaAmPm) {
    if (!horaAmPm || !horaAmPm.includes('M'))
        return horaAmPm;
    const partes = horaAmPm.split(' ');
    const tiempo = partes[0].split(':');
    let horas = parseInt(tiempo[0], 10);
    const minutos = tiempo[1];
    const ampm = partes[1];
    if (ampm === 'PM' && horas < 12)
        horas += 12;
    if (ampm === 'AM' && horas === 12)
        horas = 0;
    return `${horas < 10 ? '0' + horas : horas}:${minutos}`;
}
function convertirAISO(fechaDDMMAAAA) {
    if (!fechaDDMMAAAA || !fechaDDMMAAAA.includes('/'))
        return fechaDDMMAAAA;
    const partes = fechaDDMMAAAA.split('/');
    if (partes.length === 3) {
        return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
    return fechaDDMMAAAA;
}
