//
// Nav menu
//
document.addEventListener('DOMContentLoaded', function() {

  // Obtener todos los parametros de la URL
  const allUrlParams = new URLSearchParams(window.location.search);

  // Obtenemos todos los enlaces de la barra de navegación
  const navLinks = document.querySelectorAll(".nav-menu");

  // Obtener URL actual sin parámetros
  const actualUrl = window.location.href.split(/[?#]/)[0];

  // Agregar a cada enlace los parametros de la URL
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const url = new URL(href, window.location.origin);
    allUrlParams.forEach((value, key) => url.searchParams.append(key, value));
    link.setAttribute("href", url.toString());

    // Si el enlace es la página actual, se agrega la clase "active"
    if (actualUrl === url.toString()) {
      link.classList.add("active");
    }
  });

});
