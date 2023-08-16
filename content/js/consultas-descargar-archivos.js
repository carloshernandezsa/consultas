// Obtener los parametros de la URL
const urlParams = new URLSearchParams(window.location.search);
const idArchivo = urlParams.get("id");

const url = window.location.href ;
const parts = url.split('/') ;
modulo = parts[ parts.length - 3].replaceAll("-","_") ;

var onloadCallback = function() {
        grecaptcha.enterprise.render('divRecaptcha', {
          'sitekey' : '6LdBVYYnAAAAADxeQUvhC82bgLHw3IPLdiuvydxU',
        });
  
};

  const iAmNotARobot = document.getElementById('divRecaptcha');
  const recaptchaSiteKey = '6Leb9o4nAAAAAP97MAcMc2KTWhpzGrIZ8_BVLRMb' ;
  var grecaptchaId;

  $.ajax({
    url: apiUrl + "/" + modulo + "/" + idArchivo ,
    method : 'get' , 
    headers: { "X-Api-Key": apiKey },
    dataTyp: 'json',
    success: function(data){
      $('#distritoTitle').text(data.distrito_nombre);
      $('#autoridadTitle').text(data.autoridad_descripcion) ;
      $('#descripcionTitle').text(data.descripcion) ;
      $('#fechaTitle').text(data.fecha) ;
      $('#nombreArchivo').val(data.archivo) ;
    }
  });


function descargarArchivo(){
      document.getElementById('botonDescarga').style.display='none';
      document.getElementById('botonDescargando').style.display='block';
      
      token = grecaptcha.enterprise.getResponse(grecaptchaId);
      const nombre_archivo = $('#nombreArchivo').val();

          $.ajax({
              url : apiUrlPrometeo + "/" + modulo + "/recaptcha/" + idArchivo  ,  
              method:'get',
              headers: { "X-Api-Key": apiKey },
              data: {"token":token}, 
              xhrFields: {
                  responseType: 'blob'
              },
              success: function(data){
                  var blob=new Blob([data] );
                  var link=document.createElement('a');
                  link.href= window.URL.createObjectURL(blob);
                  link.download= nombre_archivo ;
                  link.click();         
                  
                }
            });  
    
      document.getElementById('botonDescarga').style.display='block';
      document.getElementById('botonDescargando').style.display='none';
}
