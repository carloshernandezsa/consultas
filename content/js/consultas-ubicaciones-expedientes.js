//
// Consultas Ubicaciones de Expedientes
//
// Cargar previemante
// - consultas-api-url.js
// - consultas-distritos-autoridades.js
//

// Definir elementos del DOM
const ubicacionesExpedientesFormCard = document.getElementById("ubicacionesExpedientesFormCard");
const ubicacionesExpedientesTableCard = document.getElementById("ubicacionesExpedientesTableCard");
const ubicacionesExpedientesTableSpinner = document.getElementById("ubicacionesExpedientesTableSpinner");

// Consultar las ubicaciones de expedientes para llenar la tabla
function consultarUbicacionesExpedientes(autoridadClave) {
  ubicacionesExpedientesTableSpinner.style.display = "block";
  $("#ubicacionesExpedientesTable").DataTable({
    lengthChange: false,
    ordering: false,
    searching: false,
    scrollX: true,
    serverSide: true,
    ajax: {
      url: apiUrl + "/ubicaciones_expedientes/datatable",
      headers: { "X-Api-Key": apiKey },
      data: { autoridad_clave: autoridadClave },
      type: "GET",
      dataType: "json",
    },
    columns: [
      { data: "distrito_nombre_corto", width: "30%" },
      { data: "autoridad_descripcion_corta", width: "30%" },
      { data: "expediente", width: "20%" },
      { data: "ubicacion", width: "20%" },
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
  ubicacionesExpedientesTableSpinner.style.display = "none";
}

//
// Proceso inicial
//

// Obtener los parametros de la URL
const urlParams = new URLSearchParams(window.location.search);
const autoridadClave = urlParams.get("autoridad_clave");

// Si viene la clave de la autoridad
if (autoridadClave != null) {
  // Mostrar el card con la tabla DataTable
  ubicacionesExpedientesFormCard.style.display = "none";
  ubicacionesExpedientesTableCard.style.display = "block";
  consultarAutoridad(autoridadClave);
  consultarUbicacionesExpedientes(autoridadClave);
} else {
  // Mostrar el card con el formulario para elegir el distrito y la autoridad
  ubicacionesExpedientesFormCard.style.display = "block";
  ubicacionesExpedientesTableCard.style.display = "none";
  consultarDistritos();
}
