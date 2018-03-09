/*
=============================================================
>      Controlador de las Autoevaluaciones del sistema      <
=============================================================
*/
var logicaAutoevaluacion = require('../Logica/logicaAutoevaluacion');

exports.insertAutoevaluacion = function(rRequest, rResponse){
    logicaAutoevaluacion.insertarAutoevaluacion(rRequest.query, function(data){
        rResponse.send(data);
    })
};

exports.editAutoevaluacion = function(rRequest, rResponse){
    logicaAutoevaluacion.editarAutoevaluacion(rRequest.query, function(data){
        rResponse.send(data);
    });
};

exports.selectAutoevaluaciones = function(rRequest, rResponse){
    logicaAutoevaluacion.seleccionarAutoevaluacion(function(data){
        rResponse.send(data);
    })
};

exports.deleteAutoevaluacion = function(rRequest, rResponse){
    logicaAutoevaluacion.eliminarAutoevaluacion(rRequest.query, function(data){
        rResponse.send(data);
    });
};