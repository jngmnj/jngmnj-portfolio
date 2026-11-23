import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const base = process.env.PROJECT_TEST_URL ?? 'http://localhost:3000';
const cards = page
  .locator('[role="button"]')
  .filter({ has: page.locator('h3') });
let listRequests = 0;
let detailRequests = 0;
try {
  await page.goto(`${base}/en/projects`);
  await cards.first().waitFor();
  await page.waitForTimeout(1200);
  await page.route('**/api/projects/search?**', async (route) => {
    listRequests++;
    await new Promise((resolve) => setTimeout(resolve, 700));
    await route.continue();
  });
  await page.route('**/api/projects/detail?**', async (route) => {
    detailRequests++;
    await new Promise((resolve) => setTimeout(resolve, 700));
    await route.continue();
  });
  const before = await cards.count();
  await cards.first().click();
  await page.getByRole('dialog').first().waitFor();
  const id = new URL(page.url()).searchParams.get('id');
  assert.ok(id);
  await page.waitForTimeout(1000);
  assert.equal(await cards.count(), before);
  assert.equal(listRequests, 0);
  assert.equal(detailRequests, 0);
  await page.goBack();
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  await page.goForward();
  await page.getByRole('dialog').first().waitFor();
  await page.keyboard.press('Escape');
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  await page.waitForTimeout(500);
  assert.equal(listRequests, 0);
  assert.equal(await cards.count(), before);
  await page.evaluate(() =>
    history.pushState(null, '', '?q=nonexistent-project-116')
  );
  await page.getByRole('heading', { name: 'No projects match your search' }).waitFor();
  const priorRequests = listRequests;
  await page.evaluate(
    (projectId) =>
      history.pushState(null, '', `?q=nonexistent-project-116&id=${projectId}`),
    id
  );
  await page.getByText('Loading project details', { exact: false }).waitFor();
  await page.getByRole('dialog').first().waitFor();
  assert.equal(listRequests, priorRequests);
  assert.equal(detailRequests, 1);
  process.stdout.write(
    'PASS: modal open/close/history preserve cards without list requests; filtered detail uses independent request\n'
  );
} finally {
  await browser.close();
}

