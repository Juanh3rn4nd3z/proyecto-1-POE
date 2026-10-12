export class StorageService<T> {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    guardar(datos: T[]): void {
        localStorage.setItem(this.key, JSON.stringify(datos));
    }

    cargar(): T[] {
        const datos = localStorage.getItem(this.key);
        return datos ? JSON.parse(datos) : [];
    }
}