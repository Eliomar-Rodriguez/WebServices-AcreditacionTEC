/*
================================================
>     Controlador de las Responsables del sistema      <
================================================
*/
var logicaResponsables = require('../Logica/logicaResponsables');

exports.insertResponsable = function(rRequest, rResponse){
    logicaResponsables.insertarResponsable(rRequest.body, function(data){
        rResponse.send(data);
    })
};

exports.editResponsable = function(rRequest, rResponse){
    logicaResponsables.editarResponsable(rRequest.body, function(data){
        rResponse.send(data);
    });
};

exports.selectResponsables = function(rRequest, rResponse){
    logicaResponsables.seleccionarResponsables(function(data){
        rResponse.send(data);
    })
};

exports.deleteResponsable = function(rRequest, rResponse){
    logicaResponsables.eliminarResponsable(rRequest.query, function(data){
        rResponse.send(data);
    });
};