import time
import pandas as pd

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

## Test de Registro Usuario testuser

def test_registro():
        driver = webdriver.Chrome()
        driver.get("https://exdigital.vercel.app/registro")
    
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "nombre"))
        )

        time.sleep(2)  

        # Rellenar el formulario de registro con los IDs correctos
        driver.find_element(By.ID, "nombre").send_keys("Test User")
        driver.find_element(By.ID, "email").send_keys("testuser@gmail.com")  # Dominio válido
        driver.find_element(By.ID, "password").send_keys("password123")
        driver.find_element(By.ID, "confirmPassword").send_keys("password123")
        driver.find_element(By.XPATH, "//button[@type='submit']").click()

        try:
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "//*[contains(text(), '¡Registro exitoso!')]"))
            )
            print("Registro exitoso: Test pasado")    
        except Exception as e:
            print(f"Registro fallido: Test no pasado - Error: {str(e)}")

        time.sleep(2)

        print("Cerrando el navegador...")
        driver.quit()

## Test de login Usuario testuser

def test_login():
        driver = webdriver.Chrome()
        driver.get("https://exdigital.vercel.app/login")

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "email"))
        )

        time.sleep(2)

        # Rellenar el formulario de login con los IDs correctos
        driver.find_element(By.ID, "email").send_keys("testuser@gmail.com")  # Email del test de registro
        driver.find_element(By.ID, "password").send_keys("password123")
        driver.find_element(By.XPATH, "//button[@type='submit']").click()

        try:
            # Esperar a que aparezca la notificación de éxito o redirección
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "//*[contains(text(), '¡Bienvenido de nuevo!')]"))
            )
            print("Login exitoso: Test pasado")
        except Exception as e:
            print(f"Login fallido: Test no pasado - Error: {str(e)}")
        
        time.sleep(2)
        
        print("Cerrando el navegador...")
        driver.quit()
