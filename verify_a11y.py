from playwright.sync_api import sync_playwright

def verify_accessibility_attributes():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        try:
            print("Navigating to app...")
            page.goto("http://localhost:5199")

            # Wait for app to load
            page.wait_for_selector("h1:has-text('ClioBulk')")
            print("App loaded.")

            # Find and click Settings button
            settings_btn = page.locator("button[aria-label='Toggle Settings']")

            # Verify initial state (collapsed)
            expanded_state = settings_btn.get_attribute("aria-expanded")
            print(f"Initial aria-expanded: {expanded_state}")

            # Click to open settings
            print("Clicking Settings button...")
            settings_btn.click()

            # Verify expanded state
            expanded_state = settings_btn.get_attribute("aria-expanded")
            print(f"Post-click aria-expanded: {expanded_state}")
            if expanded_state != "true":
                print("FAIL: Settings should be expanded after click")

            # Wait for panel to appear
            panel = page.locator("#settings-panel")
            panel.wait_for(state="visible")
            print("Settings panel visible.")

            # Verify controls relationship
            controls_id = settings_btn.get_attribute("aria-controls")
            print(f"Button aria-controls: {controls_id}")
            if controls_id != "settings-panel":
                print("FAIL: Button does not control settings-panel")

            # Check Brightness Input
            brightness_input = page.locator("#brightness-input")
            # In React, htmlFor becomes 'for' attribute in the DOM
            brightness_label = page.locator("label[for='brightness-input']")
            brightness_valuetext = brightness_input.get_attribute("aria-valuetext")

            print(f"Brightness Input ID: {brightness_input.get_attribute('id')}")
            print(f"Brightness Label For: {brightness_label.get_attribute('for')}")
            print(f"Brightness ValueText: {brightness_valuetext}")

            if not brightness_input.is_visible(): print("FAIL: Brightness input not visible")
            if not brightness_label.is_visible(): print("FAIL: Brightness label not visible")
            if brightness_valuetext != "0%": print("FAIL: Brightness valuetext mismatch")

            # Check Contrast Input
            contrast_input = page.locator("#contrast-input")
            contrast_valuetext = contrast_input.get_attribute("aria-valuetext")
            print(f"Contrast ValueText: {contrast_valuetext}")
            if contrast_valuetext != "1.0x": print("FAIL: Contrast valuetext mismatch")

            # Check Saturation Input
            saturation_input = page.locator("#saturation-input")
            saturation_valuetext = saturation_input.get_attribute("aria-valuetext")
            print(f"Saturation ValueText: {saturation_valuetext}")
            if saturation_valuetext != "1.0x": print("FAIL: Saturation valuetext mismatch")

            # Take screenshot of open settings
            page.screenshot(path="settings_verification.png")
            print("Screenshot saved to settings_verification.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error_state.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_accessibility_attributes()
