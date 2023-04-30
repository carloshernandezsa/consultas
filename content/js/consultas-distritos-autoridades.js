//
// Distritos-Autoridades
//

// Definir URL sin parámetros
const actualUrl = window.location.href.split("?")[0];

// Obtener los parametros de la URL
const urlParams = new URLSearchParams(window.location.search);
const autoridadClave = urlParams.get("autoridad_clave");

// Definir elementos del DOM del select distritos
const distritosSpinner = document.getElementById("distritosSpinner");
const distritosFormGroup = document.getElementById("distritosFormGroup");
const distritosSelect = document.getElementById("distritosSelect");

// Definir elementos del DOM del select autoridades
const autoridadesSpinner = document.getElementById("autoridadesSpinner");
const autoridadesFormGroup = document.getElementById("autoridadesFormGroup");
const autoridadesSelect = document.getElementById("autoridadesSelect");

// Definir elementos del DOM del encabezado donde se muestra el distrito y la autoridad seleccionados
const encabezadoSpinner = document.getElementById("encabezadoSpinner");
const distritoTitle = document.getElementById("distritoTitle");
const autoridadTitle = document.getElementById("autoridadTitle");
const cambiarDistritoAutoridadButton = document.getElementById("cambiarDistritoAutoridadButton");

// Recargar la pagina con la clave de la autoridad
function recargarConAutoridadClave(clave) {
  window.location.href = actualUrl + "?autoridad_clave=" + clave;
}

// Recargar la pagina esta página sin parámetros
function recargarSinParametros() {
  window.location.href = actualUrl;
}

// Consultar los distritos para llenar el select
function consultarDistritos() {
  distritosSpinner.style.display = "block";
  distritosFormGroup.style.display = "none";
  fetch(apiUrl + "/distritos?es_jurisdiccional=true&limit=100")
    .then((response) => response.json())
    .then((data) => {
      // Si la respuesta es exitosa, agregarlos como opciones al select
      if (data.success === true) {
        data.result.items.forEach((item) => {
          let thisOption = document.createElement("option");
          thisOption.value = item.clave;
          thisOption.text = item.nombre_corto;
          thisOption.addEventListener("click", (thisEvent) => {
            consultarAutoridades(thisEvent.target.value);
          });
          distritosSelect.appendChild(thisOption);
        });
        distritosSpinner.style.display = "none";
        distritosFormGroup.style.display = "block";
      }
    })
    .catch((error) => console.log(error));
}

// Consultar las autoridades para llenar el select
function consultarAutoridades(distritoClave) {
  if (distritoClave == null) {
    console.log("Falta la clave del distrito");
    return;
  }
  autoridadesSpinner.style.display = "block";
  autoridadesFormGroup.style.display = "none";
  autoridadesSelect.innerHTML = ""; // Eliminar todas las opciones
  fetch(apiUrl + "/autoridades?distrito_clave=" + distritoClave + "&es_jurisdiccional=true&es_notaria=false&limit=100")
    .then((response) => response.json())
    .then((data) => {
      // Si la respuesta es exitosa, agregarlos como opciones al select
      if (data.success === true) {
        data.result.items.forEach((item) => {
          let thisOption = document.createElement("option");
          thisOption.value = item.clave;
          thisOption.text = item.descripcion_corta;
          thisOption.addEventListener("click", (thisEvent) => {
            recargarConAutoridadClave(thisEvent.target.value);
          });
          autoridadesSelect.appendChild(thisOption);
        });
        autoridadesSpinner.style.display = "none";
        autoridadesFormGroup.style.display = "block";
      }
    })
    .catch((error) => console.log(error));
}

// Consultar la autoridad para llenar el encabezado
function consultarAutoridad() {
  if (autoridadClave == null) {
    console.log("Falta la clave de la autoridad");
    return;
  }
  fetch(apiUrl + "/autoridades/" + autoridadClave)
    .then((response) => response.json())
    .then((data) => {
      // Si la respuesta es exitosa, mostrar el distrito y la autoridad seleccionados
      if (data.success === true) {
        distritoTitle.innerText = data.distrito_nombre;
        autoridadTitle.innerText = data.descripcion;
        // cambiarDistritoAutoridadButton;
        encabezadoSpinner.style.display = "none";
        distritoTitle.style.display = "block";
        autoridadTitle.style.display = "block";
        cambiarDistritoAutoridadButton.style.display = "block";
      }
    })
    .catch((error) => console.log(error));
}
