//
// Consultas REDAM
//
// Cargar previemante
// - consultas-api-url.js
//

// Definir elementos del DOM
const redamFormCard = document.getElementById("redamFormCard");
const redamFormSpinner = document.getElementById("redamFormSpinner");
const redamForm = document.getElementById("redamForm");
const redamTableCard = document.getElementById("redamTableCard");
const redamTableTitle = document.getElementById("redamTableTitle");
const redamTableSpinner = document.getElementById("redamTableSpinner");
const redamTable = document.getElementById("redamTable");
const nombreInput = document.getElementById("nombreInput");
const consultarButton = document.getElementById("consultarButton");

// Consultar el redam para llenar la tabla
function consultarRedam(nombre) {
  redamTableSpinner.style.display = "block";
  if (nombre == null) {
    nombre = "";
  }
  redamTableTitle.innerHTML = "Con nombre " + nombre;
  $("#redamTable").DataTable({
    lengthChange: false,
    ordering: false,
    searching: false,
    scrollX: true,
    serverSide: true,
    ajax: {
      url: apiUrl + "/redam/datatable",
      headers: { "X-Api-Key": apiKey },
      type: "GET",
      data: {
        nombre: nombre,
      },
      dataType: "json",
    },
    columns: [
      { data: "fecha", width: "20%" },
      { data: "distrito_nombre_corto", width: "20%" },
      { data: "autoridad_descripcion_corta", width: "20%" },
      { data: "nombre", width: "20%" },
      { data: "expediente", width: "20%" },
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
  redamTableSpinner.style.display = "none";
}

// Recargar la pagina con los parametros del formulario
function recargarConParametros() {
  const actualUrl = window.location.href.split("?")[0];
  const elNombre = nombreInput.value;
  window.location.href = actualUrl + "?nombre=" + elNombre;
}

//
// Proceso inicial
//

// Obtener los parametros de la URL
const urlParams = new URLSearchParams(window.location.search);
var nombre = urlParams.get("nombre");

// Si se recibio el nombre
if (nombre != null) {
  // Mostrar el card con la tabla DataTable
  redamFormCard.style.display = "none";
  redamTableCard.style.display = "block";
  consultarRedam(nombre);
} else {
  // Mostrar el card con el formulario para consultar
  redamFormCard.style.display = "block";
  redamFormSpinner.style.display = "none";
  redamForm.style.display = "block";
  consultarButton.addEventListener("click", (thisEvent) => {
    recargarConParametros();
  });
}
