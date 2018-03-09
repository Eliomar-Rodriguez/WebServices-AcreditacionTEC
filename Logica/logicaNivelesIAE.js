/*
======================================================================================================
>     BackEnd de NivelesIAE, se encarga de realizar las llamadas necesarias a la base de datos       <
======================================================================================================
*/

var consultsPreparerNivelesIAE = require('../ConsultsPreparer/consultsPreparerNivelesIAE.js');

// inserta NivelIAE
exports.insertarNivelIAE = function(datos, callback) {
    consultsPreparerNivelesIAE.insertNivelIAE(datos, function(response) {
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "NivelIAE agregado",
                message: "NivelIAE agregado con exito",
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: "Ya existe el Nivel de avance IAE que desea insertar.",
                title: "Nivel de avance IAE duplicado",
                error: response.error,
                type: "error"
            })
        }
    });
};

// seleccionar NivelIAE
exports.seleccionarNivelIAE = function(callback) {
    consultsPreparerNivelesIAE.selectNivelIAE( function(response) {
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Selección exitosa.",
                message: "La selección de todos los Niveles de Avance IAE a sido exitosa",
                type: "success",
                data: response.data           
            })
        } else {
            callback({
                success: false,
                title: "Error",
                message: "No se pudo seleccionar los NivelIAEs",
                error: response.error,
                type: "error"
            })
        }
    });
};

// editar NivelIAE
exports.editarNivelIAE = function(datos, callback) {
    consultsPreparerNivelesIAE.editNivelIAE(datos, function(response) {
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "NivelIAE editado",
                message: "NivelIAE editado con exito",
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: "No se pudo modificar el NivelIAE",
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

// eliminar NivelIAE
exports.eliminarNivelIAE = function(datos, callback) {
    consultsPreparerNivelesIAE.deleteNivelIAE(datos, function(response) {
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "NivelIAE eliminado",
                message: "NivelIAE eliminado con éxito",
                type: "success"
            })
        } else {
            callback({
                success: false,
                error: response.error,
                title: "Error",
                message: "No se puede eliminar el NivelIAE",
                type: "error"
            })
        }
    });
};