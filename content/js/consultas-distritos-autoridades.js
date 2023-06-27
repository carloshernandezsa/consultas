//
// Consultas Distritos-Autoridades
//
// Sirve para el Formulario Distrito-Autoridad
//
// Cargar previemante
// - consultas-api-url.js
//

// Definir URL sin parámetros
const actualUrl = window.location.href.split("?")[0];

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
const encabezadoDiv = document.getElementById("encabezadoDiv");
const distritoTitle = document.getElementById("distritoTitle");
const autoridadTitle = document.getElementById("autoridadTitle");
const cambiarDistritoAutoridadButton = document.getElementById("cambiarDistritoAutoridadButton");
const rangoFechasDiv = document.getElementById("rangoFechasDiv");

// Recargar la pagina esta página sin parámetros
function recargarSinParametros() {
  window.location.href = actualUrl;
}

// Recargar la pagina con la clave de la autoridad
function recargarConAutoridadClave(autoridadClave) {
  window.location.href = actualUrl + "?autoridad_clave=" + autoridadClave;
}

// Recargar la pagina con la clave de la autoridad y una fecha
function recargarConFecha(autoridadClave, fecha) {
  window.location.href = actualUrl + "?autoridad_clave=" + autoridadClave + "&fecha=" + fecha;
}

// Recargar la pagina con la clave de la autoridad y el rango de fechas
function recargarConRangoFechas(autoridadClave, fechaDesde, fechaHasta) {
  window.location.href = actualUrl + "?autoridad_clave=" + autoridadClave + "&fecha_desde=" + fechaDesde + "&fecha_hasta=" + fechaHasta;
}

// Consultar los distritos para llenar el select
function consultarDistritos(conNotarias = false) {
  distritosSpinner.style.display = "block";
  distritosFormGroup.style.display = "none";
  fetch(apiUrl + "/distritos?es_jurisdiccional=true&limit=100", { headers: { "X-Api-Key": apiKey } })
    .then((response) => response.json())
    .then((data) => {
      // Si la respuesta es exitosa, agregarlos como opciones al select
      if (data.success === true) {
        data.result.items.forEach((item) => {
          let thisOption = document.createElement("option");
          thisOption.value = item.clave;
          thisOption.text = item.nombre_corto;
          thisOption.addEventListener("click", (thisEvent) => {
            consultarAutoridades(thisEvent.target.value, conNotarias);
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
function consultarAutoridades(distritoClave, conNotarias = false) {
  if (distritoClave == null) {
    console.log("Falta la clave del distrito");
    return;
  }
  autoridadesSpinner.style.display = "block";
  autoridadesFormGroup.style.display = "none";
  autoridadesSelect.innerHTML = ""; // Eliminar todas las opciones
  if (conNotarias) {
    fullApiUrl = apiUrl + "/autoridades?distrito_clave=" + distritoClave + "&es_jurisdiccional=true&limit=100"
  } else {
    fullApiUrl = apiUrl + "/autoridades?distrito_clave=" + distritoClave + "&es_jurisdiccional=true&es_notaria=false&limit=100"
  }
  fetch(fullApiUrl, { headers: { "X-Api-Key": apiKey } })
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
function consultarAutoridad(autoridadClave) {
  if (autoridadClave == null) {
    console.log("Falta la clave de la autoridad");
    return;
  }
  encabezadoSpinner.style.display = "block";
  encabezadoDiv.style.display = "none";
  fetch(apiUrl + "/autoridades/" + autoridadClave, { headers: { "X-Api-Key": apiKey } })
    .then((response) => response.json())
    .then((data) => {
      // Si la respuesta es exitosa, mostrar el distrito y la autoridad seleccionados, asi como el rango de fechas
      if (data.success === true) {
        distritoTitle.innerText = data.distrito_nombre;
        autoridadTitle.innerText = data.descripcion;
        cambiarDistritoAutoridadButton.addEventListener("click", (thisEvent) => {
          recargarSinParametros();
        });
        encabezadoSpinner.style.display = "none";
        encabezadoDiv.style.display = "block";
      }
    })
    .catch((error) => console.log(error));
}
