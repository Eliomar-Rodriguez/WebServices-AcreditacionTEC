/*
=================================================
=   Author: Eliomar Antonio Rodríguez Arguedas   =
=                                               =
=   Web Service para el proyecto Acreditación   =
=   TEC                                         =
=   The Back-End implements all HTTP VERBS      =
=   so thats why it works with REST=
=   REST, and is very modularized               =
=================================================

===============================================================
>  Files where are the controllers on the server              <
===============================================================
*/
var componenteCtrl = require('./Controladores/controladorComponentes'); // components controller
var dimensionCtrl = require('./Controladores/controladorDimensiones'); // dimentions controller
var CYECtrl = require('./Controladores/controladorCYE'); // CYE controller
var CYEACtrl = require('./Controladores/controladorCYEA'); // CYEA controller
var NivelesIAECtrl = require('./Controladores/controladorNivelesIAE'); // controlador de NivelesIAE
var CumpliNominCtrl = require('./Controladores/controladorCumpliNomin'); // controlador de Cumplimientos Nominales
var ValoracionesCtrl = require('./Controladores/controladorValoracion'); // controlador de Valoraciones
var EvidenciasCtrl = require('./Controladores/controladorEvidencias'); // controlador de Evidencias
var AutoevaluacionCtrl = require('./Controladores/controladorAutoevaluacion'); // controlador de Autoevaluaciones
var ValoracionCriteriosCtrl = require('./Controladores/controladorValoracionCriterios') // controlador de Valoraciones de Criterios
var ResponsablesCtrl = require('./Controladores/controladorResponsables'); // controlador de responsables
var ResponsabilidadesCtrl = require('./Controladores/controladorResponsabilidades');
/*
===============================================================================
>  Configuraciones principales del servidor, con esto escucha las peticiones  <
===============================================================================
*/
var bodyParser = require('body-parser');
var helmet = require('helmet');
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    port = 8080;

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/"AcreditacionTEC"'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

var html = '<center>'+
    '<p style="padding-top:10%">'+
        '<h2>'+
            'TEC Sede San Carlos<br>'+
            'Comunidad de aplicaciones moviles<br><br>'+
            'Back-End de proyecto AcreditacionTEC'+
        '</h2>'+
        '<b>Desarrollador:</b> Eliomar Antonio Rodriguez Arguedas'+
        ' <br><br><h3><b style="color: red">Atención: </b>Ruta vacía.</h3>'+
    '</p>'+
    '</center>';
app.post('/', (req, res) => {    
    res.send(html);
})
app.put('/', (req, res) => {    
    res.send(html);
})
app.get('/', (req, res) => {    
    res.send(html);
})
app.delete('/', (req, res) => {    
    res.send(html);
})

/*
===========================================
>  Inicio de las direcciones (Endpoints)  <
===========================================

/** tipos de consulta, implementar!
 * post insert
 * get  select
 * put  edit
 * delete   delete
 */

/*
=============================================
>     EndPoints de Valoracion Criterio      < // bien todos            
=============================================
*/
app.post('/insertValoracionCriterio', ValoracionCriteriosCtrl.insertValoracionCriterio);
app.get('/selectValoracionCriterios', ValoracionCriteriosCtrl.selectValoracionCriterios);
app.put('/editValoracionCriterio', ValoracionCriteriosCtrl.editValoracionCriterio);
app.delete('/deleteValoracionCriterio', ValoracionCriteriosCtrl.deleteValoracionCriterio);

/*
==================================
>     EndPoints de los CYEA      < // bien todos            
==================================
*/
app.post('/insertCYEA', CYEACtrl.insertCYEA);
app.get('/selectCYEA', CYEACtrl.selectCYEA);
app.put('/editCYEA', CYEACtrl.editCYEA);
app.delete('/deleteCYEA', CYEACtrl.deleteCYEA);

/*
==================================
>  EndPoints de los Componentes  < // bien todos
==================================
*/
app.post('/insertComponente', componenteCtrl.insertComponente);
app.get('/selectComponentes', componenteCtrl.selectComponente);
app.put('/editComponente', componenteCtrl.editComponente);
app.delete('/deleteComponente', componenteCtrl.deleteComponente);

