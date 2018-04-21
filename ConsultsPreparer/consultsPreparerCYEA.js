var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConection = require('../ConexionDBs/sqlConection');

/*
===========================
>  CRUD's de CYEA         <
>   - insert              <
>   - select              <
>   - edit                <
>   - delete              <
===========================
*/
exports.insertCYEA = function insertCYEA(datos, callback) {
    var request = new Request('insertCYEA', function(err) { // nombre de procedimiento en la base de datos
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
    request.addParameter('ID_CYE', TYPES.Int, datos.ID_CYE);
    request.addParameter('CriterioAjustado', TYPES.VarChar, datos.CriterioAjustado);

    request.addOutputParameter('success', TYPES.Bit);
    
    sqlConection.callProcedure(request, function(res) {
        callback(res);
    });
}

exports.selectCYEA = function(callback) { 
    var query = "SELECT CYEA.ID,CYE.Criterio AS CYE,CYEA.CriterioAjustado FROM CYEA INNER JOIN CYE ON CYEA.ID_CYE = CYE.ID";
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

exports.editCYEA = function editCYEA(datos, callback) {
    var request = new Request('editCYEA', function(err) {
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

    request.addParameter('ID_CYEA', TYPES.Int, datos.ID_CYEA);
    request.addParameter('ID_CYE', TYPES.Int, datos.ID_CYE);
    request.addParameter('CriterioAjustado', TYPES.VarChar, datos.CriterioAjustado);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
};
// DELETE 
exports.deleteCYEA = function deleteCYEA(datos, callback) {
    var request = new Request('deleteCYEA', function(err) {
        if (err) {
            msg = (request.error == 1) ? "Error de conexión" : "No se puede eliminar es CYEA deseado.";
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: msg,
                type: "error"
            })
        }
    });
    request.addParameter('ID_CYEA', TYPES.Int, datos.ID);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
}