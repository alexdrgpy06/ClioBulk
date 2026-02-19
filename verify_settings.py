from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:5199")

            # Click the settings button
            # It has aria-label="Toggle Settings"
            page.get_by_label("Toggle Settings").click()

            # Wait for the settings panel to appear
            # The panel has id="settings-panel"
            panel = page.locator("#settings-panel")
            panel.wait_for(state="visible")

            # Verify the sliders have the correct accessible names
            brightness_input = page.locator("#brightness-range")

            # Check attributes
            label_for = page.locator('label[for="brightness-range"]').get_attribute('for')
            input_id = brightness_input.get_attribute('id')
            aria_valuetext = brightness_input.get_attribute('aria-valuetext')

            print(f"Brightness Label 'for': {label_for}")
            print(f"Brightness Input 'id': {input_id}")
            print(f"Brightness Aria Value Text: {aria_valuetext}")

            # Take a screenshot
            page.screenshot(path="verification_settings.png")
            print("Screenshot saved to verification_settings.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
