/*
================================================================
>      Controlador de los ValoracionCriterios del sistema      <
================================================================
*/
var logicaValoracionCriterios = require('../Logica/logicaValoracionCriterios');

exports.insertValoracionCriterio = function(rRequest, rResponse){
    logicaValoracionCriterios.insertarValoracionCriterio(rRequest.body, function(data){
        rResponse.send(data);
    })
};

exports.editValoracionCriterio = function(rRequest, rResponse){
    logicaValoracionCriterios.editarValoracionCriterio(rRequest.body, function(data){
        rResponse.send(data);
    });
};

exports.selectValoracionCriterios = function(rRequest, rResponse){
    logicaValoracionCriterios.seleccionarValoracionCriterios(function(data){
        rResponse.send(data);
    })
};

exports.deleteValoracionCriterio = function(rRequest, rResponse){
    logicaValoracionCriterios.eliminarValoracionCriterio(rRequest.query, function(data){
        rResponse.send(data);
    });
};