// Función para cambiar el modo del sitio web
function cambiarModo() {
  var cuerpoweb = document.body;
  var iconoTema = document.getElementById("icono-tema");

  // Cambiar entre los modos oscuro y claro
  cuerpoweb.classList.toggle("oscuro");

  // Cambiar el icono del tema según el modo
  if (cuerpoweb.classList.contains("oscuro")) {
    iconoTema.classList.remove("fa-moon");
    iconoTema.classList.add("fa-sun");
    localStorage.setItem("modo-oscuro", "activo");
  } else {
    iconoTema.classList.remove("fa-sun");
    iconoTema.classList.add("fa-moon");
    localStorage.setItem("modo-oscuro", "inactivo");
  }
}

// Aplicar el modo oscuro guardado en localStorage, si existe
const modoOscuroGuardado = localStorage.getItem("modo-oscuro");
if (modoOscuroGuardado === "activo") {
  document.body.classList.add("oscuro");
  document.getElementById("icono-tema").classList.remove("fa-moon");
  document.getElementById("icono-tema").classList.add("fa-sun");
} else {
  document.body.classList.remove("oscuro");
  document.getElementById("icono-tema").classList.remove("fa-sun");
  document.getElementById("icono-tema").classList.add("fa-moon");
}

// Event listener para el click en el botón flotante para ir al inicio
$(".boton-flotante").click(function () {
  // Animación para desplazarse al inicio de la página
  $("body, html").animate(
    {
      scrollTop: "0px",
    },
    300
  );
});

// Event listener para el scroll de la ventana
$(window).scroll(function () {
  if ($(this).scrollTop() > 0) {
    // Si la posición de desplazamiento es mayor que 0, mostrar el botón flotante deslizándolo hacia abajo
    $(".boton-flotante").slideDown(300);
  } else {
    // De lo contrario, ocultar el botón flotante deslizándolo hacia arriba
    $(".boton-flotante").slideUp(300);
  }
});

/* AUMENTAR Y DISMINUIR TIPOGRAFIA */

// Función para aumentar la tipografía
function increaseFontSize() {
  var currentSize = parseFloat(getComputedStyle(document.body).fontSize) || 16;
  var newSize = currentSize + 1;
  document.body.style.fontSize = newSize + "px";

  // Guardar el tamaño de fuente en localStorage
  localStorage.setItem("bodyFontSize", document.body.style.fontSize);
  console.log(document.body.style.fontSize);
}

// Función para disminuir la tipografía
function decreaseFontSize() {
  var currentSize = parseFloat(getComputedStyle(document.body).fontSize) || 16;
  var newSize = currentSize - 1;
  document.body.style.fontSize = newSize + "px";

  // Guardar el tamaño de fuente en localStorage
  localStorage.setItem("bodyFontSize", document.body.style.fontSize);
  console.log(document.body.style.fontSize);
}

// Restaurar el tamaño de fuente guardado al cargar la página
function loadFontSize() {
  var savedBodyFontSize = localStorage.getItem("bodyFontSize");

  // Restaurar el tamaño de fuente del cuerpo del documento
  if (savedBodyFontSize) {
    document.body.style.fontSize = savedBodyFontSize;
  } else {
    document.body.style.fontSize = "16px";
  }

}

// Llamar a la función loadFontSize al cargar la página
window.onload = loadFontSize;
