import { test, expect, APIRequestContext } from '@playwright/test';

test('Mock API response', async ({ page }) => {
    await page.route('**/api/users', async route => {
        const json = [{ id: 1, name: 'Mock User 1' }, { id: 2, name: 'Mock User 2' }];
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(json),
        });
    });


    await page.goto('https://example.com/users'); // Assume this page fetches users from /api/users

    // Assert that the mocked data is displayed on the page 
    await expect(page.getByText('Mock User 1')).toBeVisible();
    await expect(page.getByText('Mock User 2')).toBeVisible();
}); 

test.describe('API Tests', () => { 
  let apiContext: APIRequestContext; 
 
  test.beforeAll(async ({ playwright }) => { 
    apiContext = await playwright.request.newContext({ 
      baseURL: 'https://jsonplaceholder.typicode.com', 
      extraHTTPHeaders: { 
        'Accept': 'application/json', 
      }, 
    }); 
  }); 
 
  test.afterAll(async () => { 
    await apiContext.dispose(); 
  }); 
 
  test('should fetch a list of posts', async () => { 
    const response = await apiContext.get('/posts'); 
    expect(response.ok()).toBeTruthy(); 
    const posts = await response.json(); 
    expect(posts.length).toBeGreaterThan(0); 
    expect(posts[0]).toHaveProperty('userId'); 
    expect(posts[0]).toHaveProperty('id'); 
    expect(posts[0]).toHaveProperty('title'); 
  }); 
 
  test('should create a new post', async () => { 
    const newPost = { 
      title: 'Playwright Test Post', 
      body: 'This is a test post created via Playwright API.', 
      userId: 1, 
    }; 
    const response = await apiContext.post('/posts', { data: newPost }); 
    expect(response.status()).toBe(201); // 201 Created 
    const createdPost = await response.json(); 
    expect(createdPost.title).toBe(newPost.title); 
    expect(createdPost.body).toBe(newPost.body); 
    expect(createdPost.userId).toBe(newPost.userId); 
    expect(createdPost).toHaveProperty('id'); 
  }); 
});