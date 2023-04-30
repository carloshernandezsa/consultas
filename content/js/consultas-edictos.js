//
// Consultas Edictos
//

// Definir elementos del DOM
const edictosFormCard = document.getElementById("edictosFormCard");
const edictosTableCard = document.getElementById("edictosTableCard");

// Si viene la clave de la autoridad
if (autoridadClave != null) {
  edictosFormCard.style.display = "none";
  edictosTableCard.style.display = "block";
  consultarAutoridad(autoridadClave);
} else {
  edictosFormCard.style.display = "block";
  edictosTableCard.style.display = "none";
  consultarDistritos();
}
