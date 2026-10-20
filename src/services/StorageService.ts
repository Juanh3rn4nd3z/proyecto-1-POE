export class StorageService<T> {
    constructor(private key: string) {}

    guardar(datos: T[]): void {
        try {
            localStorage.setItem(this.key, JSON.stringify(datos));
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    }

    cargar(): T[] {
        try {
            const datos = localStorage.getItem(this.key);
            return datos ? JSON.parse(datos) : [];
        } catch (error) {
            console.error('Error al cargar de localStorage:', error);
            return [];
        }
    }
}