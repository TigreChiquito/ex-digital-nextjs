# 🧪 Tests de Autenticación - Selenium

Suite de tests automatizados para validar las funcionalidades de Login y Registro de la aplicación.

---

## 📋 Requisitos Previos

### 1. Python 3.8 o superior
```bash
python --version
```

### 2. Instalar Selenium
```bash
pip install selenium
```

### 3. ChromeDriver
El driver de Chrome debe estar instalado. Opciones:

**Opción A: Instalación automática (Python 3.10+)**
```bash
pip install webdriver-manager
```

**Opción B: Descarga manual**
- Descargar desde: https://chromedriver.chromium.org/
- Colocar en PATH o en la carpeta del proyecto

---

## 🚀 Cómo Ejecutar los Tests

### Paso 1: Instalar dependencias
```bash
cd src/tests
pip install -r requirements.txt
```

### Paso 2: Ejecutar los tests
Los tests están configurados para ejecutarse contra la aplicación en producción:
**URL: https://exdigital.vercel.app**

```bash
cd src/tests
python test_auth.py
```

### Testear en Desarrollo Local (Opcional)
Si quieres testear en `http://localhost:3000`, edita `test_auth.py`:
```python
# Línea 17
test = TestAuth(base_url="http://localhost:3000")
```

---

## 📊 Estructura de Archivos

```
src/tests/
├── test_auth.py           # Script principal de testing
├── usuarios_test.csv      # Casos de prueba (26 tests)
└── README.md             # Esta documentación
```

---

## 📝 Casos de Prueba Incluidos

### ✅ Tests de Registro (15 casos)

| Tipo | Descripción | Resultado Esperado |
|------|-------------|-------------------|
| ✅ Válido | Email @duoc.cl | Éxito |
| ✅ Válido | Email @profesor.duoc.cl | Éxito |
| ✅ Válido | Email @gmail.com | Éxito |
| ❌ Inválido | Email con dominio no permitido | Error |
| ❌ Inválido | Contraseña muy corta (< 6) | Error |
| ❌ Inválido | Contraseñas no coinciden | Error |
| ❌ Inválido | Email sin formato válido | Error |
| ❌ Inválido | Campos vacíos | Error |

### ✅ Tests de Login (11 casos)

| Tipo | Descripción | Resultado Esperado |
|------|-------------|-------------------|
| ✅ Válido | Credenciales correctas | Éxito |
| ❌ Inválido | Usuario no registrado | Error |
| ❌ Inválido | Contraseña incorrecta | Error |
| ❌ Inválido | Email sin formato válido | Error |
| ❌ Inválido | Campos vacíos | Error |

---

## 🎯 Validaciones Implementadas

### Registro
- ✅ Dominios permitidos: `@duoc.cl`, `@profesor.duoc.cl`, `@gmail.com`
- ✅ Contraseña mínima: 6 caracteres
- ✅ Confirmación de contraseña debe coincidir
- ✅ Formato de email válido
- ✅ Campos requeridos no vacíos

### Login
- ✅ Usuario debe estar registrado
- ✅ Contraseña debe coincidir
- ✅ Formato de email válido
- ✅ Redirección correcta después del login

---

## 📈 Interpretación de Resultados

Al finalizar los tests, verás un resumen como este:

```
============================================================
📊 RESUMEN DE TESTS
============================================================
Total de tests: 26
✅ Exitosos: 24
❌ Fallidos: 2
📈 Porcentaje de éxito: 92.3%
============================================================
```

### Símbolos:
- `✅ ÉXITO`: Test pasó correctamente
- `❌ ERROR`: Test falló (comportamiento inesperado)
- `⚠️ ADVERTENCIA`: Comportamiento anómalo detectado
- `🧹`: localStorage limpiado entre tests

---

## 🛠️ Personalización

### Cambiar URL base
Editar en `test_auth.py`:
```python
test = TestAuth(base_url="http://localhost:3001")
```

### Modo Headless (sin ventana)
Descomentar en `test_auth.py`:
```python
options.add_argument('--headless')
```

### Agregar nuevos casos de prueba
Editar `usuarios_test.csv` con el formato:
```csv
tipo_test,nombre,email,password,confirm_password,resultado_esperado,razon
registro,Nuevo Usuario,nuevo@duoc.cl,Pass123,Pass123,exito,Descripción del caso
```

---

## 🐛 Troubleshooting

### Error: ChromeDriver no encontrado
```bash
pip install webdriver-manager
```
Y modificar `test_auth.py`:
```python
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

service = Service(ChromeDriverManager().install())
self.driver = webdriver.Chrome(service=service, options=options)
```

### Error: Elemento no encontrado
- Verificar que la app esté corriendo
- Aumentar el timeout en `test_auth.py`:
```python
self.wait = WebDriverWait(self.driver, 20)  # 20 segundos
```

### Tests muy lentos
Reducir pausas en `test_auth.py`:
```python
time.sleep(0.5)  # Reducir de 2 a 0.5 segundos
```

---

## 📚 Recursos Adicionales

- **Selenium Docs**: https://selenium-python.readthedocs.io/
- **Chrome DevTools Protocol**: https://chromedevtools.github.io/devtools-protocol/
- **Python CSV Module**: https://docs.python.org/3/library/csv.html

---

## 👥 Contribuir

Para agregar más tests:

1. Agregar casos al CSV
2. Ejecutar y validar resultados
3. Documentar nuevos casos en este README

---

## 📄 Licencia

Proyecto académico - Duoc UC

---

**¿Preguntas?** Contactar al equipo de desarrollo 🚀
