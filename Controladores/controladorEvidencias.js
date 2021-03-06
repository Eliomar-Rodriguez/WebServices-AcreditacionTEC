/*
=====================================================
>     Controlador de las Evidencia del sistema      <
=====================================================
*/
var logicaEvidencia = require('../Logica/logicaEvidencia');

exports.insertEvidencia = function(rRequest, rResponse){
    console.log(rRequest.query)
    logicaEvidencia.insertarEvidencia(rRequest.body, function(data){
        rResponse.send(data);
    })
};

exports.editEvidencia = function(rRequest, rResponse){
    logicaEvidencia.editarEvidencia(rRequest.body, function(data){
        rResponse.send(data);
    });
};

exports.selectEvidencias = function(rRequest, rResponse){
    logicaEvidencia.seleccionarEvidencia(function(data){
        rResponse.send(data);
    })
};

exports.deleteEvidencia = function(rRequest, rResponse){
    logicaEvidencia.eliminarEvidencia(rRequest.query, function(data){
        rResponse.send(data);
    });
};