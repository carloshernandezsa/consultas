//
// Consultas Abogados Registrados
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

  // Obtener el nombre por los parámetros de la URL
  var urlParams = new URLSearchParams(window.location.search);
  var nombre = urlParams.get("nombre");

  // Si no se especificó el nombre
  if (nombre == null) {
    $("#abogadosRegistradosFormCard").show(); // Mostrar el formulario
    $("#spinnerCard").hide(); // Ocultar el spinner
  } else {
    // Esperar 2 segundos
    setTimeout(function () {
      consultarAbogadosRegistrados(nombre); // Consultar los abogados registrados
      $("#abogadosRegistradosTableCard").show(); // Mostrar la tabla
      $("#spinnerCard").hide(); // Ocultar el spinner
    }, 2000);
  }

  // Al dar click en el botón de consultar
  $("#consultarButton").click(function () {
    // Recargar esta página con el parametro del nombre
    nombre = "gonzalez";
    window.location.href = window.location.href + "?nombre=" + nombre;
  });

  // Consultar abogados registrados
  function consultarAbogadosRegistrados(nombre) {
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
        data: { nombre: nombre },
        type: "GET",
        dataType: "json",
      },
      columns: [{ data: "fecha" }, { data: "libro" }, { data: "numero" }, { data: "nombre" }],
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
