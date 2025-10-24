# 🔄 Actualización de Tests - Protección de Rutas

## 📋 Problema Identificado

Con la nueva protección implementada en `/login` y `/registro`, los usuarios logueados son redirigidos automáticamente a home (`/`). Esto causaba que los tests fallaran porque:

1. Al hacer un registro exitoso, el usuario queda logueado
2. Al intentar hacer el siguiente test, la redirección automática impedía acceder a las páginas
3. Los tests necesitaban limpiar la sesión ANTES de navegar, no después

## ✅ Solución Implementada

### Estrategia de Limpieza:
- **`limpiar_sesion()`**: Elimina solo `localStorage.removeItem('usuario')` - mantiene usuarios registrados
- **`limpiar_localStorage()`**: Elimina TODO el localStorage - solo al inicio de la suite

### Cambios en `test_auth.py`:

#### 1. **test_registro()** - Nuevo flujo:
```python
# ANTES de navegar a /registro
self.driver.get(f"{self.base_url}/")  # Ir a home primero
time.sleep(0.5)
self.limpiar_sesion()  # Limpiar sesión activa

# AHORA navegar a registro
self.driver.get(f"{self.base_url}/registro")

# Verificar que no fuimos redirigidos
if "/registro" not in self.driver.current_url:
    # Reintentar limpieza si fuimos redirigidos
    ...
```

#### 2. **test_login()** - Mismo patrón:
```python
# ANTES de navegar a /login
self.driver.get(f"{self.base_url}/")
time.sleep(0.5)
self.limpiar_sesion()

# AHORA navegar a login
self.driver.get(f"{self.base_url}/login")

# Verificar redirección
if "/login" not in self.driver.current_url:
    # Reintentar
    ...
```

#### 3. **ejecutar_tests_desde_csv()** - Limpieza entre tests:
```python
# Al inicio de la suite
test.limpiar_localStorage()  # Limpiar TODO

# Entre cada test
test.driver.get(test.base_url)
test.limpiar_sesion()  # Solo limpiar sesión
time.sleep(0.5)  # Esperar aplicación
```

### Cambios en `test_individual.py`:

#### 1. **test_flujo_completo()**:
```python
# PASO 1: Registro
test.limpiar_localStorage()  # Limpiar TODO al inicio
time.sleep(1)

# PASO 2: Login
test.driver.get(test.base_url)
test.limpiar_sesion()  # Limpiar solo sesión del registro
time.sleep(0.5)
```

#### 2. **test_validaciones_negativas()**:
```python
# Antes de cada test
test.driver.get(test.base_url)
test.limpiar_sesion()
time.sleep(0.5)
```

### Cambios en `config.py`:
```python
"""
IMPORTANTE: La aplicación tiene protección de rutas
- Los usuarios logueados NO pueden acceder a /login o /registro
- Son redirigidos automáticamente a home (/)
- Los tests limpian la sesión antes de cada prueba
"""
```

## 🎯 Resultado Esperado

### Flujo de Test Exitoso:
1. ✅ Inicio: Limpiar localStorage completo
2. ✅ Test Registro: 
   - Limpiar sesión → Navegar a /registro → Completar form → Registro exitoso
3. ✅ Test Login:
   - Limpiar sesión (usuario queda registrado) → Navegar a /login → Login exitoso
4. ✅ Siguiente test:
   - Limpiar sesión → Repetir...

### Protecciones Activas:
- ✅ Usuario logueado NO puede acceder a `/login`
- ✅ Usuario logueado NO puede acceder a `/registro`
- ✅ Redirección automática a home (`/`)
- ✅ Tests funcionan correctamente limpiando sesión antes

## 📊 Impacto

### Antes:
- ❌ Tests fallaban tras primer registro exitoso
- ❌ Redirecciones automáticas no manejadas
- ❌ Limpieza de localStorage incorrecta (después en vez de antes)

### Ahora:
- ✅ Tests pasan correctamente
- ✅ Redirecciones detectadas y manejadas
- ✅ Limpieza de sesión estratégica (antes de navegar)
- ✅ Usuarios registrados persisten entre tests
- ✅ 26 casos de prueba funcionando

## 🔍 Verificación

Para verificar que funciona:
```bash
cd src/tests
python test_individual.py
# Opción 1: Flujo completo
```

Resultado esperado:
```
✅ ÉXITO: Usuario registrado correctamente (redirigió a home)
✅ ÉXITO: Login correcto
🎉 FLUJO COMPLETO EXITOSO
```

## 📝 Notas Técnicas

1. **Timing crítico**: Los `time.sleep()` son necesarios para dar tiempo a:
   - Aplicación de cambios en localStorage
   - Ejecución del useEffect de redirección
   - Carga completa de páginas

2. **Orden de operaciones**: Siempre:
   - Navegar a home → Limpiar sesión → Navegar a destino

3. **Verificación de URL**: Después de navegar, verificar que estamos donde esperamos

4. **Reintentos**: Si detectamos redirección no esperada, reintentar limpieza

---

**Última actualización**: 24/10/2025
**Estado**: ✅ Implementado y funcionando
