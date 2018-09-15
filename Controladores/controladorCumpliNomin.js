/*
================================================================
>    Controlador de los Cumplimientos Nominales del sistema    <
================================================================
*/
var logicaCumpliNomin = require('../Logica/logicaCumpliNomin');

exports.insertCumpliNomin = function(rRequest, rResponse){
    logicaCumpliNomin.insertarCumpliNomin(rRequest.body, function(data){
        rResponse.send(data);
    })
};

exports.editCumpliNomin = function(rRequest, rResponse){   
    console.log("\n\n===============================") 
    console.log(rRequest.body);
    console.log("===============================\n\n") 
    logicaCumpliNomin.editarCumpliNomin(rRequest.body, function(data){
        console.log(data)
        rResponse.send(data);
    });
};

exports.selectCumpliNomin = function(rRequest, rResponse){
    logicaCumpliNomin.seleccionarCumpliNomin(function(data){
        rResponse.send(data);
    })
};

exports.deleteCumpliNomin = function(rRequest, rResponse){
    logicaCumpliNomin.eliminarCumpliNomin(rRequest.query, function(data){
        rResponse.send(data);
    });
};