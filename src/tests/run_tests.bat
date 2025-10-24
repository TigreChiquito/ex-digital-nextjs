@echo off
REM Script para ejecutar tests de Selenium en Windows

echo ============================================================
echo     TESTS DE AUTENTICACION - EX DIGITAL
echo ============================================================
echo.

REM Verificar que Python esta instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python no esta instalado o no esta en el PATH
    echo Por favor instala Python desde https://www.python.org/
    pause
    exit /b 1
)

echo [OK] Python encontrado
echo.

REM Verificar que Selenium esta instalado
python -c "import selenium" >nul 2>&1
if errorlevel 1 (
    echo [!] Selenium no esta instalado. Instalando dependencias...
    pip install -r requirements.txt
    echo.
)

echo ============================================================
echo  Selecciona una opcion:
echo ============================================================
echo  1. Ejecutar tests (26 casos de prueba)
echo  2. Instalar/actualizar dependencias
echo  3. Salir
echo ============================================================
echo.

set /p opcion="Ingresa tu opcion (1-3): "

if "%opcion%"=="1" (
    echo.
    echo [*] Ejecutando suite completa de tests...
    echo [!] Testeando aplicacion en: https://exdigital.vercel.app
    timeout /t 3 >nul
    python test_auth.py
) else if "%opcion%"=="2" (
    echo.
    echo [*] Instalando/actualizando dependencias...
    pip install --upgrade -r requirements.txt
    echo.
    echo [OK] Dependencias actualizadas
) else if "%opcion%"=="3" (
    echo.
    echo [*] Saliendo...
    exit /b 0
) else (
    echo.
    echo [ERROR] Opcion invalida
)

echo.
pause
