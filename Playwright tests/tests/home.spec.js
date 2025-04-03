import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
test("Navigating to home page directly without tokens", async ({page}) => {
    await page.goto(process.env.BASE_URL)
    await expect(page).toHaveURL(process.env.BASE_URL+"login")
})

test("Navigating to home page directly with tokens", async({page}) => {
    
    await page.addInitScript(() => {
        console.log('Setting localStorage before page load...');
        localStorage.setItem('token', 'dummy_token_12345');
      });
    await page.goto(process.env.BASE_URL)
    await expect(page.getByRole("heading", {name: "Home"})).toBeVisible()
})

test("test adding to counter", async({page}) => {
    await page.addInitScript(() => {
        console.log('Setting localStorage before page load...');
        localStorage.setItem('token', 'dummy_token_12345');
      });
    await page.goto(process.env.BASE_URL)
    await page.getByRole("button", {name : "+"}).click()
    await expect(page.locator('p[style*="font-size: 24px"]')).toHaveText("1");
    await page.getByRole("button", {name : "+"}).click()
    await expect(page.locator('p[style*="font-size: 24px"]')).toHaveText("2");

})

test("test subtracting from counter", async({page}) => {
    await page.addInitScript(() => {
            console.log('Setting localStorage before page load...');
            localStorage.setItem('token', 'dummy_token_12345');
          });
    await page.goto(process.env.BASE_URL)
    await page.getByRole("button", {name : "-"}).click()
    await expect(page.locator('p[style*="font-size: 24px"]')).toHaveText("-1");
    await page.getByRole("button", {name : "-"}).click()
    await expect(page.locator('p[style*="font-size: 24px"]')).toHaveText("-2");
})

test("test reseting from counter", async({page}) => {
    await page.addInitScript(() => {
        console.log('Setting localStorage before page load...');
        localStorage.setItem('token', 'dummy_token_12345');
      });
    await page.goto(process.env.BASE_URL)
    await page.getByRole("button", {name : "-"}).click()
    await page.getByRole("button", {name : "Reset"}).click()
    await expect(page.locator('p[style*="font-size: 24px"]')).toHaveText("0");
})

