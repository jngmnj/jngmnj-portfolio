'use client';

import { useEffect, useRef, useState } from 'react';

type Contact = {
  id: string;
  name: string;
  company: string;
  email: string;
  title: string;
  content: string;
  createdAt: string | null;
};
const button =
  'min-h-11 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-sky-500 disabled:opacity-40';
const date = (value: string | null) =>
  value
    ? new Date(value).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
    : '날짜 없음';

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [request, setRequest] = useState({ cursor: '', revision: 0 });
  const detailRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(
      `/api/admin/contacts${request.cursor ? `?cursor=${encodeURIComponent(request.cursor)}` : ''}`,
      { cache: 'no-store', signal: controller.signal }
    )
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || '문의를 불러오지 못했습니다.');
        if (!Array.isArray(data.contacts))
          throw new Error('잘못된 응답입니다.');
        setContacts((previous) =>
          request.cursor
            ? [
                ...previous,
                ...data.contacts.filter(
                  (row: Contact) => !previous.some((item) => item.id === row.id)
                ),
              ]
            : data.contacts
        );
        setNextCursor(data.nextCursor);
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          setError(
            error instanceof Error
              ? error.message
              : '문의를 불러오지 못했습니다.'
          );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [request]);

  function load(cursor = '') {
    setLoading(true);
    setError('');
    if (!cursor) setSelected(null);
    setRequest((previous) => ({ cursor, revision: previous.revision + 1 }));
  }

  useEffect(() => {
    if (selected) {
      detailRef.current?.focus();
      detailRef.current?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selected]);

  return (
    <main className="mx-auto max-w-6xl p-5 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">문의 조회</h1>
          <p className="mt-2 text-sm text-gray-500">
            최근 문의부터 25개씩 표시합니다. 항목을 선택하면 전체 내용을 확인할
            수 있습니다.
          </p>
        </div>
        <button className={button} disabled={loading} onClick={() => load()}>
          새로고침
        </button>
      </div>
      {error && (
        <div
          role="alert"
          className="mb-5 rounded-2xl bg-red-50 p-4 text-sm text-red-800"
        >
          {error}
          <button
            className={`${button} ml-3`}
            disabled={loading}
            onClick={() => load(request.cursor)}
          >
            다시 시도
          </button>
        </div>
      )}
      <p role="status" className="mb-4 text-sm text-gray-500">
        {loading ? '불러오는 중…' : `${contacts.length}개 문의 조회됨`}
      </p>
      {!loading && !error && !contacts.length && (
        <p className="rounded-2xl bg-gray-50 p-8 text-center text-gray-500">
          아직 접수된 문의가 없습니다.
        </p>
      )}
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <section aria-label="문의 목록" className="min-w-0 space-y-3">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              type="button"
              aria-pressed={selected?.id === contact.id}
              onClick={() => setSelected(contact)}
              className={`block w-full rounded-2xl border p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-sky-500 ${selected?.id === contact.id ? 'border-sky-300 bg-sky-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
            >
              <span className="mb-2 block text-xs text-gray-500">
                {date(contact.createdAt)}
              </span>
              <span className="mb-2 line-clamp-2 block font-semibold [overflow-wrap:anywhere] break-keep text-gray-950">
                {contact.title || '제목 없음'}
              </span>
              <span className="block text-sm [overflow-wrap:anywhere] break-keep text-gray-600">
                {contact.name || '이름 없음'}
                {contact.company ? ` · ${contact.company}` : ''}
              </span>
              <span className="mt-1 block truncate text-sm text-gray-500">
                {contact.email}
              </span>
            </button>
          ))}
          {nextCursor && (
            <button
              className={`${button} w-full`}
              disabled={loading}
              onClick={() => load(nextCursor)}
            >
              더 불러오기
            </button>
          )}
        </section>
        <section
          ref={detailRef}
          tabIndex={-1}
          aria-label="문의 상세"
          className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 outline-none sm:p-6 lg:sticky lg:top-6"
        >
          {selected ? (
            <>
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">문의 상세</h2>
                <button className={button} onClick={() => setSelected(null)}>
                  닫기
                </button>
              </div>
              <h3 className="mb-5 text-xl font-semibold [overflow-wrap:anywhere] break-keep">
                {selected.title || '제목 없음'}
              </h3>
              <dl className="mb-6 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3 text-sm">
                <dt className="text-gray-500">작성자</dt>
                <dd className="[overflow-wrap:anywhere] break-keep">
                  {selected.name || '—'}
                </dd>
                <dt className="text-gray-500">회사</dt>
                <dd className="[overflow-wrap:anywhere] break-keep">
                  {selected.company || '—'}
                </dd>
                <dt className="text-gray-500">이메일</dt>
                <dd className="[overflow-wrap:anywhere]">
                  {selected.email || '—'}
                </dd>
                <dt className="text-gray-500">접수일</dt>
                <dd>{date(selected.createdAt)}</dd>
              </dl>
              <p className="rounded-xl bg-gray-50 p-4 text-sm leading-7 [overflow-wrap:anywhere] break-keep whitespace-pre-wrap text-gray-700">
                {selected.content || '내용 없음'}
              </p>
            </>
          ) : (
            <p className="py-8 text-center text-sm text-gray-500">
              목록에서 문의를 선택해주세요.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
