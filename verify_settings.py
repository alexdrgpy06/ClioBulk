import os
import time
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Retry connection a few times
    for i in range(10):
        try:
            page.goto("http://localhost:5199")
            break
        except Exception as e:
            print(f"Waiting for server... ({i})")
            time.sleep(1)
    else:
        print("Failed to connect to server")
        browser.close()
        return

    print("Connected to server")

    # Wait for the app to load
    page.wait_for_selector("text=ClioBulk")

    # Take screenshot of initial state
    os.makedirs("verification", exist_ok=True)
    page.screenshot(path="verification/initial.png")
    print("Initial screenshot taken")

    # Click Settings button
    # It has aria-label="Toggle Settings"
    page.click('button[aria-label="Toggle Settings"]')

    # Wait for settings panel animation
    time.sleep(1)

    # Check for Presets
    page.wait_for_selector("text=Vivid")
    print("Presets found")

    # Check for sliders
    # Input type range
    slider = page.wait_for_selector('input[type="range"]')
    if slider:
        print("Slider found")

    # Take screenshot of settings open
    page.screenshot(path="verification/settings_open.png")
    print("Settings screenshot taken")

    browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
