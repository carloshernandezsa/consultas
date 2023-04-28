//
// Consultas Edictos
//

// Obtener la url actual sin parámetros
var actualUrl = window.location.href.split("?")[0];

// Obtener los parámetros de la URL
var urlParams = new URLSearchParams(window.location.search);
var autoridad_clave = urlParams.get("autoridad_clave");
var fecha_desde = urlParams.get("fecha_desde");
var fecha_hasta = urlParams.get("fecha_hasta");

//
// Filtrar por fechas
//

// Formulario con bootstrap-datepicker
$("#fechasRango").datepicker({
  format: "yyyy-mm-dd",
  todayBtn: true,
});

// Si viene la fecha_desde, ponerla en el formulario
if (fecha_desde != null) {
  $("#fechaDesde").val(fecha_desde);
}

// Si viene la fecha_hasta, ponerla en el formulario
if (fecha_hasta != null) {
  $("#fechaHasta").val(fecha_hasta);
}

// Al dar click en el botón Filtrar se recarga la página
$("#filtrarButton").click(function () {
  // Tomar los valores del formulario
  fecha_desde = $("#fechaDesde").val();
  fecha_hasta = $("#fechaHasta").val();
  // Recargar esta página con los parámetros del formulario y la clave de la autoridad si está definida
  if (autoridad_clave == null) {
    window.location.href = actualUrl + "?fecha_desde=" + fecha_desde + "&fecha_hasta=" + fecha_hasta;
  } else {
    window.location.href = actualUrl + "?fecha_desde=" + fecha_desde + "&fecha_hasta=" + fecha_hasta + "&autoridad_clave=" + autoridad_clave;
  }
});

//
// Consultar a la API
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

// Si no se especificó la autoridad
if (autoridad_clave == null) {
  // Consultar los distritos para poner opciones en el select
  consultarDistritos();
  $("#edictosFormCard").show();
  $("#spinnerCard").hide();
} else {
  // Viene la autoridad_clave, entonces consultar las audiencias
  consultarEdictos();
  $("#edictosTableCard").show();
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
  // Recargar esta página con la clave de la autoridad
  window.location.href = actualUrl + "?autoridad_clave=" + autoridad_clave;
}

// Consultar los edictos
function consultarEdictos() {
  // Consultar la autoridad para poner en el encabezado del card
  fetch(url + "/autoridades/" + autoridad_clave)
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        autoridad_distrito = "<strong>" + data.distrito_nombre + "</strong><br>" + data.descripcion;
        cambiar_boton = "<a href='" + actualUrl + "' class='btn btn-outline-primary btn-sm mx-2'><i class='fa fa-eraser'></i> Cambiar</a>";
        $("#edictosTableTitle").append(autoridad_distrito, cambiar_boton);
      }
    })
    .catch((error) => console.log(error));

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
      data: {
        autoridad_clave: autoridad_clave,
        fecha_desde: fecha_desde != null ? fecha_desde : "1900-01-01",
        fecha_hasta: fecha_hasta != null ? fecha_hasta : "2100-01-01",
      },
      type: "GET",
      dataType: "json",
    },
    columns: [
      { data: "fecha", width: "10%" },
      { data: "descripcion", width: "60%" },
      { data: "expediente", width: "10%" },
      { data: "numero_publicacion", width: "10%" },
      { data: "url", width: "10%" },
    ],
    columnDefs: [
      {
        targets: 0,
        data: null,
        render: function (data, type, row) {
          return moment(data).format("DD/MM/YYYY");
        },
      },
      {
        targets: 4,
        data: null,
        render: function (data, type, row) {
          return '<a href="' + data + '" target="_blank"><i class="fa fa-file"></i> PDF</a>';
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
