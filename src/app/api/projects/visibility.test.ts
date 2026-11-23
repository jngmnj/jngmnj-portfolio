import { beforeEach, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const store = vi.hoisted(() => ({ data: {} as Record<string, unknown> }));
vi.mock('@/lib/firebaseAdmin', () => ({
  getAdminAuth: () => ({ verifySessionCookie: async () => ({ admin: true }) }),
  getAdminDb: () => ({
    collection: () => ({
      add: async (data: Record<string, unknown>) => {
        store.data = data;
        return { id: 'test-project' };
      },
      doc: () => ({ update: async (data: Record<string, unknown>) => {
        store.data = { ...store.data, ...data };
      } }),
      get: async () => ({ docs: [{ id: 'test-project', data: () => store.data }] }),
    }),
  }),
}));

import { POST } from './create/route';
import { PUT } from './[id]/route';
import { GET } from '../admin/projects/route';

function request(visibility?: string) {
  const form = new FormData();
  form.set('title', 'Test project');
  if (visibility !== undefined) form.set('isPublic', visibility);
  return new NextRequest('http://localhost/api/projects/test-project', {
    method: 'POST', body: form,
  });
}
beforeEach(() => { store.data = {}; });

it('defaults new projects to public and reads back both visibility states', async () => {
  expect((await POST(request())).status).toBe(200);
  expect(store.data.isPublic).toBe(true);
  for (const visibility of ['false', 'true']) {
    expect((await PUT(request(visibility), { params: Promise.resolve({ id: 'test-project' }) })).status).toBe(200);
    const result = await GET(new NextRequest('http://localhost/api/admin/projects', {
      headers: { cookie: 'admin_session=test-only' },
    }));
    expect(result.status).toBe(200);
    expect((await result.json())[0].isPublic).toBe(visibility === 'true');
  }
});

it('preserves private visibility when an older editor omits the field', async () => {
  store.data = { isPublic: false };
  expect((await PUT(request(), { params: Promise.resolve({ id: 'test-project' }) })).status).toBe(200);
  expect(store.data.isPublic).toBe(false);
});

it('rejects invalid visibility without saving', async () => {
  expect((await POST(request('invalid'))).status).toBe(400);
  expect((await PUT(request('invalid'), { params: Promise.resolve({ id: 'test-project' }) })).status).toBe(400);
  expect(store.data).toEqual({});
});
