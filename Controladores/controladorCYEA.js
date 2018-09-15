/*
================================================
>     Controlador de las CYEA del sistema      <
================================================
*/
var logicaCYEA = require('../Logica/logicaCYEA');

exports.insertCYEA = function(rRequest, rResponse){
    logicaCYEA.insertarCYEA(rRequest.body, function(data){
        rResponse.send(data);
    })
};

exports.editCYEA = function(rRequest, rResponse){
    console.log("\n\n\edit\n")
    console.log(rRequest.body)
    console.log("\edit\n\n\n")
    logicaCYEA.editarCYEA(rRequest.body, function(data){
        rResponse.send(data);
    });
};

exports.selectCYEA = function(rRequest, rResponse){
    logicaCYEA.seleccionarCYEA(function(data){
        rResponse.send(data);
    })
};

exports.deleteCYEA = function(rRequest, rResponse){
    logicaCYEA.eliminarCYEA(rRequest.query, function(data){
        rResponse.send(data);
    });
};