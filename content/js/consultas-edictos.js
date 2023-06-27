//
// Consultas Edictos
//
// Cargar previemante
// - consultas-api-url.js
// - consultas-distritos-autoridades.js
//

// Definir elementos del DOM
const edictosFormCard = document.getElementById("edictosFormCard");
const edictosTableCard = document.getElementById("edictosTableCard");
const edictosTableSpinner = document.getElementById("edictosTableSpinner");

// Consultar los edictos para llenar la tabla
function consultarEdictos(autoridadClave, fechaDesde, fechaHasta) {
  edictosTableSpinner.style.display = "block";
  $("#edictosTable").DataTable({
    lengthChange: false,
    ordering: false,
    searching: false,
    scrollX: true,
    serverSide: true,
    ajax: {
      url: apiUrl + "/edictos/datatable",
      headers: { "X-Api-Key": apiKey },
      data: {
        autoridad_clave: autoridadClave,
        fecha_desde: fechaDesde != null ? fechaDesde : "1900-01-01",
        fecha_hasta: fechaHasta != null ? fechaHasta : "2100-01-01",
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
  edictosTableSpinner.style.display = "none";
}

//
// Proceso inicial
//

// Obtener los parametros de la URL
const urlParams = new URLSearchParams(window.location.search);
const autoridadClave = urlParams.get("autoridad_clave");
const fechaDesde = urlParams.get("fecha_desde");
const fechaHasta = urlParams.get("fecha_hasta");

// Si viene la clave de la autoridad
if (autoridadClave != null) {
  // Mostrar el card con la tabla DataTable
  edictosFormCard.style.display = "none";
  edictosTableCard.style.display = "block";
  consultarAutoridad(autoridadClave);
  inicializarRangoFechas(autoridadClave, fechaDesde, fechaHasta);
  consultarEdictos(autoridadClave, fechaDesde, fechaHasta);
} else {
  // Mostrar el card con el formulario para elegir el distrito y la autoridad
  edictosFormCard.style.display = "block";
  edictosTableCard.style.display = "none";
  consultarDistritos(conNotarias = true);
}
