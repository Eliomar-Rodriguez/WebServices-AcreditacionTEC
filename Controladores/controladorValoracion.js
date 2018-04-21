/*
================================================================
>    Controlador de los Cumplimientos Nominales del sistema    <
================================================================
*/
var logicaValoracion = require('../Logica/logicaValoracion');

exports.insertValoracion = function(rRequest, rResponse){
    logicaValoracion.insertarValoracion(rRequest.query, function(data){
        rResponse.send(data);
    })
};

exports.editValoracion = function(rRequest, rResponse){
    logicaValoracion.editarValoracion(rRequest.body, function(data){
        rResponse.send(data);
    });
};

exports.selectValoracion = function(rRequest, rResponse){
    logicaValoracion.seleccionarValoracion(function(data){
        rResponse.send(data);
    })
};

exports.deleteValoracion = function(rRequest, rResponse){
    logicaValoracion.eliminarValoracion(rRequest.query, function(data){
        rResponse.send(data);
    });
};