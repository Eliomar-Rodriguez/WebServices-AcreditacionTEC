/*
===============================================================================================
>  BackEnd de Componentes, se encarga de realizar las llamadas necesarias a la base de datos  <
===============================================================================================
*/
var consultsPreparerComponente = require('../ConsultsPreparer/consultsPreparerComponente');

// inserta componentes
exports.insertarComponente = function(datos, callback) {
    consultsPreparerComponente.insertComponente(datos, function(response) {
        console.log(response);
        console.log(response.error);
        msg = (response.error == 1) ? "Error de conexión" : "Error al insertar datos.";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Componente agregado",
                message: "Componente agregado con exito",
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

// seleccionar componentes
exports.seleccionarComponente = function(callback) {
    consultsPreparerComponente.selectComponente(function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "No se puede seleccionar los Componentes";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Selección exitosa.",
                message: "La selección de todos los Componentes a sido exitosa",
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

// editar componentes
exports.editarComponente = function(datos, callback) {
    consultsPreparerComponente.editComponente(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede modificar el Componente";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Componente editado",
                message: "Componente editado con exito",
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

// eliminar componentes
exports.eliminarComponente = function(datos, callback) {
    consultsPreparerComponente.deleteComponente(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede eliminar el Componente";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Componente eliminado",
                message: "Componente eliminado con éxito",
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