/*
==================================
>  EndPoints de los Dimensiones  < // bien todos
==================================
*/
app.post('/insertDimension', dimensionCtrl.insertDimension);
app.get('/selectDimensiones', dimensionCtrl.selectDimension);
app.put('/editDimension', dimensionCtrl.editDimension);
app.delete('/deleteDimension', dimensionCtrl.deleteDimension);

/*
==================================
>     EndPoints de los CYE       < // bien todos
==================================
*/
app.post('/insertCYE', CYECtrl.insertCYE);
app.get('/selectCYE', CYECtrl.selectCYE);
app.put('/editCYE', CYECtrl.editCYE);
app.delete('/deleteCYE', CYECtrl.deleteCYE);

/*
==================================
>     EndPoints de NivelesIAE    < // bien todos
==================================
*/
app.post('/insertNivelIAE', NivelesIAECtrl.insertNivelIAE);
app.get('/selectNivelIAE', NivelesIAECtrl.selectNivelIAE);
app.put('/editNivelIAE', NivelesIAECtrl.editNivelIAE);
app.delete('/deleteNivelIAE', NivelesIAECtrl.deleteNivelIAE);

/*
==================================
> EndPoints de los Responsables  < // bien todos
==================================
*/
app.post('/insertResponsable', ResponsablesCtrl.insertResponsable);
app.get('/selectResponsables', ResponsablesCtrl.selectResponsables);
app.put('/editResponsable', ResponsablesCtrl.editResponsable);
app.delete('/deleteResponsable', ResponsablesCtrl.deleteResponsable);

/*
==================================
> EndPoints de los Responsables  < // bien todos
==================================
*/
app.post('/insertResponsabilidad', ResponsabilidadesCtrl.insertResponsabilidad);
app.get('/selectResponsabilidades', ResponsabilidadesCtrl.selectResponsabilidades);
app.put('/editResponsabilidad', ResponsabilidadesCtrl.editResponsabilidad);
app.delete('/deleteResponsabilidad', ResponsabilidadesCtrl.deleteResponsabilidad);


/*
===============================================
>     EndPoints de Cumplimientos Nominales    < // bien todos
===============================================
*/
app.post('/insertCumpliNomin', CumpliNominCtrl.insertCumpliNomin);
app.get('/selectCumpliNomin', CumpliNominCtrl.selectCumpliNomin);
app.put('/editCumpliNomin', CumpliNominCtrl.editCumpliNomin);
app.delete('/deleteCumpliNomin', CumpliNominCtrl.deleteCumpliNomin);

/*
====================================
>     EndPoints de Valoraciones    < // bien todos
====================================
*/
app.post('/insertValoracion', ValoracionesCtrl.insertValoracion);
app.get('/selectValoracion', ValoracionesCtrl.selectValoracion);
app.put('/editValoracion', ValoracionesCtrl.editValoracion);
app.delete('/deleteValoracion', ValoracionesCtrl.deleteValoracion);

/*
==================================
>     EndPoints de Evidencias    < // bien todos
==================================
*/
app.post('/insertEvidencia', EvidenciasCtrl.insertEvidencia);
app.get('/selectEvidencias', EvidenciasCtrl.selectEvidencias);
app.put('/editEvidencia', EvidenciasCtrl.editEvidencia);
app.delete('/deleteEvidencia', EvidenciasCtrl.deleteEvidencia);

/*
=======================================
>     EndPoints de Autovaluaciones    < // bien todos
=======================================
*/
app.post('/insertAutoevaluacion', AutoevaluacionCtrl.insertAutoevaluacion);
app.get('/selectAutoevaluaciones', AutoevaluacionCtrl.selectAutoevaluaciones);
app.put('/editAutoevaluacion', AutoevaluacionCtrl.editAutoevaluacion);
app.delete('/deleteAutoevaluacion', AutoevaluacionCtrl.deleteAutoevaluacion);

/*
======================================================================================
>  Pone el servidor en escucha de peticiones, lo levanta en el puerto especificado.  <
======================================================================================
*/
server.listen(port, function() {
    console.log('Servidor escuchando en el puerto: ' + port);
});