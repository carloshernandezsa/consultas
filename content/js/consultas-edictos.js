//
// Consultas Edictos
//

// Cuando el documento esté listo
$(document).ready(function () {
  // Determinar la URL de la API segun sea el ambiente de desarrollo o de producción
  switch (window.location.hostname) {
    case "localhost":
      var url = "http://localhost:8001/v3";
      break;
    case "127.0.0.1":
      var url = "http://127.0.0.1:8001/v3";
      break;
    default:
      var url = "https://api.justiciadigital.gob.mx/v3";
  }

  // Al dar click en el botón de consultar
  $("#consultarButton").click(function () {
    // Consultar los edictos desde la API
    $.ajax({
      url: url + "/edictos/datatable",
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
    if ($("#edictosTable").length > 0) {
      $("#edictosTable").DataTable().clear().destroy();
    }

    // Mostrar en la consola
    console.log(data.success, data.error, data.data);

    // Cargar los datos en la tabla
    $("#edictosTable").DataTable({
      data: data.data,
      columns: [
        { data: "fecha", width: "20%" },
        { data: "descripcion", width: "40%" },
        { data: "archivo", width: "40%" },
      ],
      pageLength: 10,
      language: {
        lengthMenu: "Mostrar _MENU_",
        search: "Filtrar:",
        zeroRecords: "No hay información.",
        info: "Página _PAGE_ de _PAGES_",
        infoEmpty: "No hay registros",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        oPaginate: {
          sFirst: "Primero",
          sLast: "Último",
          sNext: "Siguiente",
          sPrevious: "Anterior",
        },
      },
    });
  };

});
