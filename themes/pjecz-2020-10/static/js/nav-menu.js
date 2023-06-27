//
// Nav menu
//
document.addEventListener('DOMContentLoaded', function() {
  // Obtener todos los parametros de la URL
  const allUrlParams = new URLSearchParams(window.location.search);

  // Obtenemos todos los enlaces de la barra de navegación
  const navLinks = document.querySelectorAll(".nav-menu");

  // Agregar a cada enlace los parametros de la URL
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const url = new URL(href, window.location.origin);
    allUrlParams.forEach((value, key) => url.searchParams.append(key, value));
    link.setAttribute("href", url.toString());

    // Verificar si el enlace corresponde a la página actual
    if (window.location.href === url.toString()) {
      link.classList.add("active");
    }
  });

  
});
