export class Tarea {
    id;
    titulo;
    descripcion;
    prioridad;
    emailResponsable;
    completada;
    fechaCreacion;
    horaLimite;
    fechaLimite;
    constructor(id, titulo, descripcion, prioridad, fechaCruda, horaCruda, emailResponsable, completada = false) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.emailResponsable = emailResponsable;
        this.completada = completada;
        this.fechaLimite = formatearFechaDDMMAAAA(fechaCruda);
        this.horaLimite = formatearHoraAMPM(horaCruda);
        this.fechaCreacion = new Date().toLocaleString('es-ES', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}
function generarIdUnico() {
    return '_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}
function formatearFechaDDMMAAAA(fecha) {
    if (!fecha)
        return '';
    if (fecha.includes('-')) {
        const partes = fecha.split('-');
        if (partes.length === 3) {
            return `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
    }
    return fecha;
}
function formatearHoraAMPM(hora24) {
    if (!hora24)
        return '';
    const partes = hora24.split(':');
    let horas = parseInt(partes[0], 10);
    const minutos = partes[1] || '00';
    const ampm = horas >= 12 ? 'PM' : 'AM';
    horas = horas % 12;
    horas = horas ? horas : 12;
    const horasStr = horas < 10 ? '0' + horas : horas.toString();
    return `${horasStr}:${minutos} ${ampm}`;
}
export class TareaModel {
    storage;
    tareas;
    constructor(storage) {
        this.storage = storage;
        this.tareas = this.storage.cargar();
    }
    getTareas() {
        return [...this.tareas];
    }
    getTareaById(id) {
        return this.tareas.find(t => t.id === id);
    }
    existeDuplicado(titulo, excluirId) {
        return this.tareas.some(t => t.titulo.toLowerCase().trim() === titulo.toLowerCase().trim() && t.id !== excluirId);
    }
    addTarea(titulo, descripcion, prioridad, fechaLimite, horaLimite, emailResponsable) {
        const nuevaTarea = new Tarea(generarIdUnico(), titulo, descripcion, prioridad, fechaLimite, horaLimite, emailResponsable);
        this.tareas.unshift(nuevaTarea);
        this.storage.guardar(this.tareas);
    }
    updateTarea(id, titulo, descripcion, prioridad, fechaLimite, horaLimite, emailResponsable) {
        const index = this.tareas.findIndex(t => t.id === id);
        if (index === -1)
            return false;
        const fechaFormateada = formatearFechaDDMMAAAA(fechaLimite);
        const horaFormateada = horaLimite.includes('M') ? horaLimite : formatearHoraAMPM(horaLimite);
        this.tareas[index] = {
            ...this.tareas[index],
            titulo,
            descripcion,
            prioridad,
            fechaLimite: fechaFormateada,
            horaLimite: horaFormateada,
            emailResponsable
        };
        this.storage.guardar(this.tareas);
        return true;
    }
    deleteTarea(id) {
        this.tareas = this.tareas.filter(t => t.id !== id);
        this.storage.guardar(this.tareas);
    }
    toggleTarea(id) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.completada = !tarea.completada;
            this.storage.guardar(this.tareas);
        }
    }
    eliminarCompletadas() {
        const cantidad = this.tareas.filter(t => t.completada).length;
        this.tareas = this.tareas.filter(t => !t.completada);
        this.storage.guardar(this.tareas);
        return cantidad;
    }
    searchTareas(termino, lista = this.tareas) {
        if (termino.trim() === '')
            return lista;
        const q = termino.toLowerCase().trim();
        return lista.filter(t => t.titulo.toLowerCase().includes(q));
    }
    filterTareas(estado, prioridad, lista = this.tareas) {
        return lista.filter(t => {
            const coincideEstado = estado === 'todas' ? true :
                estado === 'pendientes' ? !t.completada :
                    estado === 'completadas' ? t.completada : true;
            const coincidePrioridad = prioridad === 'todas' ? true : t.prioridad === prioridad;
            return coincideEstado && coincidePrioridad;
        });
    }
    ordenarTareas(orden, lista) {
        const copia = [...lista];
        const peso = { 'Alta': 3, 'Media': 2, 'Baja': 1 };
        if (orden === 'prioridad') {
            return copia.sort((a, b) => peso[b.prioridad] - peso[a.prioridad]);
        }
        else if (orden === 'fecha') {
            return copia.sort((a, b) => {
                const parseFecha = (fStr) => {
                    if (!fStr || !fStr.includes('/'))
                        return 0;
                    const [d, m, y] = fStr.split('/');
                    return new Date(`${y}-${m}-${d}`).getTime();
                };
                return parseFecha(a.fechaLimite) - parseFecha(b.fechaLimite);
            });
        }
        return copia;
    }
    obtenerEstadisticas() {
        const total = this.tareas.length;
        const completadas = this.tareas.filter(t => t.completada).length;
        const pendientes = total - completadas;
        return { total, completadas, pendientes };
    }
    esVencida(tarea) {
        if (tarea.completada)
            return false;
        if (!tarea.fechaLimite || !tarea.fechaLimite.includes('/'))
            return false;
        const [d, m, y] = tarea.fechaLimite.split('/');
        const fechaLimiteObj = new Date(`${y}-${m}-${d}`);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        return fechaLimiteObj.getTime() < hoy.getTime();
    }
}
