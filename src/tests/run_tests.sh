#!/bin/bash

# Script para ejecutar tests de Selenium en Linux/Mac
# Asegurate de tener Python instalado y la app corriendo en localhost:3000

echo "============================================================"
echo "    TESTS DE AUTENTICACION - EX DIGITAL"
echo "============================================================"
echo ""

# Verificar que Python esta instalado
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python no esta instalado"
    echo "Por favor instala Python desde https://www.python.org/"
    exit 1
fi

echo "[OK] Python encontrado: $(python3 --version)"
echo ""

# Verificar que Selenium esta instalado
if ! python3 -c "import selenium" &> /dev/null; then
    echo "[!] Selenium no esta instalado. Instalando dependencias..."
    pip3 install -r requirements.txt
    echo ""
fi

echo "============================================================"
echo " Selecciona el tipo de test a ejecutar:"
echo "============================================================"
echo " 1. Tests completos desde CSV (26 casos)"
echo " 2. Tests individuales interactivos"
echo " 3. Instalar/actualizar dependencias"
echo " 4. Salir"
echo "============================================================"
echo ""

read -p "Ingresa tu opcion (1-4): " opcion

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
        echo "[*] Ejecutando tests individuales..."
        python3 test_individual.py
        ;;
    3)
        echo ""
        echo "[*] Instalando/actualizando dependencias..."
        pip3 install --upgrade -r requirements.txt
        echo ""
        echo "[OK] Dependencias actualizadas"
        ;;
    4)
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
