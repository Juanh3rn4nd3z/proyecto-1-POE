export class TareaController {
    view;
    model;
    terminoBusqueda = '';
    filtroEstado = 'todas';
    filtroPrioridad = 'todas';
    ordenActual = 'ninguno';
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.view.bindFormularioTarea(this.handleAgregarTarea.bind(this), this.handleUpdate.bind(this));
        this.view.bindEliminarTarea(this.handleDelete.bind(this));
        this.view.bindEditarTarea(this.handlePrepararEdicion.bind(this));
        this.view.bindToggleTarea(this.handleToggleTarea.bind(this));
        this.view.bindBuscarTarea(this.handleSearch.bind(this));
        this.view.bindFiltrarTarea(this.handleFiltrarTarea.bind(this));
        this.view.bindOrdenarTarea(this.handleOrdenarTarea.bind(this));
        this.view.bindEliminarCompletadas(this.handleEliminarCompletadas.bind(this));
        this.actualizarVistaGeneral();
    }
    validarCampos(titulo, descripcion, prioridad, fechaLimite, horaLimite, email, idEdicion) {
        if (!titulo || !descripcion || !prioridad || !fechaLimite || !horaLimite || !email) {
            return 'Todos los campos son obligatorios.';
        }
        if (this.model.existeDuplicado(titulo, idEdicion)) {
            return 'Error: Ya existe una tarea registrada con ese mismo nombre.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Error: El formato del correo electrónico no es válido.';
        }
        return null;
    }
    actualizarVistaGeneral() {
        let tareasFiltradas = this.model.getTareas();
        tareasFiltradas = this.model.searchTareas(this.terminoBusqueda, tareasFiltradas);
        tareasFiltradas = this.model.filterTareas(this.filtroEstado, this.filtroPrioridad, tareasFiltradas);
        tareasFiltradas = this.model.ordenarTareas(this.ordenActual, tareasFiltradas);
        const estadisticas = this.model.obtenerEstadisticas();
        this.view.renderizar(tareasFiltradas, estadisticas, (t) => this.model.esVencida(t));
    }
    handleAgregarTarea(titulo, descripcion, prioridad, fechaLimite, horaLimite, email) {
        const error = this.validarCampos(titulo, descripcion, prioridad, fechaLimite, horaLimite, email);
        if (error) {
            this.view.mostrarNotificacion(error, 'error');
            return false;
        }
        this.model.addTarea(titulo, descripcion, prioridad, fechaLimite, horaLimite, email);
        this.actualizarVistaGeneral();
        this.view.mostrarNotificacion('Tarea agregada correctamente.', 'exito');
        return true;
    }
    handlePrepararEdicion(id) {
        const tarea = this.model.getTareaById(id);
        if (tarea) {
            this.view.renderEditForm(tarea);
        }
    }
    handleUpdate(id, titulo, descripcion, prioridad, fechaLimite, horaLimite, email) {
        const error = this.validarCampos(titulo, descripcion, prioridad, fechaLimite, horaLimite, email, id);
        if (error) {
            this.view.mostrarNotificacion(error, 'error');
            return false;
        }
        this.model.updateTarea(id, titulo, descripcion, prioridad, fechaLimite, horaLimite, email);
        this.actualizarVistaGeneral();
        this.view.mostrarNotificacion('Tarea actualizada correctamente.', 'exito');
        return true;
    }
    handleDelete(id) {
        this.model.deleteTarea(id);
        this.actualizarVistaGeneral();
        this.view.mostrarNotificacion('Tarea eliminada.', 'exito');
    }
    handleToggleTarea(id) {
        this.model.toggleTarea(id);
        this.actualizarVistaGeneral();
    }
    handleSearch(termino) {
        this.terminoBusqueda = termino;
        this.actualizarVistaGeneral();
    }
    handleFiltrarTarea(estado, prioridad) {
        this.filtroEstado = estado;
        this.filtroPrioridad = prioridad;
        this.actualizarVistaGeneral();
    }
    handleOrdenarTarea(orden) {
        this.ordenActual = orden;
        this.actualizarVistaGeneral();
    }
    handleEliminarCompletadas() {
        const eliminadas = this.model.eliminarCompletadas();
        this.actualizarVistaGeneral();
        if (eliminadas > 0) {
            this.view.mostrarNotificacion('Tareas completadas eliminadas.', 'exito');
        }
    }
}
