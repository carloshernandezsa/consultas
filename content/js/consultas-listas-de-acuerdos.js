//
// Consultas Listas de Acuerdos
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
  // Consultar los distritos para poner opciones en el select
  consultarDistritos();
  $("#listasDeAcuerdosFormCard").show();
  $("#spinnerCard").hide();
} else {
  // Viene la autoridad_clave, entonces consultar las audiencias
  consultarListasDeAcuerdos(autoridad_clave);
  $("#listasDeAcuerdosTableCard").show();
  $("#spinnerCard").hide();
}

// Consultar los distritos para poner opciones en el select
function consultarDistritos() {
  $("#distritoSpinner").show();
  $("#distritoFormGroup").hide();
  fetch(url + "/distritos?es_jurisdiccional=true&limit=100")
    .then((response) => response.json())
    .then((data) => {
      // Si la respuesta es exitosa, recorrerlos y agregarlos al select
      if (data.success === true) {
        data.result.items.forEach((item) => {
          $("#distritoSelect").append($("<option onclick='consultarAutoridades(this.value)'></option>").attr("value", item.clave).text(item.nombre_corto));
        });
        $("#distritoSpinner").hide();
        $("#distritoFormGroup").show();
      }
    })
    .catch((error) => console.log(error));
}

// Consultar las autoridades para poner opciones en el select
function consultarAutoridades(distrito_clave) {
  $("#autoridadSpinner").show();
  $("#autoridadFormGroup").hide();
  fetch(url + "/autoridades?distrito_clave=" + distrito_clave + "&es_jurisdiccional=true&es_notaria=false&limit=100")
    .then((response) => response.json())
    .then((data) => {
      // Si la respuesta es exitosa, recorrelos y agregarlos al select
      if (data.success === true) {
        $("#autoridadSelect").empty(); // Limpiar el select
        data.result.items.forEach((item) => {
          $("#autoridadSelect").append($("<option onclick='recargarPagina(this.value)'></option>").attr("value", item.clave).text(item.descripcion_corta));
        });
        $("#autoridadSpinner").hide();
        $("#autoridadFormGroup").show();
      }
    })
    .catch((error) => console.log(error));
}

// Recargar la página
function recargarPagina(autoridad_clave) {
  // Obtener la url actual sin parámetros
  var actualUrl = window.location.href.split("?")[0];
  // Recargar esta página con la clave de la autoridad
  window.location.href = actualUrl + "?autoridad_clave=" + autoridad_clave;
}

// Consultar las listas de acuerdos
function consultarListasDeAcuerdos(autoridad_clave) {
  // Si tiene datos, limpiar la tabla
  if ($("#listasDeAcuerdosTable").lenght > 0) {
    $("#listasDeAcuerdosTable").DataTable().clear().destroy();
  }

  // Cargar los datos en la tabla
  $("#listasDeAcuerdosTable").DataTable({
    lengthChange: false,
    ordering: false,
    searching: false,
    scrollX: true,
    serverSide: true,
    ajax: {
      url: url + "/listas_de_acuerdos/datatable",
      data: { autoridad_clave: autoridad_clave },
      type: "GET",
      dataType: "json",
    },
    columns: [
      { data: "fecha", width: "20%" },
      { data: "descripcion", width: "60%" },
      { data: "url", width: "20%" },
    ],
    columnDefs: [
      {
        targets: 0,
        data: null,
        render: function (data, type, row) {
          return moment(data).format("DD/MMM/YYYY");
        },
      },
      {
        targets: 2,
        data: null,
        render: function (data, type, row) {
          return '<a href="' + url + '" target="_blank">PDF</a>';
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

  // Consultar la autoridad para poner la descripcion en el encabezado del card
  fetch(url + "/autoridades/" + autoridad_clave)
    .then((response) => response.json())
    .then((data) => {
      // Si la respuesta es exitosa, poner la descripcion de la autoridad
      if (data.success === true) {
        $("#listasDeAcuerdosTableHeader").text(data.distrito_nombre + " > " + data.descripcion);
      }
    })
    .catch((error) => console.log(error));
}
