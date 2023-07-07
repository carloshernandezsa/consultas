// Consultas Tipos de Peritos
//
// Sirve para elegir un tipo de perito con un select
//
// Cargar previemante
// - consultas-api-url.js
//

// Definir elementos del DOM del select tipos de peritos
const tipoDePeritoSpinner = document.getElementById("tipoDePeritoSpinner");
const tipoDePeritoSelect = document.getElementById("tipoDePeritoSelect");

// Definir elementos del DOM del encabezado
const encabezadoSpinner = document.getElementById("encabezadoSpinner");
const encabezadoDiv = document.getElementById("encabezadoDiv");

// Consultar los tipos de peritos para llenar el select
async function consultarTiposDePeritos() {
  tipoDePeritoSpinner.style.display = "block";
  await esperar(1000); // Esperar 1 segundo
  fetch(apiUrl + "/peritos_tipos", { headers: { "X-Api-Key": apiKey } })
    .then((response) => response.json())
    .then((data) => {
      // Si la respuesta es exitosa, agregarlos como opciones al select
      if (data.success === true) {
        // Agregar la opción de "Todos los Distritos"
        let allOption = document.createElement("option");
        allOption.value = "";
        allOption.text = "Todos los Tipos de Peritos";
        tipoDePeritoSelect.appendChild(allOption);
        // Agregar el resto de los distritos
        data.result.items.forEach((item) => {
          let thisOption = document.createElement("option");
          thisOption.value = item.id;
          thisOption.text = item.nombre;
          tipoDePeritoSelect.appendChild(thisOption);
        });
        tipoDePeritoSpinner.style.display = "none";
      }
    })
    .catch((error) => console.log(error));
}
