"""
Test de Autenticación - Login y Registro
Pruebas automatizadas con Selenium para validar funcionalidad de login y registro
"""

import csv
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from config import BASE_URL, DEFAULT_TIMEOUT, HEADLESS_MODE, MAXIMIZE_WINDOW, ACTION_DELAY, TEST_DELAY, CLEANUP_DELAY

class TestAuth:
    def __init__(self, base_url=None):
        """
        Inicializar el test con la URL base de la aplicación
        Si no se especifica base_url, usa la URL de config.py
        """
        self.base_url = base_url if base_url else BASE_URL
        self.driver = None
        self.wait = None
        
    def setup(self):
        """
        Configurar el navegador Chrome
        """
        options = webdriver.ChromeOptions()
        if MAXIMIZE_WINDOW:
            options.add_argument('--start-maximized')
        options.add_argument('--disable-notifications')
        if HEADLESS_MODE:
            options.add_argument('--headless')
        
        self.driver = webdriver.Chrome(options=options)
        self.wait = WebDriverWait(self.driver, DEFAULT_TIMEOUT)
        print("[OK] Navegador iniciado correctamente")
        
    def teardown(self):
        """
        Cerrar el navegador
        """
        if self.driver:
            time.sleep(CLEANUP_DELAY)
            self.driver.quit()
            print("[OK] Navegador cerrado")
    
    def test_registro(self, nombre, email, password, confirm_password, resultado_esperado):
        """
        Test de registro de usuario
        
        Args:
            nombre: Nombre del usuario
            email: Email del usuario
            password: Contraseña
            confirm_password: Confirmación de contraseña
            resultado_esperado: 'exito' o 'error'
        """
        try:
            print(f"\n[TEST REGISTRO] {nombre} - {email}")
            
            # Intentar cerrar sesión si hay alguna activa (usando UI)
            try:
                self.driver.get(f"{self.base_url}/")
                time.sleep(1.5)
                self.cerrar_sesion_ui()
                time.sleep(1)  # Esperar a que el logout se complete
            except Exception as e:
                print(f"[WARN] Error al intentar cerrar sesión: {type(e).__name__}")
                # Intentar continuar de todos modos
            
            # Navegar a la página de registro
            self.driver.get(f"{self.base_url}/registro")
            time.sleep(ACTION_DELAY)
            
            # Llenar el formulario
            nombre_input = self.wait.until(
                EC.presence_of_element_located((By.ID, "nombre"))
            )
            nombre_input.clear()
            nombre_input.send_keys(nombre)
            
            email_input = self.driver.find_element(By.ID, "email")
            email_input.clear()
            email_input.send_keys(email)
            
            password_input = self.driver.find_element(By.ID, "password")
            password_input.clear()
            password_input.send_keys(password)
            
            confirm_input = self.driver.find_element(By.ID, "confirmPassword")
            confirm_input.clear()
            confirm_input.send_keys(confirm_password)
            
            # Clic en el botón de registro
            submit_button = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
            submit_button.click()
            
            time.sleep(3)  # Esperar más tiempo para la redirección
            
            # Verificar el resultado
            current_url = self.driver.current_url
            
            if resultado_esperado == "exito":
                # Debe redirigir a home (/) o login
                if current_url == f"{self.base_url}/" or "/" == current_url[-1]:
                    print(f"   [OK] EXITO: Usuario registrado correctamente (redirigió a home)")
                    return True
                elif "/login" in current_url:
                    print(f"   [OK] EXITO: Usuario registrado correctamente (redirigió a login)")
                    return True
                else:
                    # Verificar si hay algún mensaje de error o éxito
                    try:
                        page_text = self.driver.find_element(By.TAG_NAME, "body").text
                        if "ya está registrado" in page_text.lower() or "ya existe" in page_text.lower():
                            print(f"   [WARN] Usuario ya existe (test previo)")
                            return True
                        else:
                            print(f"   [ERROR] No redirigió correctamente. URL actual: {current_url}")
                            return False
                    except:
                        print(f"   [ERROR] No redirigió correctamente. URL actual: {current_url}")
                        return False
            else:
                # Debe permanecer en registro o mostrar error
                if "/registro" in current_url:
                    print(f"   [OK] EXITO: Validación correcta (error esperado)")
                    return True
                else:
                    print(f"   [WARN] Se registró cuando debía fallar")
                    return False
                    
        except TimeoutException:
            print(f"   [ERROR] TIMEOUT: Elemento no encontrado")
            return False
        except Exception as e:
            print(f"   [ERROR] {str(e)}")
            return False
    
    def test_login(self, email, password, resultado_esperado):
        """
        Test de inicio de sesión
        
        Args:
            email: Email del usuario
            password: Contraseña
            resultado_esperado: 'exito' o 'error'
        """
        try:
            print(f"\n[TEST LOGIN] {email}")
            
            # Intentar cerrar sesión si hay alguna activa (usando UI)
            try:
                self.driver.get(f"{self.base_url}/")
                time.sleep(1.5)
                self.cerrar_sesion_ui()
                time.sleep(1)  # Esperar a que el logout se complete
            except Exception as e:
                print(f"[WARN] Error al intentar cerrar sesión: {type(e).__name__}")
                # Intentar continuar de todos modos
            
            # Navegar a la página de login
            self.driver.get(f"{self.base_url}/login")
            time.sleep(ACTION_DELAY)
            
            # Llenar el formulario
            email_input = self.wait.until(
                EC.presence_of_element_located((By.ID, "email"))
            )
            email_input.clear()
            email_input.send_keys(email)
            
            password_input = self.driver.find_element(By.ID, "password")
            password_input.clear()
            password_input.send_keys(password)
            
            # Clic en el botón de login
            submit_button = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
            submit_button.click()
            
            time.sleep(3)  # Esperar más tiempo para la redirección
            
            # Verificar el resultado
            current_url = self.driver.current_url
            
            if resultado_esperado == "exito":
                # Debe redirigir a home
                if current_url == f"{self.base_url}/" or "/productos" in current_url:
                    print(f"   [OK] EXITO: Login correcto")
                    return True
                else:
                    print(f"   [ERROR] No redirigió correctamente. URL: {current_url}")
                    return False
            else:
                # Debe permanecer en login o mostrar error
                if "/login" in current_url:
                    print(f"   [OK] EXITO: Validación correcta (error esperado)")
                    return True
                else:
                    print(f"   [WARN] Login exitoso cuando debía fallar")
                    return False
                    
        except TimeoutException:
            print(f"   [ERROR] TIMEOUT: Elemento no encontrado")
            return False
        except Exception as e:
            print(f"   [ERROR] {str(e)}")
            return False
    
    def cerrar_sesion_ui(self):
        """
        Cerrar sesión usando el botón de logout en el navbar
        Simula el comportamiento real de un usuario
        """
        try:
            # Verificar primero si el navegador está activo
            try:
                current_url = self.driver.current_url
            except Exception as e:
                print(f"[WARN] Navegador no disponible: {type(e).__name__}")
                return False
            
            # Buscar el botón del usuario en el navbar
            # Selector específico basado en las clases exactas del botón de usuario
            # El botón tiene: "flex items-center space-x-2" + "bg-stone-800/50" + "backdrop-blur-sm"
            user_button = WebDriverWait(self.driver, 3).until(
                EC.presence_of_element_located((By.XPATH, "//button[contains(@class, 'flex items-center space-x-2') and contains(@class, 'bg-stone-800/50') and contains(@class, 'backdrop-blur-sm') and contains(@class, 'border-stone-700')]"))
            )
            
            print(f"   [INFO] Botón de usuario encontrado, haciendo clic...")
            user_button.click()
            time.sleep(0.5)
            
            # Hacer clic en el botón de "Cerrar Sesión"
            logout_button = WebDriverWait(self.driver, 2).until(
                EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Cerrar Sesión')]"))
            )
            logout_button.click()
            time.sleep(1)
            print("[INFO] Sesión cerrada mediante UI")
            return True
        except TimeoutException:
            print("[INFO] No hay sesión activa para cerrar")
            return False
        except Exception as e:
            print(f"[INFO] No hay sesión activa para cerrar ({type(e).__name__})")
            return False
    
    def limpiar_sesion(self):
        """
        Limpiar solo la sesión activa, manteniendo usuarios registrados
        """
        try:
            # Solo limpiar si estamos en una página válida
            if self.driver.current_url and not self.driver.current_url.startswith('data:'):
                # Solo eliminar el usuario actual, no todos los usuarios
                self.driver.execute_script("""
                    localStorage.removeItem('usuario');
                """)
                print("[INFO] Sesión limpiada (localStorage)")
        except Exception as e:
            # No mostrar error si no se puede acceder a localStorage
            pass
    
    def limpiar_localStorage(self):
        """
        Limpiar TODO el localStorage (solo usar al inicio de la suite)
        """
        try:
            # Solo limpiar si estamos en una página válida
            if self.driver.current_url and not self.driver.current_url.startswith('data:'):
                self.driver.execute_script("localStorage.clear();")
                print("[INFO] localStorage completamente limpiado")
        except Exception as e:
            # No mostrar error si no se puede acceder a localStorage
            pass


