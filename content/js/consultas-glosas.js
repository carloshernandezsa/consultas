//
// Consultas Glosas
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

  // Obtener la autoridad por los parámetros de la URL
  var urlParams = new URLSearchParams(window.location.search);
  var autoridad_clave = urlParams.get("autoridad_clave");

  // Si no se especificó la autoridad
  if (autoridad_clave == null) {
    $("#glosasFormCard").show(); // Mostrar el formulario
    $("#spinnerCard").hide(); // Ocultar el spinner
} else {
    // Esperar 2 segundos
    setTimeout(function () {
      consultarGlosas(); // Consultar las glosas desde la API
      $("#glosasTableCard").show(); // Mostrar la tabla
      $("#spinnerCard").hide(); // Ocultar el spinner
    }, 2000);
  }

  // Al dar click en el botón de consultar
  $("#consultarButton").click(function () {
    // Recargar esta página con el parametro de la autoridad
    autoridad_clave = "PTC"
    window.location.href = window.location.href + "?autoridad_clave=" + autoridad_clave;
  });

  // Al recibir los resultados de la consulta
  function consultarGlosas() {
    // Si tiene datos, limpiar la tabla
    if ($("#glosasTable").length > 0) {
      $("#glosasTable").DataTable().clear().destroy();
    }

    // Cargar los datos en la tabla
    $("#glosasTable").DataTable({
      lengthChange: false,
      ordering: false,
      searching: false,
      scrollX: true,
      serverSide: true,
      ajax: {
        url: url + "/glosas/datatable",
        data: { autoridad_clave: autoridad_clave },
        type: "GET",
        dataType: "json",
      },
      columns: [
        { data: "fecha" },
        { data: "expediente" },
        { data: "tipo_juicio" },
        { data: "archivo" },
      ],
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
  }
});
