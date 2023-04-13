"""
Pelican configuration file
"""

THEME = "themes/bootstrap5-dashboard"

SITENAME = "Justicia Digital"
SITEURL = "http://localhost:8000"

STATIC_PATHS = [
    "favicon.ico",
    "robots.txt",
]

USE_FOLDER_AS_CATEGORY = True
DEFAULT_CATEGORY = "consultas"

TIMEZONE = "America/Mexico_City"

FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None
