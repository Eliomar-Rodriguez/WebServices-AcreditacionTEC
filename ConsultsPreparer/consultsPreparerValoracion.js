var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConection = require('../ConexionDBs/sqlConection.js');

/*
===========================
>  CRUD's de Valoracion   <
>   - insert              <
>   - select              <
>   - edit                <
>   - delete              <
===========================
*/
exports.insertValoracion = function insertValoracion(datos, callback) {
    var request = new Request('insertValoracion', function(err) { // nombre de procedimiento en la base de datos
        if (err) {
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: "Sucedió un error en la inserción de los datos",
                type: "error"
            })
        }
    });
    request.addParameter('Valoracion', TYPES.VarChar, datos.Valoracion);

    request.addOutputParameter('success', TYPES.Bit);
    
    sqlConection.callProcedure(request, function(res) {
        callback(res);
    });
}

exports.selectValoracion = function(callback) {  
    var query = "SELECT * FROM Valoraciones"; //Agregar procedimiento almacenado para esta consulta
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

exports.editValoracion = function editValoracion(datos, callback) {
    var request = new Request('editValoracion', function(err) {
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

    request.addParameter('ID_Valoracion', TYPES.Int, datos.ID);
    request.addParameter('Valoracion', TYPES.VarChar, datos.Valoracion); 
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
};
// DELETE 
exports.deleteValoracion = function deleteValoracion(datos, callback) {
    var request = new Request('deleteValoracion', function(err) {
        if (err) {
            msg = (request.error == 1) ? "Error de conexión" : "No se puede eliminar la Valoración";
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: msg,
                type: "error"
            })
        }
    });
    request.addParameter('ID_Valoracion', TYPES.Int, datos.ID);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
}