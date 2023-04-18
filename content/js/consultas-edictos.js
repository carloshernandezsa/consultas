//
// Consultas Edictos
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

// Obtener la autoridad por los parámetros de la URL
var urlParams = new URLSearchParams(window.location.search);
var autoridad_clave = urlParams.get("autoridad_clave");

// Si no se especificó la autoridad
if (autoridad_clave == null) {
  consultarDistritos(); // Consultar los distritos para poner opciones en el select
  $("#edictosFormCard").show(); // Mostrar el formulario
  $("#spinnerCard").hide(); // Ocultar el spinner
} else {
  // Esperar 2 segundos
  setTimeout(function () {
    consultarEdictos(autoridad_clave); // Consultar los edictos
    $("#edictosTableCard").show(); // Mostrar la tabla
    $("#spinnerCard").hide(); // Ocultar el spinner
  }, 2000);
}

// Al dar click en el botón de consultar
$("#consultarButton").click(function () {
  // Recargar esta página con el parametro de la autoridad
  autoridad_clave = "TRC-J2-FAM";
  window.location.href = window.location.href + "?autoridad_clave=" + autoridad_clave;
});

// Consultar los distritos para poner opciones en el select
function consultarDistritos() {
  // Consultar los distritos con es_jurisdiccional en verdadero
  fetch(url + "/distritos?es_jurisdiccional=true")
    .then((response) => response.json())
    .then((data) => {
      // Si la respuesta es exitosa
      if (data.success === true) {
        // Recorrer los distritos
        data.result.items.forEach((item) => {
          // Agregar el distrito al select
          $("#distritoSelect").append($("<option onclick='consultarAutoridades(this.value)'></option>").attr("value", item.id).text(item.nombre_corto));
        });
        // Cambiar el size del select al total
        $("#distritoSelect").attr("size", data.result.total);
      }
    })
    .catch((error) => console.log(error));
}

// Consultar las autoridades para poner opciones en el select
function consultarAutoridades(distrito_id) {
  console.log(distrito_id);
  // Consultar las autoridades con el distrito_id
  fetch(url + "/autoridades?distrito_id=" + distrito_id)
    .then((response) => response.json())
    .then((data) => {
      // Si la respuesta es exitosa
      if (data.success === true) {
        // Limpiar el select
        $("#autoridadSelect").empty();
        // Recorrer las autoridades
        data.result.items.forEach((item) => {
          // Agregar la autoridad al select
          $("#autoridadSelect").append($("<option></option>").attr("value", item.clave).text(item.descripcion));
        });
        // Cambiar el size del select al total
        $("#autoridadSelect").attr("size", data.result.total);
      }
    })
    .catch((error) => console.log(error));
}

// Consultar los edictos
function consultarEdictos(autoridad_clave) {
  // Si tiene datos, limpiar la tabla
  if ($("#edictosTable").length > 0) {
    $("#edictosTable").DataTable().clear().destroy();
  }

  // Cargar los datos en la tabla
  $("#edictosTable").DataTable({
    lengthChange: false,
    ordering: false,
    searching: false,
    scrollX: true,
    serverSide: true,
    ajax: {
      url: url + "/edictos/datatable",
      data: { autoridad_clave: autoridad_clave },
      type: "GET",
      dataType: "json",
    },
    columns: [{ data: "fecha" }, { data: "descripcion" }, { data: "archivo" }],
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
