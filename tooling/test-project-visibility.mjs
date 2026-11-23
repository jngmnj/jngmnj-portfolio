import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.PROJECT_TEST_URL ?? 'http://localhost:3106';
const browser = await chromium.launch();
const page = await browser.newPage();
try {
  const response = await page.request.get(`${base}/api/projects`);
  assert.equal(response.status(), 200);
  const projects = await response.json();
  assert.equal(projects.length, 8);
  assert.ok(projects.every(project => project.isPublic === true));
  await page.addInitScript(() => {
    window.visibilityCounts = [];
    new MutationObserver(() => {
      const count = [...document.querySelectorAll('[role="button"]')]
        .filter(element => element.querySelector('h3')).length;
      window.visibilityCounts.push(count);
    }).observe(document, { childList: true, subtree: true });
  });
  const cards = page.locator('[role="button"]').filter({ has: page.locator('h3') });
  async function checkList() {
    await page.waitForFunction(() => [...document.querySelectorAll('[role="button"]')]
      .filter(element => element.querySelector('h3')).length === 8);
    await page.waitForTimeout(1000);
    assert.equal(await cards.count(), 8);
    assert.ok((await page.evaluate(() => window.visibilityCounts)).every(count => count <= 8));
  }
  for (const locale of ['ko', 'en']) {
    await page.goto(`${base}/${locale}/projects`);
    await checkList();
    await page.reload();
    await checkList();
    await cards.first().click();
    await page.getByRole('dialog').waitFor();
    await page.goBack();
    await page.getByRole('dialog').waitFor({ state: 'hidden' });
    await checkList();
    await page.goForward();
    await page.getByRole('dialog').waitFor();
    await page.keyboard.press('Escape');
    await checkList();
  }
  process.stdout.write('PASS: ko/en first render, reload, modal history never shows a ninth card\n');

  // Only the local admin UI is exercised here. Every project API write is
  // intercepted; production documents and authentication are never changed.
  assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname));
  let fixture = {
    ...projects[0], id: 'visibility-test', isPublic: false,
    githubUrl: 'https://github.com/example/visibility-test',
    liveUrl: 'https://example.com',
  };
  const saved = [];
  await page.context().addCookies([{ name: 'admin_session', value: 'test-only', url: base }]);
  await page.route('**/api/admin/projects', route => route.fulfill({ json: [fixture] }));
  await page.route('**/api/projects/**', async route => {
    assert.equal(route.request().method(), 'PUT');
    assert.equal(new URL(route.request().url()).pathname, '/api/projects/visibility-test');
    const req = route.request();
    const form = await new Response(req.postDataBuffer(), {
      headers: { 'content-type': req.headers()['content-type'] },
    }).formData();
    fixture = { ...fixture, isPublic: form.get('isPublic') === 'true' };
    saved.push(fixture.isPublic);
    await route.fulfill({ json: { id: fixture.id } });
  });
  await page.goto(`${base}/ko/admin/projects`);
  for (const nextValue of [true, false]) {
    await page.getByRole('button', { name: '수정', exact: true }).click();
    const checkbox = page.getByRole('checkbox', { name: '프로젝트 공개' });
    assert.equal(await checkbox.isChecked(), !nextValue);
    await checkbox.setChecked(nextValue);
    for (const width of [375, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    }
    await page.getByRole('button', { name: '수정', exact: true }).click();
    await page.getByText('프로젝트를 수정했습니다.', { exact: true }).waitFor();
  }
  assert.deepEqual(saved, [true, false]);
  await page.getByRole('button', { name: '수정', exact: true }).click();
  assert.equal(await page.getByRole('checkbox', { name: '프로젝트 공개' }).isChecked(), false);
  process.stdout.write('PASS: admin checkbox saves true/false and reads back; mocked writes only; 375/1440px no overflow\n');
} finally {
  await browser.close();
}
