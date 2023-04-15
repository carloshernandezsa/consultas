"""
Pelican configuration file
"""

# Theme
THEME = "themes/bootstrap5-dashboard"

# Site
SITENAME = "Justicia Digital"
SITEURL = "http://localhost:8000"

# Static paths will be copied under the same name
STATIC_PATHS = [
    "favicon.ico",
    "robots.txt",
]

# Categories
USE_FOLDER_AS_CATEGORY = True
DEFAULT_CATEGORY = "consultas"

# Timezone
TIMEZONE = "America/Mexico_City"

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Sitemap
SITEMAP = {
    "format": "xml",
    "priorities": {"articles": 0.5, "indexes": 0.5, "pages": 0.5},
    "changefreqs": {"articles": "monthly", "indexes": "daily", "pages": "monthly"},
}

# Plugins
PLUGIN_PATHS = ['plugins']
PLUGINS = ["pelican_javascript"]
