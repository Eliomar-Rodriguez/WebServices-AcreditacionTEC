/*
================================================
>  Controlador de las Dimensiones del sistema  <
================================================
*/
var logicaDimension = require('../Logica/logicaDimensiones');

exports.insertDimension = function(rRequest, rResponse){
    logicaDimension.insertarDimension(rRequest.query, function(data){
        rResponse.send(data);
    })
};

exports.editDimension = function(rRequest, rResponse){
    logicaDimension.editarDimension(rRequest.body, function(data){
        rResponse.send(data);
    });
};

exports.selectDimension = function(rRequest, rResponse){
    logicaDimension.seleccionarDimension(function(data){
        console.log(data);
        rResponse.send(data);
    })
};

exports.deleteDimension = function(rRequest, rResponse){
    console.log(rRequest.body)
    logicaDimension.eliminarDimension(rRequest.query, function(data){
        rResponse.send(data);
    });
};