/*
======================================================================================================
>     BackEnd de Evidencias, se encarga de realizar las llamadas necesarias a la base de datos       <
======================================================================================================
*/

var consultsPreparerEvidencia = require('../ConsultsPreparer/consultsPreparerEvidencia.js');

// inserta Evidencia
exports.insertarEvidencia = function(datos, callback) {
    consultsPreparerEvidencia.insertEvidencia(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "No se pudo insertar la Evidencia";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Evidencia agregada",
                message: "Evidencia agregado con éxito",
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

// seleccionar Evidencia
exports.seleccionarEvidencia = function(callback) {
    consultsPreparerEvidencia.selectEvidencia( function(response) {
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Selección exitosa.",
                message: "La selección de todas las Evidencias a sido exitosa",
                type: "success",
                data: response.data            
            })
        } else {
            callback({
                success: false,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

// editar Evidencia
exports.editarEvidencia = function(datos, callback) {
    consultsPreparerEvidencia.editEvidencia(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se pudo modificar la Evidencia";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Evidencia editada",
                message: "Evidencia editada con éxito",
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

// eliminar Evidencia
exports.eliminarEvidencia = function(datos, callback) {
    consultsPreparerEvidencia.deleteEvidencia(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede eliminar la Evidencia";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Evidencia eliminada",
                message: "Evidencia eliminada con éxito",
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