from playwright.sync_api import sync_playwright

def verify_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to app...")
        try:
            page.goto("http://localhost:5199", timeout=30000)
        except Exception as e:
            print(f"Failed to load page: {e}")
            browser.close()
            return

        print("Page loaded.")

        # 1. Check Settings Button
        settings_btn = page.locator('button[aria-label="Toggle Settings"]')
        # Wait for button to be attached
        settings_btn.wait_for(state="attached")

        if settings_btn.count() == 0:
            print("Settings button not found!")
        else:
            print("Found Settings button.")

            # Check aria-expanded (should be false initially)
            # Note: React renders boolean attributes as strings in DOM? Or maybe empty/absent if false?
            # Wait, in React `aria-expanded={false}` renders as `aria-expanded="false"`.
            aria_expanded = settings_btn.get_attribute("aria-expanded")
            print(f"Settings button aria-expanded (initial): {aria_expanded}")

            # Check aria-controls
            aria_controls = settings_btn.get_attribute("aria-controls")
            print(f"Settings button aria-controls: {aria_controls}")
            if aria_controls != "settings-panel":
                print("ERROR: aria-controls should be 'settings-panel'.")

            # Click to open settings
            print("Clicking Settings button...")
            settings_btn.click()

            # Wait for panel animation/render
            page.wait_for_timeout(1000)

            # Check aria-expanded (should be true now)
            aria_expanded_after = settings_btn.get_attribute("aria-expanded")
            print(f"Settings button aria-expanded (after click): {aria_expanded_after}")
            if aria_expanded_after != "true":
                print("ERROR: aria-expanded should be 'true' after click.")

        # 2. Check Settings Panel ID
        aside = page.locator('aside#settings-panel')
        try:
            aside.wait_for(state="visible", timeout=5000)
            print("Found aside with id='settings-panel'.")
        except:
            print("ERROR: Settings panel with id='settings-panel' not found or not visible.")

        # 3. Check Range Inputs
        inputs_to_check = [
            {"id": "brightness-input", "label": "Brightness"},
            {"id": "contrast-input", "label": "Contrast"},
            {"id": "saturation-input", "label": "Saturation"},
        ]

        for item in inputs_to_check:
            input_el = page.locator(f'input#{item["id"]}')
            if input_el.count() > 0:
                print(f"Found input with id='{item['id']}'.")

                # Check aria-valuetext
                aria_valuetext = input_el.get_attribute("aria-valuetext")
                print(f"Input {item['id']} aria-valuetext: {aria_valuetext}")
                if not aria_valuetext:
                    print(f"ERROR: Input {item['id']} missing aria-valuetext.")

                # Check Label association
                # Find label with for=id
                label = page.locator(f'label[for="{item["id"]}"]')
                if label.count() > 0:
                    print(f"Found label for='{item['id']}' with text: {label.inner_text()}")
                else:
                    print(f"ERROR: Label for='{item['id']}' not found.")
            else:
                print(f"ERROR: Input with id='{item['id']}' not found.")

        # Take screenshot
        page.screenshot(path="verification_screenshot.png")
        print("Screenshot saved to verification_screenshot.png")

        browser.close()

if __name__ == "__main__":
    verify_accessibility()
