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
  setTimeout(function () {
    consultarDistritos(); // Consultar los distritos para poner opciones en el select
    $("#edictosFormCard").show(); // Mostrar el formulario
    $("#spinnerCard").hide(); // Ocultar el spinner
  }, 1000);
} else {
  // Esperar 2 segundos
  setTimeout(function () {
    consultarEdictos(autoridad_clave); // Consultar los edictos
    $("#edictosTableCard").show(); // Mostrar la tabla
    $("#spinnerCard").hide(); // Ocultar el spinner
  }, 1000);
}

// Consultar los distritos para poner opciones en el select
function consultarDistritos() {
  // Consultar los distritos con es_jurisdiccional en verdadero
  fetch(url + "/distritos?es_jurisdiccional=true&limit=100")
    .then((response) => response.json())
    .then((data) => {
      // Si la respuesta es exitosa
      if (data.success === true) {
        // Recorrer los distritos
        data.result.items.forEach((item) => {
          // Agregar el distrito al select
          $("#distritoSelect").append($("<option onclick='consultarAutoridades(this.value)'></option>").attr("value", item.clave).text(item.nombre_corto));
        });
      }
    })
    .catch((error) => console.log(error));
}

// Consultar las autoridades para poner opciones en el select
function consultarAutoridades(distrito_clave) {
  // Consultar las autoridades con el distrito_clave
  fetch(url + "/autoridades?distrito_clave=" + distrito_clave + "&es_jurisdiccional=true&es_notaria=false&limit=100")
    .then((response) => response.json())
    .then((data) => {
      // Si la respuesta es exitosa
      if (data.success === true) {
        console.log(distrito_clave);
        // Limpiar el select
        $("#autoridadSelect").empty();
        // Recorrer las autoridades
        data.result.items.forEach((item) => {
          // Agregar la autoridad al select
          $("#autoridadSelect").append($("<option onclick='recargarPagina(this.value)'></option>").attr("value", item.clave).text(item.descripcion_corta));
        });
      }
    })
    .catch((error) => console.log(error));
}

// Recargar la página al dar click en la autoridad agregando la clave de la autoridad en el URL
function recargarPagina(autoridad_clave) {
  window.location.href = window.location.href + "?autoridad_clave=" + autoridad_clave;
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

  // Consultar la autoridad para poner la descripcion en el encabezado del card
  fetch(url + "/autoridades/" + autoridad_clave)
    .then((response) => response.json())
    .then((data) => {
      // Si la respuesta es exitosa
      if (data.success === true) {
        // Poner la descripcion de la autoridad como encabezado del card
        $("#edictosTableHeader").text(data.descripcion);
      }
    })
    .catch((error) => console.log(error));
}
