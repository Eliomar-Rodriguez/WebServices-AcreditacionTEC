/*
=================================================
=   Autor: Eliomar Antonio Rodríguez Arguedas   =
=                                               =
=   Web Service para el proyecto Acreditación   =
=   TEC                                         =
=================================================

===============================================================
>  Archivos donde estan los controladores en el servidor.     <
===============================================================
*/
var componenteCtrl = require('./Controladores/controladorComponentes'); // controlador de Componentes
var dimensionCtrl = require('./Controladores/controladorDimensiones'); // controlador de Dimensiones
var CYECtrl = require('./Controladores/controladorCYE'); // controlador de CYE
var CYEACtrl = require('./Controladores/controladorCYEA'); // controlador de CYEA
var NivelesIAECtrl = require('./Controladores/controladorNivelesIAE'); // controlador de NivelesIAE
var CumpliNominCtrl = require('./Controladores/controladorCumpliNomin'); // controlador de Cumplimientos Nominales
var ValoracionesCtrl = require('./Controladores/controladorValoracion'); // controlador de Valoraciones
var EvidenciasCtrl = require('./Controladores/controladorEvidencias'); // controlador de Evidencias
var AutoevaluacionCtrl = require('./Controladores/controladorAutoevaluacion'); // controlador de Autoevaluaciones
var ValoracionCriteriosCtrl = require('./Controladores/controladorValoracionCriterios') // controlador de Valoraciones de Criterios

var manejoErrores = require('./Autenticacion/errores');
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
====================================================
>     EndPoints de las Valoracion de Criterios      < // bien todos            NO ESTA COMPLETO!!!!!!!
====================================================
*/
let router = express.Router;

app.get('/', (req, res) => {

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
    res.send(html)
  })/*
app.post('', (req, res) => {
    res.json({
        title: 'Ruta vacía',
        message: 'Ruta inicial del backend'
    })
  })
  app.put('', (req, res) => {
    res.json({
        title: 'Ruta vacía',
        message: 'Ruta inicial del backend'
    })
  })*/

app.get('/', manejoErrores.rutaVacia);

app.post('/insertValoracionCriterio', ValoracionCriteriosCtrl.insertValoracionCriterio);
app.get('/selectValoracionCriterios', ValoracionCriteriosCtrl.selectValoracionCriterios);
app.post('/editValoracionCriterio', ValoracionCriteriosCtrl.editValoracionCriterio);
app.post('/deleteValoracionCriterio', ValoracionCriteriosCtrl.deleteValoracionCriterio);

/*
==================================
>     EndPoints de los CYEA      < // bien todos            
==================================
*/
app.post('/insertCYEA', CYEACtrl.insertCYEA);
app.get('/selectCYEA', CYEACtrl.selectCYEA);
app.post('/editCYEA', CYEACtrl.editCYEA);
app.post('/deleteCYEA', CYEACtrl.deleteCYEA);

/*
==================================
>  EndPoints de los Componentes  < // bien todos
==================================
*/
app.post('/insertComponente', componenteCtrl.insertComponente);
app.get('/selectComponentes', componenteCtrl.selectComponente);
app.post('/editComponente', componenteCtrl.editComponente);
app.post('/deleteComponente', componenteCtrl.deleteComponente);

/*
==================================
>  EndPoints de los Dimensiones  < // bien todos
==================================
*/
app.post('/insertDimension', dimensionCtrl.insertDimension);
app.get('/selectDimensiones', dimensionCtrl.selectDimension);
app.put('/editDimension', dimensionCtrl.editDimension);
app.post('/deleteDimension', dimensionCtrl.deleteDimension);

/*
==================================
>     EndPoints de los CYE       < // bien todos
==================================
*/
app.post('/insertCYE', CYECtrl.insertCYE);
app.get('/selectCYE', CYECtrl.selectCYE);
app.post('/editCYE', CYECtrl.editCYE);
app.post('/deleteCYE', CYECtrl.deleteCYE);

/*
==================================
>     EndPoints de NivelesIAE    < // bien todos
==================================
*/
app.post('/insertNivelIAE', NivelesIAECtrl.insertNivelIAE);
app.get('/selectNivelIAE', NivelesIAECtrl.selectNivelIAE);
app.post('/editNivelIAE', NivelesIAECtrl.editNivelIAE);
app.post('/deleteNivelIAE', NivelesIAECtrl.deleteNivelIAE);

/*
===============================================
>     EndPoints de Cumplimientos Nominales    < // bien todos
===============================================
*/
app.post('/insertCumpliNomin', CumpliNominCtrl.insertCumpliNomin);
app.get('/selectCumpliNomin', CumpliNominCtrl.selectCumpliNomin);
app.post('/editCumpliNomin', CumpliNominCtrl.editCumpliNomin);
app.post('/deleteCumpliNomin', CumpliNominCtrl.deleteCumpliNomin);

/*
====================================
>     EndPoints de Valoraciones    < // bien todos
====================================
*/
app.post('/insertValoracion', ValoracionesCtrl.insertValoracion);
app.get('/selectValoracion', ValoracionesCtrl.selectValoracion);
app.post('/editValoracion', ValoracionesCtrl.editValoracion);
app.post('/deleteValoracion', ValoracionesCtrl.deleteValoracion);

/*
==================================
>     EndPoints de Evidencias    < // bien todos
==================================
*/
app.post('/insertEvidencia', EvidenciasCtrl.insertEvidencia);
app.get('/selectEvidencias', EvidenciasCtrl.selectEvidencias);
app.post('/editEvidencia', EvidenciasCtrl.editEvidencia);
app.post('/deleteEvidencia', EvidenciasCtrl.deleteEvidencia);

/*
=======================================
>     EndPoints de Autovaluaciones    < // bien todos
=======================================
*/
app.post('/insertAutoevaluacion', AutoevaluacionCtrl.insertAutoevaluacion);
app.get('/selectAutoevaluaciones', AutoevaluacionCtrl.selectAutoevaluaciones);
app.post('/editAutoevaluacion', AutoevaluacionCtrl.editAutoevaluacion);
app.post('/deleteAutoevaluacion', AutoevaluacionCtrl.deleteAutoevaluacion);

/*
======================================================================================
>  Pone el servidor en escucha de peticiones, lo levanta en el puerto especificado.  <
======================================================================================
*/
server.listen(port, function() {
    console.log('Servidor escuchando en el puerto: ' + port);
});