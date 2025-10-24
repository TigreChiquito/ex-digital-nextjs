#!/bin/bash
# Script para ejecutar tests de Selenium en Linux/Mac

echo "============================================================"
echo "     TESTS DE AUTENTICACION - EX DIGITAL"
echo "============================================================"
echo ""

# Verificar que Python esta instalado
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python no esta instalado"
    echo "Por favor instala Python desde https://www.python.org/"
    exit 1
fi

echo "[OK] Python encontrado"
echo ""

# Verificar que Selenium esta instalado
python3 -c "import selenium" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "[!] Selenium no esta instalado. Instalando dependencias..."
    pip3 install -r requirements.txt
    echo ""
fi

echo "============================================================"
echo "  Selecciona una opcion:"
echo "============================================================"
echo "  1. Ejecutar tests (26 casos de prueba)"
echo "  2. Instalar/actualizar dependencias"
echo "  3. Salir"
echo "============================================================"
echo ""

read -p "Ingresa tu opcion (1-3): " opcion

case $opcion in
    1)
        echo ""
        echo "[*] Ejecutando suite completa de tests..."
        echo "[!] Testeando aplicacion en: https://exdigital.vercel.app"
        sleep 3
        python3 test_auth.py
        ;;
    2)
        echo ""
        echo "[*] Instalando/actualizando dependencias..."
        pip3 install --upgrade -r requirements.txt
        echo ""
        echo "[OK] Dependencias actualizadas"
        ;;
    3)
        echo ""
        echo "[*] Saliendo..."
        exit 0
        ;;
    *)
        echo ""
        echo "[ERROR] Opcion invalida"
        ;;
esac

echo ""
read -p "Presiona Enter para continuar..."
