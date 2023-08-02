
function lanzarModal(archivo, modulo){
  document.getElementById('botonDescarga').style.display='block';
  document.getElementById('botonDescargando').style.display='none';
  $.ajax({
    url: apiUrl + "/" + modulo + "/" + archivo ,
    method : 'get' , 
    headers: { "X-Api-Key": apiKey },
    dataTyp: 'json',
    success: function(data){
      console.log(data);
      $('#distrito').text(data.distrito_nombre);
      $('#autoridad').text(data.autoridad_descripcion) ;
      $('#descripcion').text(data.descripcion) ;
      $('#fecha').text(data.fecha) ;
      $('#nombre_archivo').val(data.archivo) ;
    }
  });

  $('#solicitudDeArchivosModal').modal('show') ;
  $('#archivo').val(archivo) ;
  $('#modulo').val(modulo) ;
}


function validarInformacion(){

      document.getElementById('botonDescarga').style.display='none';
      document.getElementById('botonDescargando').style.display='block';

      grecaptcha.enterprise.ready(async () => {
        const token = await grecaptcha.enterprise.execute('6LdkahonAAAAAE0kJPG1f8ZUwueLrRfVx0y5mZkK', {action: 'LOGIN'});
        // IMPORTANT: The 'token' that results from execute is an encrypted response sent by
        // reCAPTCHA Enterprise to the end user's browser.
        // This token must be validated by creating an assessment.
        // See https://cloud.google.com/recaptcha-enterprise/docs/create-assessment
    
          const archivo = $('#archivo').val();
          const nombre_archivo = $('#nombre_archivo').val();
          const modulo = $('#modulo').val();

          $.ajax({
              url : apiUrlPrometeo + "/" + modulo + "/recaptcha/" + archivo  ,  
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

                  $("#solicitudDeArchivosModal").modal('hide') ;              
                  
                }
            });  
    
      });
}