//
// Consultas REDAM
//

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

// Obtener la clave del distrito y el nombre por los parámetros de la URL
var urlParams = new URLSearchParams(window.location.search);
var distrito_clave = urlParams.get("distrito_clave");
var nombre = urlParams.get("nombre");

// Si no se especificó el distrito ni el nombre
if (distrito_clave == null && nombre == null) {
  setTimeout(function () {
    $("#redamFormCard").show(); // Mostrar el formulario
    $("#spinnerCard").hide(); // Ocultar el spinner
  }, 1000); // Esperar un segundo
} else {
  setTimeout(function () {
    consultarREDAM(distrito_clave, nombre); // Consultar los redam
    $("#redamTableCard").show(); // Mostrar la tabla
    $("#spinnerCard").hide(); // Ocultar el spinner
  }, 1000); // Esperar un segundo
}

// Al dar click en el botón de consultar
$("#consultarButton").click(function () {
  // Tomar los valores del formulario
  distrito_clave = $("#distritoSelect").val();
  nombre = $("#nombre").val();
  // Recargar esta página con los parámetros
  window.location.href = window.location.href + "?nombre=" + nombre + "&distrito_clave=" + distrito_clave;
});

// Consultar REDAM
function consultarREDAM(distrito_clave, nombre) {
  // Si tiene datos, limpiar la tabla
  if ($("#redamTable").length > 0) {
    $("#redamTable").DataTable().clear().destroy();
  }

  // Cargar los datos en la tabla
  $("#redamTable").DataTable({
    lengthChange: false,
    ordering: false,
    searching: false,
    scrollX: true,
    serverSide: true,
    ajax: {
      url: url + "/redam/datatable",
      type: "GET",
      data: {
        nombre: nombre,
      },
      dataType: "json",
    },
    columns: [
      { data: "fecha", width: "20%" },
      { data: "distrito_nombre_corto", width: "20%" },
      { data: "autoridad_descripcion_corta", width: "20%" },
      { data: "nombre", width: "20%" },
      { data: "expediente", width: "20%" },
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
