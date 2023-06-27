//
// Consultas Peritos
//
// Cargar previemante
// - consultas-api-url.js
//

// Definir elementos del DOM
const peritosFormCard = document.getElementById("peritosFormCard");
const peritosFormSpinner = document.getElementById("peritosFormSpinner");
const peritosForm = document.getElementById("peritosForm");
const peritosTableCard = document.getElementById("peritosTableCard");
const peritosTableTitle = document.getElementById("peritosTableTitle");
const peritosTableSpinner = document.getElementById("peritosTableSpinner");
const peritosTable = document.getElementById("peritosTable");
const nombreInput = document.getElementById("nombreInput");
const consultarButton = document.getElementById("consultarButton");

// Consultar los peritos para llenar la tabla
function consultarPeritos(nombre) {
  peritosTableSpinner.style.display = "block";
  if (nombre == null) {
    nombre = "";
  }
  peritosTableTitle.innerHTML = "Con nombre " + nombre;
  $("#peritosTable").DataTable({
    lengthChange: false,
    ordering: false,
    searching: false,
    scrollX: true,
    serverSide: true,
    ajax: {
      url: apiUrl + "/peritos/datatable",
      headers: { "X-Api-Key": apiKey },
      type: "GET",
      data: {
        nombre: nombre,
      },
      dataType: "json",
    },
    columns: [
      { data: "perito_tipo_nombre", width: "20%" },
      { data: "nombre", width: "20%" },
      { data: "domicilio", width: "20%" },
      { data: "telefono_fijo", width: "10%" },
      { data: "telefono_celular", width: "10%" },
      { data: "email", width: "20%" },
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
  peritosTableSpinner.style.display = "none";
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
  peritosFormCard.style.display = "none";
  peritosTableCard.style.display = "block";
  consultarPeritos(nombre);
} else {
  // Mostrar el card con el formulario para consultar
  peritosFormCard.style.display = "block";
  peritosFormSpinner.style.display = "none";
  peritosForm.style.display = "block";
  consultarButton.addEventListener("click", (thisEvent) => {
    recargarConParametros();
  });
}
