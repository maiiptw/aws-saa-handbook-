from playwright.sync_api import sync_playwright
import time
import os

os.makedirs('/home/jules/verification/screenshots', exist_ok=True)

def run_test(page):
    page.goto("http://localhost:4321/en/modules/02-compute-scaling-and-load-balancing")
    page.wait_for_timeout(2000)
    page.evaluate("document.getElementById('interactive-simulation').scrollIntoView()")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/alb_sim_before.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        run_test(page)
        browser.close()
