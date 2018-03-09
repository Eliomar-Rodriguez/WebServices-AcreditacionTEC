/*
======================================================================================================
>     BackEnd de Valoracion, se encarga de realizar las llamadas necesarias a la base de datos       <
======================================================================================================
*/

var consultsPreparerValoracion = require('../ConsultsPreparer/consultsPreparerValoracion.js');

// inserta Valoracion
exports.insertarValoracion = function(datos, callback) {
    consultsPreparerValoracion.insertValoracion(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "No se pudo insertar la Valoración";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Valoración agregada",
                message: "Valoración agregada con éxito",
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: "No se pudo insertar la Valoración",
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

// seleccionar Valoracion
exports.seleccionarValoracion = function(callback) {
    consultsPreparerValoracion.selectValoracion( function(response) {
        if (response.success) {
            msg = (response.error == 1) ? "Error de conexión" : "No se pudo seleccionar las Valoraciones";
            callback({
                success: true,
                error: response.error,
                title: "Selección exitosa.",
                message: "La selección de todas las Valoraciones a sido exitosa",
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

// editar Valoracion
exports.editarValoracion = function(datos, callback) {
    consultsPreparerValoracion.editValoracion(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se pudo modificar la Valoración";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Valoración editada",
                message: "Valoración editada con éxito",
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

// eliminar Valoracion
exports.eliminarValoracion = function(datos, callback) {
    consultsPreparerValoracion.deleteValoracion(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede eliminar la Valoración";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Valoración eliminada",
                message: "Valoración eliminada con éxito",
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