def ejecutar_tests_desde_csv(csv_file):
    """
    Ejecutar todos los tests desde un archivo CSV
    
    Args:
        csv_file: Ruta al archivo CSV con los casos de prueba
    """
    test = TestAuth()
    test.setup()
    
    resultados = {
        "total": 0,
        "exitosos": 0,
        "fallidos": 0
    }
    
    try:
        # Limpiar TODO al inicio de la suite
        test.driver.get(test.base_url)
        time.sleep(1)
        test.limpiar_localStorage()
        
        with open(csv_file, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            
            for row in reader:
                tipo_test = row['tipo_test'].strip().lower()
                resultados["total"] += 1
                
                # Verificar si el navegador sigue activo
                try:
                    _ = test.driver.current_url
                except Exception as e:
                    print(f"\n[WARN] Navegador cerrado inesperadamente. Reiniciando...")
                    test.teardown()
                    test.setup()
                    test.driver.get(test.base_url)
                    time.sleep(1)
                    test.limpiar_localStorage()
                
                # Nota: cerrar_sesion_ui() ya se llama dentro de test_registro() y test_login()
                # No necesitamos hacerlo aquí
                
                try:
                    if tipo_test == 'registro':
                        resultado = test.test_registro(
                            nombre=row['nombre'],
                            email=row['email'],
                            password=row['password'],
                            confirm_password=row['confirm_password'],
                            resultado_esperado=row['resultado_esperado']
                        )
                    elif tipo_test == 'login':
                        resultado = test.test_login(
                            email=row['email'],
                            password=row['password'],
                            resultado_esperado=row['resultado_esperado']
                        )
                    else:
                        print(f"[WARN] Tipo de test desconocido: {tipo_test}")
                        resultado = False
                except Exception as e:
                    print(f"   [ERROR] ERROR CRITICO: {type(e).__name__}: {str(e)[:100]}")
                    resultado = False
                
                if resultado:
                    resultados["exitosos"] += 1
                else:
                    resultados["fallidos"] += 1
                
                time.sleep(TEST_DELAY)
        
        # Mostrar resumen
        print("\n" + "="*60)
        print("RESUMEN DE TESTS")
        print("="*60)
        print(f"Total de tests: {resultados['total']}")
        print(f"[OK] Exitosos: {resultados['exitosos']}")
        print(f"[ERROR] Fallidos: {resultados['fallidos']}")
        print(f"Porcentaje de éxito: {(resultados['exitosos']/resultados['total']*100):.1f}%")
        print("="*60)
        
    except FileNotFoundError:
        print(f"[ERROR] No se encontró el archivo {csv_file}")
    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        test.teardown()


if __name__ == "__main__":
    print("="*60)
    print("SUITE DE TESTS - AUTENTICACION")
    print("="*60)
    print(f"Testeando aplicación en:")
    print(f"   {BASE_URL}")
    print("\nPara cambiar la URL, edita config.py")
    print("\nIniciando tests en 3 segundos...")
    time.sleep(3)
    
    # Ejecutar tests desde CSV
    ejecutar_tests_desde_csv('usuarios_test.csv')
