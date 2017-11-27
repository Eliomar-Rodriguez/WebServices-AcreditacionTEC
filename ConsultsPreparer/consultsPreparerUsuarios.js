var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConection = require('../ConexionDBs/sqlConection.js');

/*
===========================
>  CRUD's de Usuarios     <
>   - insert              <
>   - select              <
>   - edit                <
>   - delete              <
===========================
*/
exports.insertUsuario = function insertUsuario(datos, callback) {
    var request = new Request('insertUsuario', function(err) { // nombre de procedimiento en la base de datos
        if (err) {
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: "Sucedio un error en la inserción de los datos",
                type: "error"
            })
        }
    });
    request.addParameter('Correo', TYPES.VarChar, datos.Correo);
    request.addParameter('NombreCompleto', TYPES.VarChar, datos.NombreCompleto);
    request.addParameter('Tipo', TYPES.Int, datos.Tipo);

    request.addOutputParameter('success', TYPES.Bit);
    
    sqlConection.callProcedure(request, function(res) {
        callback(res);
    });
}

exports.selectUsuarios = function(callback) {  
    var query = "SELECT * FROM Usuarios"; //Agregar procedimiento almacenado para esta consulta
    var request = new Request(query, function(err) {
        if (err) {
            callback({
                success: false,
                data: err,
                error: request.error,
                title: "Error",
                message: "Error obteniendo los datos. Revise su conexión",
                type: "error"
            });
        }
    });
    // se usa executeRequest porque es el destinado para escribir consultas desde aca en vez de llamar procedimientos almacenados
    sqlConection.executeRequest(request, callback); 
}

exports.editUsuario = function editUsuario(datos, callback) {
    var request = new Request('editUsuario', function(err) {
        if (err) {
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: "Sucedio un error en la modificación de los datos",
                type: "error"
            })
        }
    });

    request.addParameter('ID', TYPES.Int, datos.ID);
    request.addParameter('Correo', TYPES.VarChar, datos.Correo);
    request.addParameter('NombreCompleto', TYPES.VarChar, datos.NombreCompleto);
    request.addParameter('Tipo', TYPES.Int, datos.Tipo);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
};

exports.deleteUsuario = function deleteUsuario(datos, callback) {
    var request = new Request('deleteUsuario', function(err) {
        if (err) {
            msg = (request.error == 1) ? "Error de conexión" : "No se puede eliminar el usuario";
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: msg,
                type: "error"
            })
        }
    });
    request.addParameter('ID_Usuario', TYPES.Int, datos.ID);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
}