/*
================================================================
>    Controlador de los Cumplimientos Nominales del sistema    <
================================================================
*/
var logicaCumpliNomin = require('../Logica/logicaCumpliNomin.js');

exports.insertCumpliNomin = function(rRequest, rResponse){
    logicaCumpliNomin.insertarCumpliNomin(rRequest.query, function(data){
        rResponse.send(data);
    })
};

exports.editCumpliNomin = function(rRequest, rResponse){
    console.log(rRequest.query);
    logicaCumpliNomin.editarCumpliNomin(rRequest.query, function(data){
        rResponse.send(data);
    });
};

exports.selectCumpliNomin = function(rRequest, rResponse){
    logicaCumpliNomin.seleccionarCumpliNomin(function(data){
        rResponse.send(data.data);
    })
};

exports.deleteCumpliNomin = function(rRequest, rResponse){
    logicaCumpliNomin.eliminarCumpliNomin(rRequest.query, function(data){
        rResponse.send(data);
    });
};