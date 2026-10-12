export class StorageService {
    key;
    constructor(key) {
        this.key = key;
    }
    guardar(datos) {
        localStorage.setItem(this.key, JSON.stringify(datos));
    }
    cargar() {
        const datos = localStorage.getItem(this.key);
        return datos ? JSON.parse(datos) : [];
    }
}
