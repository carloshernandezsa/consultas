//
// Consultas Glosas
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
    $("#glosasFormCard").show(); // Mostrar el formulario
    $("#spinnerCard").hide(); // Ocultar el spinner
  }, 1000); // Esperar un segundo
} else {
  setTimeout(function () {
    consultarGlosas(autoridad_clave); // Consultar las glosas
    $("#glosasTableCard").show(); // Mostrar la tabla
    $("#spinnerCard").hide(); // Ocultar el spinner
  }, 1000); // Esperar un segundo
}

// Consultar los distritos para poner opciones en el select
function consultarDistritos() {
  fetch(url + "/distritos?es_jurisdiccional=true&limit=100")
    .then((response) => response.json())
    .then((data) => {
      // Si la respuesta es exitosa, recorrerlos y agregarlos al select
      if (data.success === true) {
        data.result.items.forEach((item) => {
          $("#distritoSelect").append($("<option onclick='consultarAutoridades(this.value)'></option>").attr("value", item.clave).text(item.nombre_corto));
        });
      }
    })
    .catch((error) => console.log(error));
}

// Consultar las autoridades para poner opciones en el select
function consultarAutoridades(distrito_clave) {
  fetch(url + "/autoridades?distrito_clave=" + distrito_clave + "&es_jurisdiccional=true&es_notaria=false&limit=100")
    .then((response) => response.json())
    .then((data) => {
      // Si la respuesta es exitosa, recorrelos y agregarlos al select
      if (data.success === true) {
        $("#autoridadSelect").empty(); // Limpiar el select
        data.result.items.forEach((item) => {
          $("#autoridadSelect").append($("<option onclick='recargarPagina(this.value)'></option>").attr("value", item.clave).text(item.descripcion_corta));
        });
      }
    })
    .catch((error) => console.log(error));
}

// Recargar la página al dar click en la autoridad agregando la clave en el URL
function recargarPagina(autoridad_clave) {
  window.location.href = window.location.href + "?autoridad_clave=" + autoridad_clave;
}

// Consular las glosas
function consultarGlosas(autoridad_clave) {
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
      { data: "fecha", width: "20%" },
      { data: "expediente", width: "20%" },
      { data: "tipo_juicio", width: "40%" },
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
        targets: 3,
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
        $("#glosasTableHeader").text(data.descripcion);
      }
    })
    .catch((error) => console.log(error));
}
