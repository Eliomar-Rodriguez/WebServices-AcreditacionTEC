/*
================================================
>     Controlador de las Responsables del sistema      <
================================================
*/
var logicaResponsabilidades = require('../Logica/logicaResponsabilidad');

exports.insertResponsabilidad = function(rRequest, rResponse){
    console.log(rRequest.body)
    logicaResponsabilidades.insertarResponsabilidad(rRequest.body, function(data){
        rResponse.send(data);
    })
};

exports.editResponsabilidad = function(rRequest, rResponse){
    logicaResponsabilidades.editarResponsabilidad(rRequest.body, function(data){
        rResponse.send(data);
    });
};

exports.selectResponsabilidades = function(rRequest, rResponse){
    logicaResponsabilidades.seleccionarResponsabilidades(function(data){
        rResponse.send(data);
        console.log(data)
    })
};

exports.deleteResponsabilidad = function(rRequest, rResponse){
    logicaResponsabilidades.eliminarResponsabilidad(rRequest.query, function(data){
        rResponse.send(data);
    });
};