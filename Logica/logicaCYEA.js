/*
===============================================================================================
>     BackEnd de CYE, se encarga de realizar las llamadas necesarias a la base de datos       <
===============================================================================================
*/
var consultsPreparerCYEA = require('../ConsultsPreparer/consultsPreparerCYEA');

// inserta CYEA
exports.insertarCYEA = function(datos, callback) {
    consultsPreparerCYEA.insertCYEA(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Ya existe el Criterio y Estandar Ajustado que desea insertar.";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Criterio y Estandar Ajustado agregado",
                message: "Criterio y Estandar Ajustado agregado con éxito",
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

// seleccionar CYEA
exports.seleccionarCYEA = function(callback) {
    consultsPreparerCYEA.selectCYEA( function(response) {
        if (response.success) {
            msg = (response.error == 1) ? "Error de conexión" : "No se puede seleccionar los Criterios y Estandares Ajustados";
            callback({
                success: true,
                error: response.error,
                title: "Selección exitosa.",
                message: "La selección de todos los Criterio y Estandar Ajustado a sido exitosa",
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

// editar CYEA
exports.editarCYEA = function(datos, callback) {
    consultsPreparerCYEA.editCYEA(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede modificar el Criterio y Estandar Ajustado";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Criterio y Estandar Ajustado editado",
                message: "Criterio y Estandar Ajustado editado con éxito",
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

// eliminar CYEA
exports.eliminarCYEA = function(datos, callback) {
    consultsPreparerCYEA.deleteCYEA(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede eliminar el Criterio y Estandar Ajustado";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Criterio y Estandar Ajustado eliminado",
                message: "Criterio y Estandar Ajustado eliminado con éxito",
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