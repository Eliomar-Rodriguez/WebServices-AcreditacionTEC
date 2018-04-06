var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConection = require('../ConexionDBs/sqlConection');

/*
===========================
>  CRUD's de CYE          <
>   - insert              <
>   - select              <
>   - edit                <
>   - delete              <
===========================
*/
exports.insertCYE = function insertCYE(datos, callback) {
    var request = new Request('insertCYE', function(err) { // nombre de procedimiento en la base de datos
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
    request.addParameter('ID_Componente', TYPES.Int, datos.ID_Componente);
    request.addParameter('ID_Carrera', TYPES.Int, datos.ID_Carrera);
    request.addParameter('Criterio', TYPES.VarChar, datos.Criterio);

    request.addOutputParameter('success', TYPES.Bit);
    
    sqlConection.callProcedure(request, function(res) {
        callback(res);
    });
}

exports.selectCYE = function(callback) { 
    var query = "SELECT CYE.ID AS ID_CYE,C.ID AS ID_Componente,C.Componente,CA.ID AS ID_Carrera,CA.Carrera,CYE.Criterio FROM CYE INNER JOIN (SELECT * FROM Componentes) AS C ON CYE.ID_Componente = C.ID INNER JOIN Carreras AS CA ON CA.ID = CYE.ID_Carrera";
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

exports.editCYE = function editCYE(datos, callback) {
    var request = new Request('editCYE', function(err) {
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

    request.addParameter('ID_CYE', TYPES.Int, datos.ID);
    request.addParameter('ID_Componente', TYPES.Int, datos.ID_Componente);
    request.addParameter('ID_Carrera', TYPES.Int, datos.ID_Carrera); 
    request.addParameter('Criterio', TYPES.VarChar, datos.Criterio);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
};
// DELETE 
exports.deleteCYE = function deleteCYE(datos, callback) {
    var request = new Request('deleteCYE', function(err) {
        if (err) {
            msg = (request.error == 1) ? "Error de conexión" : "No se puede eliminar el Criterio y Estandar";
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: msg,
                type: "error"
            })
        }
    });
    request.addParameter('ID_CYE', TYPES.Int, datos.ID);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
}