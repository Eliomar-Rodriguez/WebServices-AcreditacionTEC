/*
=======================================================================================================
>     BackEnd de CumpliNomin, se encarga de realizar las llamadas necesarias a la base de datos       <
=======================================================================================================
*/

var consultsPreparerCumpliNomin = require('../ConsultsPreparer/consultsPreparerCumpliNomin.js');

// inserta Cumplimiento Nominal
exports.insertarCumpliNomin = function(datos, callback) {
    consultsPreparerCumpliNomin.insertCumpliNomin(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "No se pudo insertar el Cumplimiento Nominal";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Cumplimiento Nominal agregado",
                message: "Cumplimiento Nominal agregado con exito",
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

// seleccionar CumpliNomin
exports.seleccionarCumpliNomin = function(callback) {
    consultsPreparerCumpliNomin.selectCumpliNomin( function(response) {
        if (response.success) {
            msg = (response.error == 1) ? "Error de conexión" : "No se pudo seleccionar los Cumplimientos Nominales";
            callback({
                success: true,
                error: response.error,
                title: "Selección exitosa.",
                message: "La selección de todos los Cumplimientos Nominales a sido exitosa",
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

// editar CumpliNomin
exports.editarCumpliNomin = function(datos, callback) {
    consultsPreparerCumpliNomin.editCumpliNomin(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se pudo modificar el Cumplimiento Nominal";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Cumplimiento Nominal editado",
                message: "Cumplimiento Nominal editado con exito",
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

// eliminar CumpliNomin
exports.eliminarCumpliNomin = function(datos, callback) {
    consultsPreparerCumpliNomin.deleteCumpliNomin(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede eliminar el Cumplimiento Nominal";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Cumplimiento Nominal eliminado",
                message: "Cumplimiento Nominal eliminado con éxito",
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