var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConection = require('../ConexionDBs/sqlConection');

/*
===============================
>  CRUD's de Autoevaluacion   <
>   - insert                  <
>   - select                  <
>   - edit                    <
>   - delete                  <
===============================
*/
exports.insertAutoevaluacion = function insertAutoevaluacion(datos, callback) {
    var request = new Request('insertAutoevaluacionAnual', function(err) { // nombre de procedimiento en la base de datos
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
    request.addParameter('ID_Encargado', TYPES.Int, datos.ID_Encargado);
    request.addParameter('Nombre', TYPES.Int, datos.Nombre);
    request.addParameter('Anio', TYPES.Int, datos.Anio);

    request.addOutputParameter('success', TYPES.Bit);
    
    sqlConection.callProcedure(request, function(res) {
        callback(res);
    });
}

exports.selectAutoevaluaciones = function(callback) { 
    var query = "SELECT * FROM AutoevaluacionesAnuales";
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
    // se usa executeRequest porque es el destinado para escribir consultas desde aca (StringQuery) en vez de llamar procedimientos almacenados
    sqlConection.executeRequest(request, callback); 
}

exports.editAutoevaluacion = function editAutoevaluacion(datos, callback) {
    var request = new Request('editAutoevaluacionAnual', function(err) {
        if (err) {
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: "Sucedió un error en la modificación de los datos",
                type: "error"
            })
        }
    });

    request.addParameter('ID_AutoevalAnual', TYPES.Int, datos.ID);
    request.addParameter('ID_Encargado', TYPES.Int, datos.ID_Encargado);
    request.addParameter('Nombre', TYPES.Int, datos.Nombre);
    request.addParameter('Anio', TYPES.Int, datos.Anio);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
};
// DELETE 
exports.deleteAutoevaluacion = function deleteAutoevaluacion(datos, callback) {
    var request = new Request('deleteAutoevaluacionAnual', function(err) {
        if (err) {
            msg = (request.error == 1) ? "Error de conexión" : "No se puede eliminar la Autoevaluación";
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: msg,
                type: "error"
            })
        }
    });
    request.addParameter('ID_AutoevalAnual', TYPES.Int, datos.ID);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
}