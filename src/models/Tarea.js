export class Tarea {
    id;
    titulo;
    descripcion;
    completada;
    constructor(id, titulo, descripcion, completada = false) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.completada = completada;
    }
}
