from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import os
from datetime import datetime

# Generate a unique filename based on the current date and time
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
file_path = f"test_report_{timestamp}.txt"

# Open the report file in write mode
with open(file_path, 'w') as report_file:

    # Start Selenium WebDriver
    driver = webdriver.Chrome()

    # Set implicit wait
    driver.implicitly_wait(60)  # Implicit wait set to 10 seconds

    try:
        # Open the localhost URL
        driver.get("http://localhost:3000")
        driver.maximize_window()
        
        # Confirm page load
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        report_file.write(f"PASSED: Page loaded, title is '{driver.title}'\n")
        
    except Exception as e:
        report_file.write(f"ERROR: Failed to load page - {e}\n")

    # Load the CSV data
    signup_data = pd.read_csv(os.path.join(os.path.dirname(__file__), 'signup_data.csv'))

    # Create a new user for each row in signup_data
    sign_Up = driver.find_element(By.XPATH, "//a[text()='SignUp']")
    sign_Up.click()

    for index, row in signup_data.iterrows():
        try:
            # Fill out the sign-up form
            driver.find_element(By.NAME, "username").send_keys(row['username'])
            driver.find_element(By.NAME, "email").send_keys(row['email'])
            driver.find_element(By.NAME, "password").send_keys(row['password'])
            driver.find_element(By.NAME, "height").send_keys(str(row['height']))
            driver.find_element(By.NAME, "weight").send_keys(str(row['weight']))
            driver.find_element(By.NAME, "age").send_keys(str(row['age']))
            driver.find_element(By.NAME, "gender").send_keys(row['gender'])
            driver.find_element(By.NAME, "activityLevel").send_keys(row['activity_level'])
            driver.find_element(By.NAME, "goal").send_keys(row['goal'])

            # Submit the form
            driver.find_element(By.XPATH, "//button[text()='Sign Up']").click()
            report_file.write(f"PASSED: Sign up with user '{row['username']}'\n")

        except Exception as e:
            report_file.write(f"ERROR: Failed to sign up user '{row['username']}' - {e}\n")

        # Perform login
        try:
            driver.find_element(By.XPATH, "//h2[contains(text(),'Sign in to')]/following-sibling::form//input[@name='username']").send_keys(row['username'])
            driver.find_element(By.XPATH, "//h2[contains(text(),'Sign in to')]/following-sibling::form//input[@name='password']").send_keys(row['password'])
            WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//h2[contains(text(),'Sign in to')]/following-sibling::form//button[text()='Sign in']"))
            ).click()
            report_file.write(f"PASSED: Login with user '{row['username']}'\n")
        
        except Exception as e:
            report_file.write(f"ERROR: Login failed for user '{row['username']}' - {e}\n")

        # Adding a meal
        try:
            driver.find_element(By.XPATH, "//a[text()='Add Meal']").click()
            add_Meal = driver.find_element(By.XPATH, "//textarea[@placeholder='ADD FOOD ITEM....']")
            add_Meal.click()
            add_Meal.send_keys("I had Pizza Today")
            driver.find_element(By.XPATH, "//button[text()='Save']").click()
            report_file.write("PASSED: Added meal 'Pizza'\n")

            # Verify the meal is added
            element = driver.find_element(By.XPATH, "//h3[text()='Pizza']")
            report_file.write(f"VERIFIED: Meal added is '{element.text}'\n")

        except Exception as e:
            report_file.write(f"ERROR: Failed to add meal - {e}\n")

        # Generate a meal plan
        try:
            driver.find_element(By.XPATH, "//a[text()='Generate Plan']").click()
            driver.find_element(By.XPATH, "//div/label[text()='Days:']/following-sibling::input").clear()
            driver.find_element(By.XPATH, "//div/label[text()='Days:']/following-sibling::input").send_keys('2')
            driver.find_element(By.XPATH, "//div/label[contains(text(),'Cuisine')]/following-sibling::input").send_keys('Mexican')
            driver.find_element(By.XPATH, "//div/label[contains(text(),'Food Preference')]/following-sibling::input").send_keys('Vegetarian')
            driver.find_element(By.XPATH, "//div/label[contains(text(),'Allergies')]/following-sibling::input").send_keys('Fish, Nuts, Alcohol')
            driver.find_element(By.XPATH, "//button[text()='Generate']").click()
            
            meal_plan_days = driver.find_elements(By.XPATH, "//div[@class='meal-card']")
            if len(meal_plan_days) == 2:
                report_file.write("PASSED: Generated a 2-day meal plan\n")
            else:
                report_file.write("FAILED: Meal plan does not contain exactly 2 days\n")

        except Exception as e:
            report_file.write(f"ERROR: Failed to generate meal plan - {e}\n")
            
        # Profile
        try:
            driver.find_element(By.XPATH, "//img[@alt='profile']").click()
            driver.find_element(By.XPATH, "//button[text()='Edit']").click()
            driver.find_element(By.XPATH, "//input[@name='age']").clear()
            driver.find_element(By.XPATH, "//input[@name='age']").send_keys('29')
            driver.find_element(By.XPATH, "//button[text()='Save']").click()
            report_file.write(f"PASSED: Update user info of user '{row['username']}'\n")
        except Exception as e:
            report_file.write(f"ERROR: Failed to update user info of user '{row['username']}' - {e}\n")
        
        # Logout
        try:
            driver.find_element(By.XPATH, "//button[text()='Logout']").click()
            report_file.write(f"PASSED: Logged out user '{row['username']}'\n")
        except Exception as e:
            report_file.write(f"ERROR: Failed to logout user '{row['username']}' - {e}\n")

        
        