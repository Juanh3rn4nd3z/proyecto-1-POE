export class Tarea {
    id;
    titulo;
    descripcion;
    prioridad;
    completada;
    fechaCreacion;
    constructor(id, titulo, descripcion, prioridad, completada = false) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.completada = completada;
        this.fechaCreacion = new Date().toLocaleString('es-ES', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}
