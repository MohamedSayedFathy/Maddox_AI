// @ts-check
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
test.beforeEach( async ( {page}) => {
  await page.goto(process.env.BASE_URL+"/login")  
})

test("Login with incorrect username and password", async ({page})=> {
    
    await page.locator("#email-input").fill("Mohamed@gmail.com")
    await page.locator("#password-input").fill("password")
    await page.getByRole("button", {name: "Login"}).click()
    await expect (page.getByText("Invalid email or password. Try again.")).toBeVisible()

})

test("Login with corect username and password", async ({page})=> {
    
    await page.locator("#email-input").fill("test@maddox123.ai")
    await page.locator("#password-input").fill("supersecure")
    await page.getByRole("button", {name: "Login"}).click()
    await expect (page).toHaveURL(`${process.env.BASE_URL}`)
})