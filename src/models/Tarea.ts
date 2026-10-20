import { StorageService } from '../services/StorageService.js';

export interface ITarea {
    id: string;
    titulo: string;
    descripcion: string;
    prioridad: 'Baja' | 'Media' | 'Alta';
    fechaLimite: string;
    horaLimite: string;
    emailResponsable: string;
    completada: boolean;
    fechaCreacion: string;
}

export class Tarea implements ITarea {
    public fechaCreacion: string;
    public horaLimite: string;
    public fechaLimite: string;

    constructor(
        public id: string,
        public titulo: string,
        public descripcion: string,
        public prioridad: 'Baja' | 'Media' | 'Alta',
        fechaCruda: string,
        horaCruda: string,
        public emailResponsable: string,
        public completada: boolean = false
    ) {
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

function generarIdUnico(): string {
    return '_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function formatearFechaDDMMAAAA(fecha: string): string {
    if (!fecha) return '';
    if (fecha.includes('-')) {
        const partes = fecha.split('-');
        if (partes.length === 3) {
            return `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
    }
    return fecha;
}

function formatearHoraAMPM(hora24: string): string {
    if (!hora24) return '';
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
    private tareas: ITarea[];

    constructor(private storage: StorageService<ITarea>) {
        this.tareas = this.storage.cargar();
    }

    getTareas(): ITarea[] {
        return [...this.tareas];
    }

    getTareaById(id: string): ITarea | undefined {
        return this.tareas.find(t => t.id === id);
    }

    existeDuplicado(titulo: string, excluirId?: string): boolean {
        return this.tareas.some(t => 
            t.titulo.toLowerCase().trim() === titulo.toLowerCase().trim() && t.id !== excluirId
        );
    }

    addTarea(
        titulo: string,
        descripcion: string,
        prioridad: 'Baja' | 'Media' | 'Alta',
        fechaLimite: string,
        horaLimite: string,
        emailResponsable: string
    ): void {
        const nuevaTarea = new Tarea(
            generarIdUnico(),
            titulo,
            descripcion,
            prioridad,
            fechaLimite,
            horaLimite,
            emailResponsable
        );
        this.tareas.unshift(nuevaTarea);
        this.storage.guardar(this.tareas);
    }

    updateTarea(
        id: string,
        titulo: string,
        descripcion: string,
        prioridad: 'Baja' | 'Media' | 'Alta',
        fechaLimite: string,
        horaLimite: string,
        emailResponsable: string
    ): boolean {
        const index = this.tareas.findIndex(t => t.id === id);
        if (index === -1) return false;

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

    deleteTarea(id: string): void {
        this.tareas = this.tareas.filter(t => t.id !== id);
        this.storage.guardar(this.tareas);
    }

    toggleTarea(id: string): void {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.completada = !tarea.completada;
            this.storage.guardar(this.tareas);
        }
    }

    eliminarCompletadas(): number {
        const cantidad = this.tareas.filter(t => t.completada).length;
        this.tareas = this.tareas.filter(t => !t.completada);
        this.storage.guardar(this.tareas);
        return cantidad;
    }

    searchTareas(termino: string, lista: ITarea[] = this.tareas): ITarea[] {
        if (termino.trim() === '') return lista;
        const q = termino.toLowerCase().trim();
        return lista.filter(t => t.titulo.toLowerCase().includes(q));
    }

    filterTareas(estado: string, prioridad: string, lista: ITarea[] = this.tareas): ITarea[] {
        return lista.filter(t => {
            const coincideEstado =
                estado === 'todas' ? true :
                estado === 'pendientes' ? !t.completada :
                estado === 'completadas' ? t.completada : true;

            const coincidePrioridad =
                prioridad === 'todas' ? true : t.prioridad === prioridad;

            return coincideEstado && coincidePrioridad;
        });
    }

    ordenarTareas(orden: string, lista: ITarea[]): ITarea[] {
        const copia = [...lista];
        const peso: Record<'Baja' | 'Media' | 'Alta', number> = { 'Alta': 3, 'Media': 2, 'Baja': 1 };

        if (orden === 'prioridad') {
            return copia.sort((a, b) => peso[b.prioridad] - peso[a.prioridad]);
        } else if (orden === 'fecha') {
            return copia.sort((a, b) => {
                const parseFecha = (fStr: string) => {
                    if (!fStr || !fStr.includes('/')) return 0;
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

    esVencida(tarea: ITarea): boolean {
        if (tarea.completada) return false;
        if (!tarea.fechaLimite || !tarea.fechaLimite.includes('/')) return false;

        const [d, m, y] = tarea.fechaLimite.split('/');
        const fechaLimiteObj = new Date(`${y}-${m}-${d}`);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        return fechaLimiteObj.getTime() < hoy.getTime();
    }
}