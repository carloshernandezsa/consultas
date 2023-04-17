//
// Consultas Agendas de Audiencias
//

// Cuando el documento esté listo
$(document).ready(function () {
  // Case para determinar la URL de la API segun sea el ambiente de desarrollo o de producción
  switch (window.location.hostname) {
    case "localhost":
      var url = "http://localhost:8001/v3";
      break;
    case "127.0.0.1":
      var url = "http://127.0.0.1:8001/v3";
      break;
    default:
      var url = "http://plataforma-web-api.justiciadigital.gob.mx/v3";
  }

  // Al dar click en el botón de consultar
  $("#consultarButton").click(function () {
    // Consultar las audiencias desde la API
    $.ajax({
      url: url + "/audiencias/datatable",
      type: "GET",
      dataType: "json",
      success: function (data) {
        alRecibirResultados(data);
      },
    });
  });

  // Al recibir los resultados de la consulta
  function alRecibirResultados(data) {
    // Si tiene datos, limpiar la tabla
    if ($("#audienciasTable").length > 0) {
      $("#audienciasTable").DataTable().clear().destroy();
    }

    // Mostrar en la consola
    console.log(data.success, data.error, data.data);

    // Cargar los datos en la tabla
    $("#audienciasTable").DataTable({
      'data': data.data,
      'columns': [
        { 'data': "tiempo", 'width': "20%" },
        { 'data': "sala", 'width': "20%" },
        { 'data': "tipo_audiencia", 'width': "20%" },
        { 'data': "expediente", 'width': "40%" },
      ],
      'pageLength': 10,
      'language': {
        'lengthMenu': "Mostrar _MENU_",
        'search': "Filtrar:",
        'zeroRecords': "No hay información.",
        'info': "Página _PAGE_ de _PAGES_",
        'infoEmpty': "No hay registros",
        'infoFiltered': "(filtrados desde _MAX_ registros totales)",
        'oPaginate': {
          'sFirst': "Primero",
          'sLast': "Último",
          'sNext': "Siguiente",
          'sPrevious': "Anterior",
        },
      },
    });
  }
});
