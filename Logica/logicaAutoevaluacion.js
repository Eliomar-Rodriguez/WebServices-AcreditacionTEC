/*
=========================================================================================================================
>     BackEnd de Autoevaluacion, se encarga del manejo de errores, asi como de lasrespuestas errones y/o exitosas       <
=========================================================================================================================
*/

var consultsPreparerAutoevaluacion = require('../ConsultsPreparer/consultsPreparerAutoevaluacion');

// inserta Autoevaluacion
exports.insertarAutoevaluacion = function(datos, callback) {
    consultsPreparerAutoevaluacion.insertAutoevaluacion(datos, function(response) {
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Autoevaluación agregada",
                message: "Autoevaluación agregada con éxito",
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: "Ya existe la Autoevaluación que desea insertar.",
                title: "Autoevaluación duplicada",
                error: response.error,
                type: "error"
            })
        }
    });
};

// seleccionar Autoevaluacion
exports.seleccionarAutoevaluacion = function(callback) {
    consultsPreparerAutoevaluacion.selectAutoevaluaciones( function(response) {
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Selección exitosa.",
                message: "La selección de todas las Autoevaluaciones a sido exitosa.",
                type: "success",
                data: response.data
            })
        } else {
            callback({
                success: false,
                title: "Error",
                message: "No se ha logrado seleccionar las Autoevaluaciones.",
                error: response.error,
                type: "error"
            })
        }
    });
};

// editar Autoevaluacion
exports.editarAutoevaluacion = function(datos, callback) {
    consultsPreparerAutoevaluacion.editAutoevaluacion(datos, function(response) {
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Autoevaluación editada",
                message: "Autoevaluación editada con éxito",
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: "No se pudo modificar la Autoevaluación",
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

// eliminar Autoevaluacion
exports.eliminarAutoevaluacion = function(datos, callback) {
    consultsPreparerAutoevaluacion.deleteAutoevaluacion(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede eliminar la Autoevaluación";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Autoevaluación eliminada",
                message: "Autoevaluación eliminada con éxito",
                type: "success"
            })
        } else {
            callback({
                success: false,
                error: response.error,
                title: "Error",
                message: msg,
                type: "error"
            })
        }
    });
};