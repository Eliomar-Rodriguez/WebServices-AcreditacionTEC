/*
====================================================================================================
>     BackEnd de Usuarios, se encarga de realizar las llamadas necesarias a la base de datos       <
====================================================================================================
*/

var consultsPreparerUsuarios = require('../ConsultsPreparer/consultsPreparerUsuarios.js');

// inserta Usuario
exports.insertarUsuario = function(datos, callback) {
    consultsPreparerUsuarios.insertUsuario(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "No se pudo insertar el Usuario";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Usuario agregado",
                message: "Usuario agregado con exito",
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

// seleccionar Usuario
exports.seleccionarUsuarios = function(callback) {
    consultsPreparerUsuarios.selectUsuarios( function(response) {
        if (response.success) {
            msg = (response.error == 1) ? "Error de conexión" : "No se pudo seleccionar los Usuarios";
            callback({
                success: true,
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

// editar Usuario
exports.editarUsuario = function(datos, callback) {
    consultsPreparerUsuarios.editUsuario(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se pudo modificar el Usuario";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Usuario editado",
                message: "Usuario editado con exito",
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

// eliminar Usuario
exports.eliminarUsuario = function(datos, callback) {
    consultsPreparerUsuarios.deleteUsuario(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede eliminar el Usuario";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Usuario eliminado",
                message: "Usuario eliminado con éxito",
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