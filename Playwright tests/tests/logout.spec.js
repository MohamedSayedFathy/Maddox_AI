import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test("logout user and check not loging in again", async ({page}) => {
    await page.addInitScript(() => {
        console.log('Setting localStorage before page load...');
        localStorage.setItem('token', 'dummy_token_12345');
      });
    await page.goto(process.env.BASE_URL)
    await page.getByRole("button", { name : "Logout"}).click()
    await expect(page).toHaveURL(process.env.BASE_URL+"login")

    await page.getByRole("button", {name: "Login"}).click()
    await expect (page).not.toHaveURL(process.env.BASE_URL)
})