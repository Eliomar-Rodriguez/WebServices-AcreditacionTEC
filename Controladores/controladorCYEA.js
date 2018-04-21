/*
================================================
>     Controlador de las CYEA del sistema      <
================================================
*/
var logicaCYEA = require('../Logica/logicaCYEA');

exports.insertCYEA = function(rRequest, rResponse){
    console.log(rRequest.query);
    logicaCYEA.insertarCYEA(rRequest.query, function(data){
        rResponse.send(data);
    })
};

exports.editCYEA = function(rRequest, rResponse){
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