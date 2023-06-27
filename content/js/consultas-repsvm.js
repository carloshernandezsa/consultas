//
// Consultas REPSVM
//
// Cargar previemante
// - consultas-api-url.js
//

// Definir elementos del DOM
const repsvmFormCard = document.getElementById("repsvmFormCard");
const repsvmFormSpinner = document.getElementById("repsvmFormSpinner");
const repsvmForm = document.getElementById("repsvmForm");
const repsvmTableCard = document.getElementById("repsvmTableCard");
const repsvmTableTitle = document.getElementById("repsvmTableTitle");
const repsvmTableSpinner = document.getElementById("repsvmTableSpinner");
const repsvmTable = document.getElementById("repsvmTable");
const nombreInput = document.getElementById("nombreInput");
const consultarButton = document.getElementById("consultarButton");

// Consultar el repsvm para llenar la tabla
function consultarRepsvm(nombre) {
  repsvmTableSpinner.style.display = "block";
  if (nombre == null) {
    nombre = "";
  }
  repsvmTableTitle.innerHTML = "Con nombre " + nombre;
  $("#repsvmTable").DataTable({
    lengthChange: false,
    ordering: false,
    searching: false,
    scrollX: true,
    serverSide: true,
    ajax: {
      url: apiUrl + "/repsvm_agresores/datatable",
      headers: { "X-Api-Key": apiKey },
      type: "GET",
      data: {
        nombre: nombre,
      },
      dataType: "json",
    },
    columns: [
      { data: "distrito_nombre_corto", width: "10%" },
      { data: "nombre", width: "20%" },
      { data: "tipo_juzgado", width: "10%" },
      { data: "delito_generico", width: "10%" },
      { data: "delito_especifico", width: "10%" },
      { data: "tipo_sentencia", width: "10%" },
      { data: "numero_causa", width: "10%" },
      { data: "pena_impuesta", width: "10%" },
      { data: "observaciones", width: "10%" },
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
  repsvmTableSpinner.style.display = "none";
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
  repsvmFormCard.style.display = "none";
  repsvmTableCard.style.display = "block";
  consultarRepsvm(nombre);
} else {
  // Mostrar el card con el formulario para consultar
  repsvmFormCard.style.display = "block";
  repsvmFormSpinner.style.display = "none";
  repsvmForm.style.display = "block";
  consultarButton.addEventListener("click", (thisEvent) => {
    recargarConParametros();
  });
}
