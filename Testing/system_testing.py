from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import subprocess
from selenium.webdriver.chrome.service import Service
import pandas as pd
import csv
from selenium.webdriver.common.alert import Alert


# Start the server
# server_process = subprocess.Popen([r"C:\\Program Files\\nodejs\\npm.cmd", "start"])

# Wait a few seconds to ensure the server is fully started
time.sleep(5)  # Adjust as needed based on your server’s startup time

# Start the server process
# server_process = subprocess.Popen(["npm", "start"])

# Wait for the server to start
time.sleep(5)  # Adjust this based on the server's startup time

# Set up Selenium WebDriver (this example uses Chrome)
driver = webdriver.Chrome()

try:
    # Open the localhost URL
    driver.get("http://localhost:3000")
    driver.maximize_window()
    

    # Wait for an element on the page to load (to confirm successful navigation)
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.TAG_NAME, "body"))
    )
    print("Page title:", driver.title)
    time.sleep(2)
    
except Exception as e:
    print("An error occurred:", e)


# Load the CSV data
file_path = 'signup_data.csv'
signup_data = pd.read_csv(file_path)

##creating the new user

sign_Up = driver.find_element(By.XPATH,"//a[text()='SignUp']" )
sign_Up.click()

for index, row in signup_data.iterrows():
    try:
        # Fill out the form fields
        time.sleep(2)
        driver.find_element(By.NAME, "username").send_keys(row['username'])
        time.sleep(1)
        driver.find_element(By.NAME, "email").send_keys(row['email'])
        time.sleep(1)
        driver.find_element(By.NAME, "password").send_keys(row['password'])
        time.sleep(1)
        driver.find_element(By.NAME, "height").send_keys(str(row['height']))
        time.sleep(1)
        driver.find_element(By.NAME, "weight").send_keys(str(row['weight']))
        time.sleep(1)
        driver.find_element(By.NAME, "age").send_keys(str(row['age']))
        time.sleep(1)
        
        # Set dropdown or radio buttons for gender, activity level, etc.
        driver.find_element(By.NAME, "gender").send_keys(row['gender'])
        time.sleep(1)
        driver.find_element(By.NAME, "activityLevel").send_keys(row['activity_level'])
        time.sleep(1)
        driver.find_element(By.NAME, "goal").send_keys(row['goal'])
        time.sleep(1)
        # Submit the form
        submit_button = driver.find_element(By.XPATH, "//button[text()='Sign Up']")
        submit_button.click()
        time.sleep(2)

        # WebDriverWait(driver, 20).until(EC.alert_is_present())
        # alert = Alert(driver)
        # print(alert.text)
        # print(alert.accept())

    except(TimeoutError) :
        print("Logged In!")
    time.sleep(2)
    
    
    # time.sleep(3)

    driver.find_element(By.NAME, "username").send_keys(row['username'])
    time.sleep(1)

    driver.find_element(By.NAME, "password").send_keys(row['password'])
    time.sleep(2)

    ## check from here.. not getting clicked.
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Sign in']"))).click()
    #driver.find_element(By.XPATH, "//button[text()='Login']")
    time.sleep(2)

    # Sign_In_Msg=  driver.find_element(By.XPATH, "//h1[text()]").text
    # Exp_Msg = "Welcome to your Dashboard!"
    # assert(Sign_In_Msg, Exp_Msg)

    ## Landed on the Dashboard
    ##Add meal
    
    driver.find_element(By.XPATH, "//a[text()='Add Meal']").click()
    time.sleep(2) # wiats for the page to load and load all the necesary DOM elements

    ##Click on the ADD MEAL text filed to add the mean that I had for today
    add_Meal = driver.find_element(By.XPATH,"//textarea[@placeholder='ADD FOOD ITEM....']")
    time.sleep(3)
    add_Meal.click()
    time.sleep(2)
    add_Meal.send_keys("I had Pizza Today")
    time.sleep(2)

    ##Save the mean that is added
    driver.find_element(By.XPATH, "//button[text()= 'Save']").click()
    time.sleep(2)

    # WebDriverWait(driver, 10).until(EC.alert_is_present())
    # alert = Alert(driver)
    # print(alert.text)
    # print(alert.accept())
    # time.sleep(2)

    element = driver.find_element(By.XPATH, "//h3[text()='Pizza']")
    #driver.execute_script("arguments[0].scrollIntoView();", element)
    print("The meal added is:", element.text)

    ##Print  the deatils of the mean that has been added.
    # Loop through the details that gets generated with the meal name and then print it
    meal_details = driver.find_elements(By.XPATH, "//div[@class='mt-4']//tbody/tr")
    time.sleep(2)

    print("The length of the items:", len(meal_details))
    
   # Wait for the table to load
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, 'table.w-full.text-left.text-gray-700 tbody.divide-y.divide-gray-100'))
    )
    # Locate the table and retrieve all rows
    table = driver.find_element(By.CSS_SELECTOR, 'table.w-full.text-left.text-gray-700 tbody.divide-y.divide-gray-100')
    rows = table.find_elements(By.TAG_NAME, 'tr')

    # Dictionary to store key-value pairs
    data = {}

    # Iterate through each row to capture the label and corresponding value
    for row in rows:
        cells = row.find_elements(By.TAG_NAME, 'td')
    
         # Ensure there are exactly 2 <td> elements in the row (label and value)
        if len(cells) == 2:
            label = cells[0].text.strip()  # Get the label text
            value = cells[1].text.strip()  # Get the value text
            data[label] = value  # Store in the dictionary

    # Print the dictionary
    print(data)
    
##Keep this commented until the whole scripting is done

# Logout = driver.find_element(By.XPATH,"//button[text()='Logout']")
# time.sleep(5)

