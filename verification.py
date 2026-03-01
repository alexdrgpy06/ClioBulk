from playwright.sync_api import sync_playwright, expect
import os

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Mock __TAURI__ so we don't try to use native file dialogs
        page.add_init_script("""
            window.__TAURI__ = undefined;
        """)

        print("Navigating to application...")
        page.goto("http://localhost:5199/")

        # Wait for the app to load
        expect(page.locator("text=ClioBulk")).to_be_visible()

        # We need to simulate the file processing to see the progress bar
        # Create a dummy image file
        with open("dummy.png", "wb") as f:
            f.write(b"dummy image content")

        # Find the file input that triggers the web worker path
        file_input = page.locator('input[type="file"]')

        print("Uploading dummy file...")
        file_input.set_input_files("dummy.png")

        # Expect to see the file card
        expect(page.locator("text=dummy.png")).to_be_visible()

        print("Starting process...")
        # Click the process button
        process_btn = page.locator("button:has-text('Process (1)')")
        process_btn.click()

        print("Taking screenshot of processing state...")
        # Take a screenshot right away, before it finishes
        page.screenshot(path="verification.png")

        # Also let's try to verify ARIA attribute if it exists
        progress_bar = page.locator("div[role='progressbar']")
        if progress_bar.is_visible():
            aria_valuenow = progress_bar.get_attribute("aria-valuenow")
            print(f"Progress Bar ARIA valuenow: {aria_valuenow}")

        browser.close()

        # Clean up dummy file
        if os.path.exists("dummy.png"):
            os.remove("dummy.png")

if __name__ == "__main__":
    run_test()
