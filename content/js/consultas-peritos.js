//
// Consultas Peritos
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

// Obtener el nombre por los parámetros de la URL
var urlParams = new URLSearchParams(window.location.search);
var nombre = urlParams.get("nombre");

// Si no se especificó el nombre
if (nombre == null) {
  setTimeout(function () {
    $("#peritosFormCard").show(); // Mostrar el formulario
    $("#spinnerCard").hide(); // Ocultar el spinner
  }, 1000); // Esperar un segundo
} else {
  setTimeout(function () {
    consultarPeritos(nombre); // Consultar los peritos
    $("#peritosTableCard").show(); // Mostrar la tabla
    $("#spinnerCard").hide(); // Ocultar el spinner
  }, 1000); // Esperar un segundo
}

// Al dar click en el botón de consultar
$("#consultarButton").click(function () {
  // Tomar los valores del formulario
  nombre = $("#nombre").val();
  // Recargar esta página con los parámetros
  window.location.href = window.location.href + "?nombre=" + nombre;
});

// Consultar peritos
function consultarPeritos(nombre) {
  // Si tiene datos, limpiar la tabla
  if ($("#peritosTable").length > 0) {
    $("#peritosTable").DataTable().clear().destroy();
  }

  // Cargar los datos en la tabla
  $("#peritosTable").DataTable({
    lengthChange: false,
    ordering: false,
    searching: false,
    scrollX: true,
    serverSide: true,
    ajax: {
      url: url + "/peritos/datatable",
      type: "GET",
      data: {
        nombre: nombre,
      },
      dataType: "json",
    },
    columns: [
      { data: "perito_tipo_nombre", width: "20%" },
      { data: "nombre", width: "20%" },
      { data: "domicilio", width: "20%" },
      { data: "telefono_fijo", width: "10%" },
      { data: "telefono_celular", width: "10%" },
      { data: "email", width: "10%" },
      { data: "notas", width: "10%" },
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
