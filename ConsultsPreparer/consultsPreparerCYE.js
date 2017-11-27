var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConection = require('../ConexionDBs/sqlConection.js');

/*
===========================
>  CRUD's de CYE          <
>   - insert              <
>   - select              <
>   - edit                <
>   - delete              <
===========================
*/
/**
 * AGREGAR CARRERA PARA PROYECTO REAL
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
    request.addParameter('Criterio', TYPES.VarChar, datos.Criterio);

    request.addOutputParameter('success', TYPES.Bit);
    
    sqlConection.callProcedure(request, function(res) {
        callback(res);
    });
}

exports.selectCYE = function(callback) {  
    var query = "SELECT C.ID,C.ID_Componente,C.Criterio,Co.Componente FROM CYE AS C INNER JOIN Componentes AS Co ON C.ID_Componente = Co.ID"; //Agregar procedimiento almacenado para esta consulta
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

exports.editCYE = function editCYE(datos, callback) {
    console.log(
        "\nID : "+ datos.ID,
        "\nID_Componente: " + datos.ID_Componente,
        "\nCriterio: " + datos.Criterio,
        "\n"
    );
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
    request.addParameter('Criterio', TYPES.VarChar, datos.Criterio);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
};

exports.deleteCYE = function deleteCYE(datos, callback) {
    var request = new Request('deleteCYE', function(err) {
        if (err) {
            msg = (request.error == 1) ? "Error de conexión" : "No se puede eliminar la dimensión";
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