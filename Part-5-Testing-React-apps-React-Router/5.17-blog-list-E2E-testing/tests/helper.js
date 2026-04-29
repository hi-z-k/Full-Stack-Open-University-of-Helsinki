const loginWith = async (page, username, password) => {
    await page.getByRole('textbox', { name: 'username' }).fill(username);
    await page.getByRole('textbox', { name: 'password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
}


const createBlog = async (page, title, author, url) => {
    const responsePromise = page.waitForResponse(
        res => res.url().includes('/api/blogs') && res.status() === 201
    );

    await page.getByRole('button', { name: 'create new blog' }).click();
    await page.getByRole('textbox', { name: 'title' }).fill(title);
    await page.getByRole('textbox', { name: 'author' }).fill(author);
    await page.getByRole('textbox', { name: 'url' }).fill(url);
    await page.getByRole('button', { name: 'Create' }).click();
    await page.locator('.blog', { hasText: title }).waitFor();

    const { id } = await (await responsePromise).json();
    return id
}


export { loginWith, createBlog }