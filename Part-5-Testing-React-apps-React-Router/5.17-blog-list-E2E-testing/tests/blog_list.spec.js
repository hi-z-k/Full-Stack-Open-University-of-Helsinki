import { test, expect, beforeEach, describe } from '@playwright/test';

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByRole('textbox', { name: 'username' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'password' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    })
    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByRole('textbox', { name: 'username' }).fill('mluukkai');
            await page.getByRole('textbox', { name: 'password' }).fill('salainen');
            await page.getByRole('button', { name: 'Login' }).click();
            await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible();
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByRole('textbox', { name: 'username' }).fill('mluukkai');
            await page.getByRole('textbox', { name: 'password' }).fill('wrongpassword');
            await page.getByRole('button', { name: 'Login' }).click();
            await expect(page.getByText('Login Failed: Request failed')).toBeVisible();
        })
    })

})
