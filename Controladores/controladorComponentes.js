/*
================================================
>  Controlador de los Componentes del sistema  <
================================================
*/
var logicaComponente = require('../Logica/logicaComponentes');

exports.insertComponente = function(rRequest, rResponse){
    logicaComponente.insertarComponente(rRequest.body, function(data){
        rResponse.send(data);
    })
};

exports.editComponente = function(rRequest, rResponse){
    console.log(rRequest.body)
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
    logicaComponente.eliminarComponente(rRequest.query, function(data){
        rResponse.send(data);
    });
};