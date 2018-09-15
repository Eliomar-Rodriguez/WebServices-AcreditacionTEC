/*
===============================================================================================
>     BackEnd de CYE, se encarga de realizar las llamadas necesarias a la base de datos       <
===============================================================================================
*/
var consultsPreparerCYE = require('../ConsultsPreparer/consultsPreparerCYE');

// inserta CYE
exports.insertarCYE = function(datos, callback) {
    consultsPreparerCYE.insertCYE(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Error al insertar datos.";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Criterio y Estandar agregado",
                message: "Criterio y Estandar agregado con éxito",
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

// seleccionar CYE
exports.seleccionarCYE = function(callback) {
    consultsPreparerCYE.selectCYE( function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "No se puede seleccionar los Criterios y Estandares";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Selección exitosa.",
                message: "La selección de todos los Criterios y Estandares a sido exitosa",
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

// editar CYE
exports.editarCYE = function(datos, callback) {
    consultsPreparerCYE.editCYE(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede modificar el Criterio y Estandar";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Criterio y Estandar editado",
                message: "Criterio y Estandar editado con éxito",
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

// eliminar CYE
exports.eliminarCYE = function(datos, callback) {
    consultsPreparerCYE.deleteCYE(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede eliminar el Criterio y Estandar";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Criterio y Estandar eliminado",
                message: "Criterio y Estandar eliminado con éxito",
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