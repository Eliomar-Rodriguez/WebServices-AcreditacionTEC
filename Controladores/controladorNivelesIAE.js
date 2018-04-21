/*
===================================================
>    Controlador de los NivelesIAE del sistema    <
===================================================
*/
var logicaNivelesIAE = require('../Logica/logicaNivelesIAE');

exports.insertNivelIAE = function(rRequest, rResponse){
    logicaNivelesIAE.insertarNivelIAE(rRequest.body, function(data){
        rResponse.send(data);
    })
};

exports.editNivelIAE = function(rRequest, rResponse){
    logicaNivelesIAE.editarNivelIAE(rRequest.body, function(data){
        rResponse.send(data);
    });
};

exports.selectNivelIAE = function(rRequest, rResponse){
    logicaNivelesIAE.seleccionarNivelIAE(function(data){
        rResponse.send(data);
    })
};

exports.deleteNivelIAE = function(rRequest, rResponse){
    logicaNivelesIAE.eliminarNivelIAE(rRequest.query, function(data){
        rResponse.send(data);
    });
};