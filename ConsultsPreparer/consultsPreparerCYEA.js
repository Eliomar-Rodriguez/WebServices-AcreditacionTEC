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
    request.addParameter('ID_CYE_General', TYPES.Int, datos.ID_CYE);
    request.addParameter('ID_Valoracion', TYPES.Int, datos.ID_Valoracion);
    request.addParameter('ID_NivelIAE', TYPES.Int, datos.ID_NivelIAE);
    request.addParameter('CriterioAjustado', TYPES.VarChar, datos.CriterioAjustado);
    request.addParameter('FLOC', TYPES.Date, datos.FLOC);
    request.addParameter('FLA', TYPES.Date, datos.FLA);
    request.addParameter('IncorporadoIAE', TYPES.Int, datos.IncorporadoIAE);
    request.addParameter('Observaciones', TYPES.VarChar, datos.Observaciones);

    request.addOutputParameter('success', TYPES.Bit);
    
    sqlConection.callProcedure(request, function(res) {
        callback(res);
    });
}

exports.selectCYEA = function(callback) {  
    var query = "SELECT CA.ID, CA.CriterioAjustado, CA.FLOC, CA.FLA, CA.IncorporadoIAE, CA.Observaciones, CG.Criterio AS CYE, N.NivelIAE, V.Valoracion FROM CYEA AS CA INNER JOIN CYE AS CG ON CA.ID_CYE_General = CG.ID INNER JOIN NivelesIAE AS N ON CA.ID_NivelIAE = N.ID INNER JOIN Valoraciones AS V ON CA.ID_Valoracion = V.ID"; //Agregar procedimiento almacenado para esta consulta
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

    request.addParameter('ID_CYEA', TYPES.Int, datos.ID);
    request.addParameter('ID_CYE_General', TYPES.Int, datos.ID_CYE);
    request.addParameter('ID_Valoracion', TYPES.Int, datos.ID_Valoracion);
    request.addParameter('ID_NivelIAE', TYPES.Int, datos.ID_NivelIAE);
    request.addParameter('CriterioAjustado', TYPES.VarChar, datos.CriterioAjustado);
    request.addParameter('FLOC', TYPES.Date, datos.FLOC);
    request.addParameter('FLA', TYPES.Date, datos.FLA);
    request.addParameter('IncorporadoIAE', TYPES.Int, datos.IncorporadoIAE);
    request.addParameter('Observaciones', TYPES.VarChar, datos.Observaciones);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
};
// DELETE 
exports.deleteCYEA = function deleteCYEA(datos, callback) {
    var request = new Request('deleteCYEA', function(err) {
        if (err) {
            msg = (request.error == 1) ? "Error de conexión" : "No se puede eliminar el CYEA";
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