from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:5199/")

    # Wait for the app to load
    page.wait_for_selector("text=ClioBulk")

    # Click the Settings button
    # Using aria-label as defined in the code
    page.click('button[aria-label="Toggle Settings"]')

    # Wait for the settings panel to appear
    page.wait_for_selector("#settings-panel")

    # Verify the warning message
    warning_text = "Brightness, Contrast, and Saturation adjustments are currently only available in the Native Desktop app."
    if page.is_visible(f"text={warning_text}"):
        print("Warning message is visible.")
    else:
        print("Warning message NOT visible.")

    # Verify inputs are disabled
    brightness_slider = page.locator("#brightness-slider")
    if brightness_slider.is_disabled():
        print("Brightness slider is disabled (Correct).")
    else:
        print("Brightness slider is enabled (Incorrect).")

    # Take a screenshot
    page.screenshot(path="verification_screenshot.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
