"""
Configuración de URLs para testing
Modifica aquí para cambiar entre entornos

IMPORTANTE: La aplicación tiene protección de rutas
- Los usuarios logueados NO pueden acceder a /login o /registro
- Son redirigidos automáticamente a home (/)
- Los tests limpian la sesión antes de cada prueba para evitar esto
"""

# URL por defecto (Producción)
BASE_URL = "https://exdigital.vercel.app"

# Descomentar para desarrollo local
# BASE_URL = "http://localhost:3000"

# Descomentar para staging (si existe)
# BASE_URL = "https://staging.exdigital.vercel.app"

# Timeouts
DEFAULT_TIMEOUT = 15  # segundos para esperar elementos (aumentado para producción)
PAGE_LOAD_TIMEOUT = 30  # segundos para cargar páginas

# Opciones de Chrome
HEADLESS_MODE = False  # True = sin ventana visible, False = con ventana
MAXIMIZE_WINDOW = True  # Maximizar ventana del navegador

# Delays entre acciones (segundos)
ACTION_DELAY = 2  # Pausa entre acciones de test (aumentado para producción)
TEST_DELAY = 1  # Pausa entre tests completos
CLEANUP_DELAY = 2  # Pausa antes de cerrar el navegador

print(f"🌐 Configuración cargada: {BASE_URL}")
