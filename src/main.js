import { TareaView } from './views/TareaView.js';
import { TareaController } from './controllers/TareaController.js';
import { StorageService } from './services/StorageService.js';
document.addEventListener('DOMContentLoaded', () => {
    const storage = new StorageService('tareas_db');
    const view = new TareaView();
    const app = new TareaController(view, storage);
});
