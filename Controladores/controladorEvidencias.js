/*
=====================================================
>     Controlador de las Evidencia del sistema      <
=====================================================
*/
var logicaEvidencia = require('../Logica/logicaEvidencia.js');

exports.insertEvidencia = function(rRequest, rResponse){
    logicaEvidencia.insertarEvidencia(rRequest.query, function(data){
        rResponse.send(data);
    })
};

exports.editEvidencia = function(rRequest, rResponse){
    logicaEvidencia.editarEvidencia(rRequest.query, function(data){
        rResponse.send(data);
    });
};

exports.selectEvidencias = function(rRequest, rResponse){
    logicaEvidencia.seleccionarEvidencia(function(data){
        rResponse.send(data.data);
    })
};

exports.deleteEvidencia = function(rRequest, rResponse){
    logicaEvidencia.eliminarEvidencia(rRequest.query, function(data){
        rResponse.send(data);
    });
};