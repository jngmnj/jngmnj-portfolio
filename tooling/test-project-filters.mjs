import assert from 'node:assert/strict';
import { chromium } from 'playwright';

// Run against a local Next server with a nonempty project collection.
const base = process.env.PROJECT_TEST_URL ?? 'http://localhost:3100';
const browser = await chromium.launch();
const page = await browser.newPage();
const query = () => new URL(page.url()).searchParams;
const search = page.getByRole('searchbox');
const requests = [];
page.on('request', (request) => {
  if (request.url().includes('/api/projects/search?')) requests.push(new URL(request.url()));
});
async function ready() {
  const toggle = page.getByRole('button', { name: /검색·필터|Search and filters/ });
  await toggle.waitFor();
  assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
  await toggle.click();
  await search.waitFor();
}
try {
  await page.goto(`${base}/ko/projects?source=e2e`);
  await ready();
  const category = await page.locator('#project-category option').nth(1).getAttribute('value');
  await page.locator('#project-category').selectOption(category);
  await page.locator('#project-sort').selectOption('name');
  await page.goBack();
  await page.waitForFunction(() => document.querySelector('#project-sort')?.value === 'latest');
  await page.goForward();
  await page.waitForFunction(() => document.querySelector('#project-sort')?.value === 'name');
  await search.fill('no-match-e2e-93826');
  await page.getByRole('heading', { name: '조건에 맞는 프로젝트가 없습니다' }).waitFor();
  assert.ok(requests.some((url) => url.searchParams.get('q') === 'no-match-e2e-93826' && url.searchParams.get('category') === category && url.searchParams.get('sort') === 'name'));
  await page.reload();
  await ready();
  assert.equal(await search.inputValue(), 'no-match-e2e-93826');
  await page.getByRole('button', { name: '초기화' }).click();
  await page.waitForFunction(() => !new URLSearchParams(location.search).has('q'));
  assert.equal(query().get('sort'), 'name');
  assert.equal(query().get('source'), 'e2e');
  await search.dispatchEvent('compositionstart');
  await search.evaluate((element) => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(element, '포트');
    element.dispatchEvent(new InputEvent('input', { bubbles: true, isComposing: true }));
  });
  assert.equal(query().has('q'), false);
  await search.dispatchEvent('compositionend', { data: '포트' });
  await page.waitForFunction(() => new URLSearchParams(location.search).get('q') === '포트');
  await page.getByRole('button', { name: '초기화' }).click();
  await page.getByRole('button', { name: /자세히 보기$/ }).first().click();
  await page.getByRole('dialog').waitFor();
  const id = query().get('id');
  assert.ok(id);
  await page.goBack();
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  await page.goForward();
  await page.getByRole('dialog').waitFor();
  await page.getByRole('button', { name: '모달 닫기' }).click();
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  assert.equal(query().get('sort'), 'name');
  assert.equal(query().get('source'), 'e2e');
  await page.goto(`${base}/ko/projects?q=no-match-e2e&id=${encodeURIComponent(id)}`);
  await page.getByRole('dialog').waitFor();
  await page.getByRole('button', { name: '모달 닫기' }).click();
  await page.getByRole('heading', { name: '조건에 맞는 프로젝트가 없습니다' }).waitFor();
  await page.route('**/api/projects/search?**', (route) => route.fulfill({ status: 500, json: { error: 'test failure' } }));
  await ready();
  await search.fill('failure-test');
  await page.getByRole('alert').filter({ hasText: '프로젝트를 불러오지 못했습니다.' }).waitFor();
  await page.unroute('**/api/projects/search?**');
  await page.getByRole('button', { name: '다시 시도' }).click();
  await page.getByRole('heading', { name: '조건에 맞는 프로젝트가 없습니다' }).waitFor();
  for (const locale of ['ko', 'en']) {
    await page.goto(`${base}/${locale}/projects`);
    await ready();
    for (const width of [375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${locale} overflow at ${width}`);
    }
  }
  process.stdout.write('PASS: URL reload/history, IME, reset, modal/deep link, ko/en × 3 viewports\n');
} finally {
  await browser.close();
}
