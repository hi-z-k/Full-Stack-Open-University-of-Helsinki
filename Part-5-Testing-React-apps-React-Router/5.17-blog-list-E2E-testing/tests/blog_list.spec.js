import { test, expect, beforeEach, describe } from '@playwright/test';
import { createBlog, createSampleMultipleBlogs, loginWith, loginWithWait } from './helper';

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
        await expect(page.getByRole('textbox', { name: 'username' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'password' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    })
    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen')
            await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible();
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'mluukkai', 'wrongpassword')
            await expect(page.getByText('Login Failed: Request failed')).toBeVisible();
        })
    })
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen')
        })
        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, '1984', 'George Orwell', 'https://www.archive.org/details/1984-george-orwell')
            await expect(page.getByText('a new blog "1984" by George')).toBeVisible();
        })
    })
    describe('When there is a blog', () => {
        let blog
        beforeEach(async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen')
            await createBlog(page, '1984', 'George Orwell', 'https://www.archive.org/details/1984-george-orwell')
            blog = page.locator('.blog', { hasText: '1984' })
            await blog.getByRole('button', { name: 'view' }).click();
        })
        test('a blog can be liked', async ({ page }) => {
            await expect(blog.getByText('likes 0')).toBeVisible();
            await blog.getByRole('button', { name: 'like' }).click();
            await expect(blog.getByText('likes 1')).toBeVisible();
        })
        test('a blog can be removed', async ({ page }) => {
            await blog.getByRole('button', { name: 'like' }).click();
            page.once('dialog', async (dialog) => {
                await dialog.accept();
            });
            await blog.getByRole('button', { name: 'remove' }).click();
            await expect(page.locator('.blog', { hasText: '1984' })).toHaveCount(0);
        })
        test('only the user that created the blog can see its remove button', async ({ page }) => {
            await page.getByRole('button', { name: 'Logout' }).click();
            await loginWith(page, 'kilves', 'kallesecret')
            await expect(blog.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })
    })
    describe('When there are multiple blogs', () => {
        beforeEach(async ({ page, request }) => {
            await loginWithWait(page, 'mluukkai', 'salainen')
            await createSampleMultipleBlogs(page, request)
        })

        test('the blogs created are sorted in descending by their likes', async ({ page }) => {
            const blogs = await page.locator('.blog').all();
            let prevLike = Infinity;

            for (const blog of blogs) {
                await blog.getByRole('button', { name: 'view' }).click();
                const likeElement = blog.locator('span[class=".like"]');
                const like = await likeElement.textContent();
                const currLike = Number(like);
                expect(currLike).toBeLessThanOrEqual(prevLike);
                prevLike = currLike;
            }
        })
    })

})
