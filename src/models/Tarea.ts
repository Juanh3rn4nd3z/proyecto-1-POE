export interface ITarea {
    id: string;
    titulo: string;
    descripcion: string;
    prioridad: 'Baja' | 'Media' | 'Alta';
    completada: boolean;
    fechaCreacion: string;
}

export class Tarea implements ITarea {
    public fechaCreacion: string;

    constructor(
        public id: string,
        public titulo: string,
        public descripcion: string,
        public prioridad: 'Baja' | 'Media' | 'Alta',
        public completada: boolean = false
    ) {
        this.fechaCreacion = new Date().toLocaleString('es-ES', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}