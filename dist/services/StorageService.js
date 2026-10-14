export class StorageService {
    key;
    constructor(key) {
        this.key = key;
    }
    guardar(datos) {
        try {
            localStorage.setItem(this.key, JSON.stringify(datos));
        }
        catch (error) {
            console.error(error);
        }
    }
    cargar() {
        try {
            const datos = localStorage.getItem(this.key);
            return datos ? JSON.parse(datos) : [];
        }
        catch (error) {
            console.error(error);
            return [];
        }
    }
}
