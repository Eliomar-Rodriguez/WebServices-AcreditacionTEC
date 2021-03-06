/*
===============================================================================================
>  BackEnd de Dimensiones, se encarga de realizar las llamadas necesarias a la base de datos  <
===============================================================================================
*/
var consultsPreparerDimensiones = require('../ConsultsPreparer/consultsPreparerDimensiones');

// inserta dimensiones
exports.insertarDimension = function(datos, callback) {
    consultsPreparerDimensiones.insertDimension(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Error al insertar datos.";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Dimensión agregada",
                message: "Dimensión agregada con exito",
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

// seleccionar dimension
exports.seleccionarDimension = function(callback) {
    consultsPreparerDimensiones.selectDimension(function(response) {
        console.log(response.success)
        msg = (response.error == 1) ? "Error de conexión" : "No se puede seleccionar las dimensiones";
        if (response.success) { 
            callback({
                success: true,
                error: response.error,
                title: "Selección exitosa.",
                message: "La selección de todas las Dimensiones a sido exitosa",
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

// editar dimension
exports.editarDimension = function(datos, callback) {
    consultsPreparerDimensiones.editDimension(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede modificar la dimensión";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Dimensión editada",
                message: "Dimensión editada con exito",
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

// eliminar dimension
exports.eliminarDimension = function(datos, callback) {
    consultsPreparerDimensiones.deleteDimension(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede eliminar la dimensión";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Dimensión eliminada",
                message: "Dimensión eliminada con éxito",
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