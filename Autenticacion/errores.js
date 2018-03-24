exports.rutaVacia = function(){
    try {
        document.getElementsByTagName('body').innerHTML = "<p>Ruta inicial del back-end</p>"
        console.log("Ruta inicial del proyecto");
    } catch (error) {
        console.log('Error: '+ error);
    }
}