/*
======================================================================================================
>     BackEnd de NivelesIAE, se encarga de realizar las llamadas necesarias a la base de datos       <
======================================================================================================
*/
var consultsPreparerNivelesIAE = require('../ConsultsPreparer/consultsPreparerNivelesIAE');

// inserta NivelIAE
exports.insertarNivelIAE = function(datos, callback) {
    consultsPreparerNivelesIAE.insertNivelIAE(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Ya existe el Nivel de avance IAE que desea insertar.";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "NivelIAE agregado",
                message: "Nivel de avance IAE agregado con exito",
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

// seleccionar NivelIAE
exports.seleccionarNivelIAE = function(callback) {
    consultsPreparerNivelesIAE.selectNivelIAE( function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "No se puede seleccionar los Niveles de avance IAE";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Selección exitosa.",
                message: "La selección de todos los Niveles de avance IAE a sido exitosa",
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

// editar NivelIAE
exports.editarNivelIAE = function(datos, callback) {
    consultsPreparerNivelesIAE.editNivelIAE(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede modificar el Nivel de avance IAE";
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
                message: msg,
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
        msg = (response.error == 1) ? "Error de conexión" : "No se puede eliminar el Nivel de avance IAE";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "NivelIAE eliminado",
                message: "Nivel de avance IAE eliminado con éxito",
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