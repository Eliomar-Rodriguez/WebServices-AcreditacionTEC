/*
================================================
>      Controlador de Usuarios del sistema      <
================================================
*/
var logicaUsuarios = require('../Logica/logicaUsuarios.js');

exports.insertUsuario = function(rRequest, rResponse){
    logicaUsuarios.insertarUsuario(rRequest.body, function(data){
        rResponse.send(data);
    })
};

exports.editUsuario = function(rRequest, rResponse){
    console.log(rRequest.query.ID);
    logicaUsuarios.editarUsuario(rRequest.body, function(data){
        rResponse.send(data);
    });
};

exports.selectUsuarios = function(rRequest, rResponse){
    logicaUsuarios.seleccionarUsuarios(function(data){
        rResponse.send(data.data);
    })
};

exports.deleteUsuario = function(rRequest, rResponse){
    logicaUsuarios.eliminarUsuario(rRequest.body, function(data){
        rResponse.send(data);
    });
};