//
// Consultas Abogados Registrados
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

// Obtener el nombre, año desde y año hasta por los parámetros de la URL
var urlParams = new URLSearchParams(window.location.search);
var nombre = urlParams.get("nombre");
var anio_desde = urlParams.get("anio_desde");
var anio_hasta = urlParams.get("anio_hasta");

// Si no se especificó el nombre
if (nombre == null && anio_desde == null && anio_hasta == null) {
  setTimeout(function () {
    $("#abogadosRegistradosFormCard").show();
    $("#spinnerCard").hide();
  }, 1000); // Esperar un segundo
} else {
  setTimeout(function () {
    consultarAbogadosRegistrados(nombre, anio_desde, anio_hasta);
    $("#abogadosRegistradosTableCard").show();
    $("#spinnerCard").hide();
  }, 1000); // Esperar un segundo
}

// Al dar click en el botón de consultar se recarga la página
$("#consultarButton").click(function () {
  // Tomar los valores del formulario
  nombre = $("#nombre").val();
  anio_desde = $("#anioDesde").val();
  anio_hasta = $("#anioHasta").val();
  // Obtener la url actual sin parámetros
  var actualUrl = window.location.href.split("?")[0];
  // Recargar esta página con los parámetros del formulario
  window.location.href = actualUrl + "?nombre=" + nombre + "&anio_desde=" + anio_desde + "&anio_hasta=" + anio_hasta;
});

// Consultar abogados registrados
function consultarAbogadosRegistrados(nombre, anio_desde, anio_hasta) {
  // Si tiene datos, limpiar la tabla
  if ($("#abogadosRegistradosTable").length > 0) {
    $("#abogadosRegistradosTable").DataTable().clear().destroy();
  }

  // Cargar los datos en la tabla
  $("#abogadosRegistradosTable").DataTable({
    lengthChange: false,
    ordering: false,
    searching: false,
    scrollX: true,
    serverSide: true,
    ajax: {
      url: url + "/abogados/datatable",
      data: { nombre: nombre }, // anio_desde: anio_desde, anio_hasta: anio_hasta
      type: "GET",
      dataType: "json",
    },
    columns: [
      { data: "fecha", width: "10%" },
      { data: "libro", width: "10%" },
      { data: "numero", width: "10%" },
      { data: "nombre", width: "60%" },
    ],
    columnDefs: [
      {
        targets: 0,
        data: null,
        render: function (data, type, row) {
          return moment(data).format("DD/MMM/YYYY");
        },
      },
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
