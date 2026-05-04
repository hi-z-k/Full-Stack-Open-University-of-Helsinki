import { test, expect, beforeEach, describe } from '@playwright/test';
import { createBlogRouted, loginWithRouted, createSampleMultipleBlogs, loginWithWait } from './helper';

describe.only('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })
        await request.post('/api/users', {
            data: {
                name: "Kalle Ilves",
                username: "kilves",
                password: "kallesecret"
            }
        })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await page.getByRole('link', { name: 'login' }).click()
        await expect(page.getByRole('textbox', { name: 'username' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'password' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    })
    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWithRouted(page, 'mluukkai', 'salainen')
            await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible();
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWithRouted(page, 'mluukkai', 'wrongpassword')
            await expect(page.getByText('Login Failed: Request failed')).toBeVisible();
        })
    })
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWithRouted(page, 'mluukkai', 'salainen')
        })
        test('a new blog can be created', async ({ page }) => {
            await createBlogRouted(page, '1984', 'George Orwell', 'https://www.archive.org/details/1984-george-orwell')
            await expect(page.getByRole('link', { name: '1984' })).toBeVisible();
        })
    })
    describe('When there is a blog', () => {
        beforeEach(async ({ page }) => {
            await loginWithRouted(page, 'mluukkai', 'salainen')
            await createBlogRouted(page, '1984', 'George Orwell', 'https://www.archive.org/details/1984-george-orwell')
            await page.getByRole('link', { name: '1984' }).click()
        })
        test('a blog can be liked', async ({ page }) => {
            await expect(page.getByText('likes 0')).toBeVisible();
            await page.getByRole('button', { name: 'like' }).click();
            await expect(page.getByText('likes 1')).toBeVisible();
        })
        test('a blog can be removed', async ({ page }) => {
            await page.getByRole('button', { name: 'like' }).click();
            page.once('dialog', async (dialog) => {
                await dialog.accept();
            });
            await page.getByRole('button', { name: 'remove' }).click();
            await expect(page.locator('.blog', { hasText: '1984' })).toHaveCount(0);
        })
        test('only the user that created the blog can see its remove button', async ({ page }) => {
            await page.getByRole('button', { name: 'Logout' }).click();
            await loginWithRouted(page, 'kilves', 'kallesecret')
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })
    })
    // describe('When there are multiple blogs', () => {
    //     beforeEach(async ({ page, request }) => {
    //         await page.getByRole('link', { name: 'login' }).click()
    //         await loginWithWait(page, 'mluukkai', 'salainen')
    //         await createSampleMultipleBlogs(page, request)
    //     })

        // test('the blogs created are sorted in descending by their likes', async ({ page }) => {
        //     const blogs = await page.locator('.blog').all();
        //     let prevLike = Infinity;

        //     for (const blog of blogs) {
        //         await blog.getByRole('button', { name: 'view' }).click();
        //         const likeElement = blog.locator('span[class=".like"]');
        //         const like = await likeElement.textContent();
        //         const currLike = Number(like);
        //         expect(currLike).toBeLessThanOrEqual(prevLike);
        //         prevLike = currLike;
        //     }
        // })
    // })

})
