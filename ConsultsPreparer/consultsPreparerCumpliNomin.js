var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConection = require('../ConexionDBs/sqlConection');

/*
==============================
>  CRUD's de CumpliNomin     <
>   - insert                 <
>   - select                 <
>   - edit                   <
>   - delete                 <
==============================
*/
exports.insertCumpliNomin = function (datos, callback) {
    var request = new Request('insertCumplimientoNominal', function(err) { // nombre de procedimiento en la base de datos
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
    
    request.addParameter('FechaCumplimiento', TYPES.Date, datos.FechaCumplimiento);
    request.addParameter('Descripcion', TYPES.VarChar, datos.Descripcion);

    request.addOutputParameter('success', TYPES.Bit);
    
    sqlConection.callProcedure(request, function(res) {
        callback(res);
    });
}

exports.selectCumpliNomin = function(callback) {  
    var query = "SELECT * FROM CumplimientosNominales"; //Agregar procedimiento almacenado para esta consulta
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

exports.editCumpliNomin = function(datos, callback) {
    var request = new Request('editCumplimientoNominal', function(err) {
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
    console.log("\n\n============Cumplimiento nominal===================") 
    console.log(datos)    
    console.log("===============================\n\n") 
    request.addParameter('ID_CumpliNominal', TYPES.Int, datos.ID);
    request.addParameter('FechaCumplimiento', TYPES.Date, datos.FechaCumplimiento);     
    request.addParameter('Descripcion', TYPES.VarChar, datos.Descripcion);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
};
// DELETE 
exports.deleteCumpliNomin = function(datos, callback) {
    var request = new Request('deleteCumplimientoNominal', function(err) {
        if (err) {
            msg = (request.error == 1) ? "Error de conexión" : "No se puede eliminar el Cumplimiento Nominal";
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: msg,
                type: "error"
            })
        }
    });
    request.addParameter('ID_CumpliNominal', TYPES.Int, datos.ID);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
}