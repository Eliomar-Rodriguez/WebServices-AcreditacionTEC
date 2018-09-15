/*
====================================================================================================
> BackEnd de Responsabilidades, se encarga de realizar las llamadas necesarias a la base de datos  <
====================================================================================================
*/
var consultsPreparerResponsabilidad = require('../ConsultsPreparer/consultsPreparerResponsabilidad');

// inserta Responsabilidad
exports.insertarResponsabilidad = function(datos, callback) {
    consultsPreparerResponsabilidad.insertResponsabilidad(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Error al insertar datos.";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Responsabilidad agregada",
                message: "Responsabilidad agregada con éxito",
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

// seleccionar Responsabilidades
exports.seleccionarResponsabilidades = function(callback) {
    consultsPreparerResponsabilidad.selectResponsabilidades( function(response) {
        if (response.success) {
            msg = (response.error == 1) ? "Error de conexión" : "No se puede seleccionar las Responsabilidades";
            callback({
                success: true,
                error: response.error,
                title: "Selección exitosa.",
                message: "La selección de todas las Responsabilidades a sido exitosa",
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

// editar Responsabilidad
exports.editarResponsabilidad = function(datos, callback) {
    consultsPreparerResponsabilidad.editResponsabilidad(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede modificar la Responsabilidad";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Responsabilidad editada",
                message: "Responsabilidad editada con éxito",
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

// eliminar Responsabilidad
exports.eliminarResponsabilidad = function(datos, callback) {
    consultsPreparerResponsabilidad.deleteResponsabilidad(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede eliminar la Responsabilidad";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Responsabilidad eliminada",
                message: "Responsabilidad eliminada con éxito",
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