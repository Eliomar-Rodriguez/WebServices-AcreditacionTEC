var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConection = require('../ConexionDBs/sqlConection');

/*
=====================================
>  CRUD's de ValoracionCriterios    <
>   - insert                        <
>   - select                        <
>   - edit                          <
>   - delete                        <
=====================================
*/
exports.insertValoracionCriterio = function insertValoracionCriterio(datos, callback) {
    var request = new Request('insertValoracionCriterios', function(err) { // nombre de procedimiento en la base de datos
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
    request.addParameter('ID_CYEA', TYPES.Int, datos.ID_CYEA);
    request.addParameter('ID_Valoracion', TYPES.Int, datos.ID_Valoracion);
    request.addParameter('ID_NivelIAE', TYPES.Int, datos.ID_NivelIAE);
    request.addParameter('ID_Responsabilidad', TYPES.Int, datos.ID_Responsabilidad);
    request.addParameter('FLOC', TYPES.Date, datos.FLOC);
    request.addParameter('FLA', TYPES.Date, datos.FLA);
    request.addParameter('IncorporadoIAE', TYPES.Int, datos.IncorporadoIAE);
    request.addParameter('Observaciones', TYPES.VarChar, datos.Observaciones);

    request.addOutputParameter('success', TYPES.Bit);
    
    sqlConection.callProcedure(request, function(res) {
        callback(res);
    });
}

exports.selectValoracionCriterio = function(callback) { 
    var query = "SELECT VC.ID,CYEA.CriterioAjustado AS CYEA,V.Valoracion,NI.NivelIAE, R.Responsabilidad,VC.FLOC,VC.FLA,VC.IncorporadoIAE,VC.Observaciones FROM ValoracionCriterios AS VC INNER JOIN CYEA ON VC.ID_CYEA = CYEA.ID INNER JOIN NivelesIAE AS NI ON NI.ID = VC.ID_NivelIAE INNER JOIN Valoraciones AS V ON V.ID = VC.ID_Valoracion INNER JOIN Responsabilidad AS R ON R.ID = VC.ID_Responsabilidad"; 
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

exports.editValoracionCriterio = function editValoracionCriterio(datos, callback) {
    var request = new Request('editValoracionCriterios', function(err) {
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

    request.addParameter('ID_ValoracionCriterios', TYPES.Int, datos.ID_ValoracionCriterio);
    request.addParameter('ID_CYEA', TYPES.Int, datos.ID_CYEA);
    request.addParameter('ID_Valoracion', TYPES.Int, datos.ID_Valoracion);
    request.addParameter('ID_NivelIAE', TYPES.Int, datos.ID_NivelIAE);
    request.addParameter('ID_Responsabilidad', TYPES.Int, datos.ID_Responsabilidad);
    request.addParameter('FLOC', TYPES.Date, datos.FLOC);
    request.addParameter('FLA', TYPES.Date, datos.FLA);
    request.addParameter('IncorporadoIAE', TYPES.Int, datos.IncorporadoIAE);
    request.addParameter('Observaciones', TYPES.VarChar, datos.Observaciones);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
};
// DELETE 
exports.deleteValoracionCriterio = function deleteValoracionCriterio(datos, callback) {
    var request = new Request('deleteValoracionCriterios', function(err) {
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
    request.addParameter('ID_ValoracionCriterios', TYPES.Int, datos.ID_ValoracionCriterio);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
}