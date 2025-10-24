# 🧪 Tests de Autenticación - Selenium

Suite de tests automatizados para validar las funcionalidades de Login y Registro de la aplicación Ex-Digital.

**URL de prueba:** https://exdigital.vercel.app

---

## 📋 Requisitos Previos

### Python 3.8 o superior
```bash
python --version
```

---

## 🚀 Instalación y Ejecución

### Opción 1: Ejecución Rápida (Recomendado)

**Windows:**
```bash
cd src/tests
run_tests.bat
```

**Linux/Mac:**
```bash
cd src/tests
chmod +x run_tests.sh
./run_tests.sh
```

El script instalará automáticamente las dependencias si no están presentes.

### Opción 2: Ejecución Manual

**Paso 1:** Instalar dependencias
```bash
cd src/tests
pip install -r requirements.txt
```

**Paso 2:** Ejecutar tests
```bash
python test_auth.py
```

---

## 📊 Estructura de Archivos

```
src/tests/
├── test_auth.py           # Script principal con 26 tests
├── config.py              # Configuración (URL, timeouts)
├── usuarios_test.csv      # Datos de prueba
├── requirements.txt       # Dependencias Python
├── run_tests.bat          # Script ejecución Windows
├── run_tests.sh           # Script ejecución Linux/Mac
├── README.md              # Esta documentación
└── CHANGELOG_TESTS.md     # Historial de cambios
```

---

## 📝 Casos de Prueba (26 tests)

### ✅ Tests de Registro (15 casos)

| # | Caso | Email | Resultado |
|---|------|-------|-----------|
| 1 | Válido @duoc.cl | juan.perez@duoc.cl | ✅ Éxito |
| 2 | Válido @profesor.duoc.cl | maria.gonzalez@profesor.duoc.cl | ✅ Éxito |
| 3 | Válido @gmail.com | carlos.rojas@gmail.com | ✅ Éxito |
| 4 | Inválido @hotmail.com | ana.lopez@hotmail.com | ❌ Error |
| 5 | Inválido @yahoo.com | pedro.soto@yahoo.com | ❌ Error |
| 6 | Contraseña corta (< 6) | luis.munoz@duoc.cl | ❌ Error |
| 7 | Contraseñas no coinciden | carmen.silva@duoc.cl | ❌ Error |
| 8 | Email formato simple | elena@duoc.cl | ✅ Éxito |
| 9 | Email inválido | invalidemail | ❌ Error |
| 10 | Contraseña vacía | sofia.herrera@duoc.cl | ❌ Error |
| 11 | Nombre vacío | laura.castro@duoc.cl | ❌ Error |
| 12 | Email mayúsculas | patricia.nunez@DUOC.CL | ✅ Éxito |
| 13 | Usuario ya registrado | diego.morales@duoc.cl | ❌ Error |
| 14-15 | Más casos de validación | - | - |

### ✅ Tests de Login (11 casos)

| # | Caso | Email | Resultado |
|---|------|-------|-----------|
| 1-5 | Usuarios registrados | juan.perez@duoc.cl, etc. | ✅ Éxito |
| 6 | Usuario no existente | noexiste@duoc.cl | ❌ Error |
| 7 | Contraseña incorrecta | juan.perez@duoc.cl | ❌ Error |
| 8 | Email inválido | invalidemail | ❌ Error |
| 9 | Email vacío | - | ❌ Error |
| 10 | Contraseña vacía | maria.gonzalez@profesor.duoc.cl | ❌ Error |
| 11 | Case sensitive | JUAN.PEREZ@DUOC.CL | ❌ Error |

---

## 🎯 Validaciones Implementadas

### Registro
✅ Dominios permitidos: `@duoc.cl`, `@profesor.duoc.cl`, `@gmail.com`
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
