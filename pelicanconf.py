"""
Pelican development configuration file
"""

# Tema
# THEME = "themes/bootstrap4.6"
THEME = "themes/pjecz-2020-10"

# Sitio
SITENAME = "Consultas del PJECZ"
SITEURL = "http://localhost:8000"

# Autor por defecto
AUTHOR = "Direccion de Informatica"

# Paginas atemporales, que no son articulos
PAGE_PATHS = ["consultas"]

# Rutas y archivos con contenidos estaticos que deben ser copiados
# Agregue también los directorios que tienen archivos para artículos y páginas
STATIC_PATHS = ["favicon.ico", "robots.txt", "consultas"]

# Al colocar un articulo, la cetegoria se toma del nombre de la carpeta
USE_FOLDER_AS_CATEGORY = True
DEFAULT_CATEGORY = "consultas"

# Zona horaria
TIMEZONE = "America/Mexico_City"

# La generacion de fuentes RSS y Atom esta deshabilitada
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Mapa del sitio
SITEMAP = {
    "format": "xml",
    "priorities": {"articles": 0.5, "indexes": 0.5, "pages": 0.5},
    "changefreqs": {"articles": "monthly", "indexes": "daily", "pages": "monthly"},
}

# Plugins, se usa pelican_javascript para incluir archivos JavaScript en las consultas
PLUGIN_PATHS = ["plugins"]
PLUGINS = ["pelican_javascript"]
