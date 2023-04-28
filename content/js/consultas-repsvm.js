//
// Consultas REPSVM
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
    $("#repsvmFormCard").show();
    $("#spinnerCard").hide();
  }, 1000); // Esperar un segundo
} else {
  setTimeout(function () {
    consultarREPSVM(distrito_clave, nombre);
    $("#repsvmTableCard").show();
    $("#spinnerCard").hide();
  }, 1000); // Esperar un segundo
}

// Al dar click en el botón de consultar
$("#consultarButton").click(function () {
  // Tomar los valores del formulario
  distrito_clave = $("#distritoSelect").val();
  nombre = $("#nombre").val();
  // Obtener la url actual sin parámetros
  var actualUrl = window.location.href.split("?")[0];
  // Recargar esta página con los parámetros del formulario
  window.location.href = actualUrl + "?distrito_clave=" + distrito_clave + "&nombre=" + nombre;
});

// Consultar REPSVM
function consultarREPSVM(distrito_clave, nombre) {
  // Si tiene datos, limpiar la tabla
  if ($("#repsvmTable").length > 0) {
    $("#repsvmTable").DataTable().clear().destroy();
  }

  // Cargar los datos en la tabla
  $("#repsvmTable").DataTable({
    lengthChange: false,
    ordering: false,
    searching: false,
    scrollX: true,
    serverSide: true,
    ajax: {
      url: url + "/repsvm_agresores/datatable",
      type: "GET",
      data: {
        nombre: nombre,
      },
      dataType: "json",
    },
    columns: [
      { data: "distrito_nombre_corto", width: "10%" },
      { data: "nombre", width: "20%" },
      { data: "tipo_juzgado", width: "10%" },
      { data: "delito_generico", width: "10%" },
      { data: "delito_especifico", width: "10%" },
      { data: "tipo_sentencia", width: "10%" },
      { data: "numero_causa", width: "10%" },
      { data: "pena_impuesta", width: "10%" },
      { data: "observaciones", width: "10%" },
    ],
    language: {
      lengthMenu: "Mostrar _MENU_",
      search: "Filtrar:",
      zeroRecords: "No hay registros.",
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
