var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConection = require('../ConexionDBs/sqlConection');

/*
===========================
>  CRUD's de Responsabilidad         <
>   - insert              <
>   - select              <
>   - edit                <
>   - delete              <
===========================
*/
exports.insertResponsabilidad = function insertResponsabilidad(datos, callback) {
    var request = new Request('insertResponsabilidad', function(err) { // nombre de procedimiento en la base de datos
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
    request.addParameter('Responsabilidad', TYPES.VarChar, datos.Responsabilidad);

    request.addOutputParameter('success', TYPES.Bit);
    
    sqlConection.callProcedure(request, function(res) {
        callback(res);
    });
}

exports.selectResponsabilidades = function(callback) { 
    var query = "SELECT * FROM Responsabilidad";
    var request = new Request(query, function(err) {
        if (err) {
            callback({
                success: false,
                data: err,
                error: request.error,
                title: "Error",
                message: "Error obteniendo los datos. Revise su conexión.",
                type: "error"
            });
        }
    });
    // se usa executeRequest porque es el destinado para escribir consultas desde aca (StringQuery) en vez de llamar procedimientos almacenados
    sqlConection.executeRequest(request, callback); 
}

exports.editResponsabilidad = function editResponsabilidad(datos, callback) {
    var request = new Request('editResponsabilidad', function(err) {
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

    request.addParameter('ID_Responsabilidad', TYPES.Int, datos.ID_Responsabilidad);
    request.addParameter('Responsabilidad', TYPES.VarChar, datos.Responsabilidad);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
};
// DELETE 
exports.deleteResponsabilidad = function deleteResponsabilidad(datos, callback) {
    var request = new Request('deleteResponsabilidad', function(err) {
        if (err) {
            msg = (request.error == 1) ? "Error de conexión" : "No se puede eliminar la Responsabilidad deseado.";
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: msg,
                type: "error"
            })
        }
    });
    request.addParameter('ID_Responsabilidad', TYPES.Int, datos.ID);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
}