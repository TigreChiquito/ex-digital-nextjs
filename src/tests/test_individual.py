"""
Test Individual - Ejemplo básico de uso
Ejecuta un test simple de registro y login
URL por defecto: https://exdigital.vercel.app
"""

from test_auth import TestAuth
import time

def test_flujo_completo():
    """
    Test completo: Registro + Login de un usuario
    """
    print("="*60)
    print("🧪 TEST DE FLUJO COMPLETO: REGISTRO + LOGIN")
    print("="*60)
    print("🌐 URL: https://exdigital.vercel.app")
    print("="*60)
    
    # Datos del usuario de prueba
    test_user = {
        "nombre": "Usuario Prueba",
        "email": "prueba.test@duoc.cl",
        "password": "Test123456"
    }
    
    test = TestAuth()
    test.setup()
    
    try:
        # 1. Test de Registro
        print("\n📝 PASO 1: Registrando usuario...")
        # Limpiar TODO al inicio
        test.driver.get(test.base_url)
        time.sleep(1)
        test.limpiar_localStorage()
        time.sleep(1)  # Esperar a que se aplique completamente
        
        resultado_registro = test.test_registro(
            nombre=test_user["nombre"],
            email=test_user["email"],
            password=test_user["password"],
            confirm_password=test_user["password"],
            resultado_esperado="exito"
        )
        
        if not resultado_registro:
            print("❌ El registro falló. Abortando test.")
            return False
        
        time.sleep(2)
        
        # 2. Test de Login
        print("\n🔐 PASO 2: Iniciando sesión con el usuario creado...")
        
        # Limpiar la sesión del registro anterior
        test.driver.get(test.base_url)
        time.sleep(0.5)
        test.limpiar_sesion()
        time.sleep(0.5)
        
        resultado_login = test.test_login(
            email=test_user["email"],
            password=test_user["password"],
            resultado_esperado="exito"
        )
        
        if not resultado_login:
            print("❌ El login falló.")
            return False
        
        print("\n" + "="*60)
        print("🎉 FLUJO COMPLETO EXITOSO")
        print("="*60)
        print(f"✅ Usuario registrado: {test_user['email']}")
        print(f"✅ Login exitoso")
        print("="*60)
        
        return True
        
    except Exception as e:
        print(f"\n❌ ERROR INESPERADO: {str(e)}")
        return False
    finally:
        test.teardown()


def test_validaciones_negativas():
    """
    Test de validaciones: casos que DEBEN fallar
    """
    print("="*60)
    print("🧪 TEST DE VALIDACIONES NEGATIVAS")
    print("="*60)
    print("🌐 URL: https://exdigital.vercel.app")
    print("="*60)
    
    test = TestAuth()
    test.setup()
    
    casos_fallidos = 0
    casos_exitosos = 0
    
    try:
        # Test 1: Email inválido
        print("\n❌ Test 1: Email con dominio no permitido")
        test.driver.get(test.base_url)
        time.sleep(0.5)
        test.limpiar_sesion()
        time.sleep(0.5)
        if test.test_registro(
            nombre="Usuario Test",
            email="test@hotmail.com",
            password="Pass123",
            confirm_password="Pass123",
            resultado_esperado="error"
        ):
            casos_exitosos += 1
        else:
            casos_fallidos += 1
        
        time.sleep(1)
        
        # Test 2: Contraseña muy corta
        print("\n❌ Test 2: Contraseña muy corta")
        test.driver.get(test.base_url)
        time.sleep(0.5)
        test.limpiar_sesion()
        time.sleep(0.5)
        if test.test_registro(
            nombre="Usuario Test",
            email="test@duoc.cl",
            password="123",
            confirm_password="123",
            resultado_esperado="error"
        ):
            casos_exitosos += 1
        else:
            casos_fallidos += 1
        
        time.sleep(1)
        
        # Test 3: Contraseñas no coinciden
        print("\n❌ Test 3: Contraseñas no coinciden")
        test.driver.get(test.base_url)
        time.sleep(0.5)
        test.limpiar_sesion()
        time.sleep(0.5)
        if test.test_registro(
            nombre="Usuario Test",
            email="test@duoc.cl",
            password="Pass123",
            confirm_password="Pass456",
            resultado_esperado="error"
        ):
            casos_exitosos += 1
        else:
            casos_fallidos += 1
        
        time.sleep(1)
        
        # Test 4: Login con usuario inexistente
        print("\n❌ Test 4: Login con usuario no registrado")
        test.driver.get(test.base_url)
        time.sleep(0.5)
        test.limpiar_sesion()
        time.sleep(0.5)
        if test.test_login(
            email="noexiste@duoc.cl",
            password="Pass123",
            resultado_esperado="error"
        ):
            casos_exitosos += 1
        else:
            casos_fallidos += 1
        
        print("\n" + "="*60)
        print("📊 RESUMEN DE VALIDACIONES NEGATIVAS")
        print("="*60)
        print(f"Total de tests: {casos_exitosos + casos_fallidos}")
        print(f"✅ Exitosos: {casos_exitosos}")
        print(f"❌ Fallidos: {casos_fallidos}")
        print("="*60)
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
    finally:
        test.teardown()


if __name__ == "__main__":
    print("\n🚀 Selecciona el tipo de test a ejecutar:")
    print("1. Flujo completo (Registro + Login)")
    print("2. Validaciones negativas")
    print("3. Ambos")
    
    try:
        opcion = input("\nOpción (1-3): ").strip()
        
        if opcion == "1":
            test_flujo_completo()
        elif opcion == "2":
            test_validaciones_negativas()
        elif opcion == "3":
            test_flujo_completo()
            time.sleep(3)
            test_validaciones_negativas()
        else:
            print("❌ Opción inválida")
    except KeyboardInterrupt:
        print("\n\n⚠️  Tests cancelados por el usuario")
