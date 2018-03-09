/*
================================================================
>    Controlador de los Cumplimientos Nominales del sistema    <
================================================================
*/
var logicaValoracion = require('../Logica/logicaValoracion.js');

exports.insertValoracion = function(rRequest, rResponse){
    logicaValoracion.insertarValoracion(rRequest.body, function(data){
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
        rResponse.send(data.data);
    })
};

exports.deleteValoracion = function(rRequest, rResponse){
    logicaValoracion.eliminarValoracion(rRequest.body, function(data){
        rResponse.send(data);
    });
};