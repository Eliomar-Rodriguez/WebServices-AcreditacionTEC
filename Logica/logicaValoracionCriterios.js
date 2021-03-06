/*
===============================================================================================================
>     BackEnd de ValoracionCriterios, se encarga de realizar las llamadas necesarias a la base de datos       <
===============================================================================================================
*/
var consultsPreparerValoracionCriterios = require('../ConsultsPreparer/consultsPreparerValoracionCriterios');

// inserta ValoracionCriterio
exports.insertarValoracionCriterio = function(datos, callback) {
    consultsPreparerValoracionCriterios.insertValoracionCriterio(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Error al insertar datos.";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Valoración de criterio agregado",
                message: "Valoración de criterio agregado con éxito",
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

// seleccionar ValoracionCriterio
exports.seleccionarValoracionCriterios = function(callback) {
    consultsPreparerValoracionCriterios.selectValoracionCriterio( function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "No se puede seleccionar las valoraciones de criterios";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Selección exitosa.",
                message: "La selección de todas las valoraciones de criterios a sido exitosa",
                type: "success",
                data: response.data         
            })
        } else {
            callback({
                success: false,
                title: "Error",
                message: msg,
                error: response.error,
                type: "error"
            })
        }
    });
};

// editar ValoracionCriterio
exports.editarValoracionCriterio = function(datos, callback) {
    consultsPreparerValoracionCriterios.editValoracionCriterio(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede modificar la valoración de criterio";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Valoración de criterio editada",
                message: "Valoración de criterio editada con éxito",
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

// eliminar ValoracionCriterio
exports.eliminarValoracionCriterio = function(datos, callback) {
    consultsPreparerValoracionCriterios.deleteValoracionCriterio(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede eliminar la valoración de criterio";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Valoración de criterio eliminada",
                message: "Valoración de criterio eliminada con éxito",
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