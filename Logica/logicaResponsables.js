/*
===============================================================================================
> BackEnd de Responsables, se encarga de realizar las llamadas necesarias a la base de datos  <
===============================================================================================
*/
var consultsPreparerResponsable = require('../ConsultsPreparer/consultsPreparerResponsables');

// inserta Responsable
exports.insertarResponsable = function(datos, callback) {
    consultsPreparerResponsable.insertResponsable(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Error al insertar datos.";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Responsable agregado",
                message: "Responsable agregado con éxito",
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

// seleccionar Responsables
exports.seleccionarResponsables = function(callback) {
    consultsPreparerResponsable.selectResponsables( function(response) {
        if (response.success) {
            msg = (response.error == 1) ? "Error de conexión" : "No se puede seleccionar los Responsables";
            callback({
                success: true,
                error: response.error,
                title: "Selección exitosa.",
                message: "La selección de todos los Responsables a sido exitosa",
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

// editar Responsable
exports.editarResponsable = function(datos, callback) {
    consultsPreparerResponsable.editResponsable(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede modificar el Responsable";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Responsable editado",
                message: "Responsable editado con éxito",
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

// eliminar Responsable
exports.eliminarResponsable = function(datos, callback) {
    consultsPreparerResponsable.deleteResponsable(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede eliminar el Responsable";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Responsable eliminado",
                message: "Responsable eliminado con éxito",
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