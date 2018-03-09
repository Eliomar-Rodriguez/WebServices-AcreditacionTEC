/*
================================================
>  Controlador de los Componentes del sistema  <
================================================
*/
var logicaComponente = require('../Logica/logicaComponentes');

exports.insertComponente = function(rRequest, rResponse){
    console.log(rRequest.body);
    logicaComponente.insertarComponente(rRequest.query, function(data){
        rResponse.send(data);
    })
};

exports.editComponente = function(rRequest, rResponse){
    logicaComponente.editarComponente(rRequest.body, function(data){
        rResponse.send(data);
    });
};

exports.selectComponente = function(rRequest, rResponse){
    logicaComponente.seleccionarComponente(function(data){
        rResponse.send(data);
    })
};

exports.deleteComponente = function(rRequest, rResponse){
    console.log(rRequest.body);
    logicaComponente.eliminarComponente(rRequest.body, function(data){
        rResponse.send(data);
    });
};