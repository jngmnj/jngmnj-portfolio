'use client';

import { useEffect, useState } from 'react';
import {
  AboutContent,
  aboutTabNames,
  isAboutContent,
} from '@/data/aboutContent';
import { icons, type AboutTab } from '@/data/MyData';

type Row = AboutTab['content'][number];
const button =
  'min-h-11 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500';
const input =
  'min-h-11 w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:outline-sky-500';

export default function AdminAboutPage() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [locale, setLocale] = useState<'ko' | 'en'>('ko');
  const [tabIndex, setTabIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [dirty, setDirty] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/about', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || !isAboutContent(data.content)) throw Error();
        setContent(data.content);
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setMessage('소개 정보를 불러오지 못했습니다. 다시 시도해주세요.');
      });
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const tab = content?.[locale][tabIndex];
  function changeTab(next: AboutTab) {
    if (!content) return;
    setContent({
      ...content,
      [locale]: content[locale].map((item, index) =>
        index === tabIndex ? next : item
      ),
    });
    setDirty(true);
    setMessage('');
  }
  function changeRows(rows: Row[]) {
    if (tab) changeTab({ ...tab, content: rows } as AboutTab);
  }
  function changeRow(index: number, key: string, value: string | string[]) {
    if (tab)
      changeRows(
        tab.content.map((row, i) =>
          i === index ? { ...row, [key]: value } : row
        )
      );
  }
  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isAboutContent(content)) {
      setMessage(
        '한국어와 영어의 모든 탭에서 이름·제목·기간 등 필수 항목을 확인해주세요.'
      );
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '저장하지 못했습니다.');
      setDirty(false);
      setMessage('모든 탭을 저장했습니다. About 페이지에 반영됩니다.');
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : '저장하지 못했습니다.'
      );
    } finally {
      setSaving(false);
    }
  }
  function field(
    index: number,
    key: string,
    label: string,
    value: string | string[],
    multiline = false
  ) {
    return (
      <label key={key} className="grid gap-2 text-sm font-medium text-gray-700">
        {label}
        {multiline ? (
          <textarea
            className={input}
            rows={4}
            maxLength={10000}
            value={Array.isArray(value) ? value.join('\n') : value}
            onChange={(event) =>
              changeRow(
                index,
                key,
                key === 'value' && !event.target.value.includes('\n')
                  ? event.target.value
                  : event.target.value.split('\n')
              )
            }
          />
        ) : (
          <input
            className={input}
            required
            maxLength={2000}
            value={typeof value === 'string' ? value : value.join(', ')}
            onChange={(event) => changeRow(index, key, event.target.value)}
          />
        )}
      </label>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-5 sm:p-8">
      <h1 className="text-2xl font-semibold">소개 관리</h1>
      <p className="mt-2 mb-6 text-sm leading-6 text-gray-500">
        경력·교육·기술·프로필을 탭별로 관리합니다. 한국어와 영어는 각각
        편집하며, 저장하면 모든 탭의 변경 사항이 함께 반영됩니다.
      </p>
      <p role="status" className="mb-4 text-sm text-gray-700">
        {message ||
          (!content
            ? '불러오는 중…'
            : dirty
              ? '저장하지 않은 변경 사항이 있습니다.'
              : '')}
      </p>
      {!content && message && (
        <button
          className={button}
          onClick={() => {
            setMessage('');
            setAttempt((v) => v + 1);
          }}
        >
          다시 불러오기
        </button>
      )}
      {content && tab && (
        <form onSubmit={save}>
          <fieldset disabled={saving} className="space-y-5 disabled:opacity-60">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2" aria-label="편집할 소개 탭">
                {aboutTabNames.map((name, index) => (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={tabIndex === index}
                    className={`${button} ${tabIndex === index ? 'border-sky-300 bg-sky-50 text-sky-800' : 'bg-white text-gray-600'}`}
                    onClick={() => setTabIndex(index)}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-sm">
                언어
                <select
                  className={input}
                  value={locale}
                  onChange={(event) =>
                    setLocale(event.target.value as 'ko' | 'en')
                  }
                >
                  <option value="ko">한국어</option>
                  <option value="en">English</option>
                </select>
              </label>
            </div>
            <div className="grid gap-4 rounded-2xl bg-gray-50 p-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                탭 이름
                <input
                  className={input}
                  required
                  maxLength={2000}
                  value={tab.name}
                  onChange={(event) =>
                    changeTab({ ...tab, name: event.target.value })
                  }
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                탭 설명
                <input
                  className={input}
                  maxLength={2000}
                  value={tab.description}
                  onChange={(event) =>
                    changeTab({ ...tab, description: event.target.value })
                  }
                />
              </label>
            </div>
            {!tab.content.length && (
              <p className="rounded-2xl bg-gray-50 p-6 text-gray-500">
                등록된 항목이 없습니다.
              </p>
            )}
            {tab.content.map((row, index) => (
              <section
                key={`${locale}-${tab.id}-${index}`}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-semibold">
                    {aboutTabNames[tabIndex]} {index + 1}
                  </h2>
                  <div className="flex gap-2">
                    {([-1, 1] as const).map((direction) => (
                      <button
                        type="button"
                        key={direction}
                        className={button}
                        disabled={
                          index + direction < 0 ||
                          index + direction >= tab.content.length
                        }
                        aria-label={`항목 ${index + 1} ${direction < 0 ? '위로' : '아래로'}`}
                        onClick={() => {
                          const rows: Row[] = [...tab.content];
                          [rows[index], rows[index + direction]] = [
                            rows[index + direction],
                            rows[index],
                          ];
                          changeRows(rows);
                        }}
                      >
                        {direction < 0 ? '↑' : '↓'}
                      </button>
                    ))}
                    <button
                      type="button"
                      className={button}
                      aria-label={`항목 ${index + 1} 삭제`}
                      onClick={() => {
                        if (
                          window.confirm(
                            '이 항목을 삭제할까요? 저장 후 반영됩니다.'
                          )
                        )
                          changeRows(tab.content.filter((_, i) => i !== index));
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {'startDate' in row && (
                    <>
                      {field(
                        index,
                        'title',
                        tab.id === 'career' ? '직무' : '교육 / 전공',
                        row.title
                      )}
                      {field(
                        index,
                        'startDate',
                        '시작일 (예: 2026.03)',
                        row.startDate
                      )}
                      {field(
                        index,
                        'endDate',
                        '종료일 / 상태 (예: 재직 중)',
                        row.endDate
                      )}
                      {field(
                        index,
                        'list',
                        tab.id === 'career'
                          ? '회사명 (줄마다 한 항목)'
                          : '기관 / 상세 내용 (줄마다 한 항목)',
                        row.list,
                        true
                      )}
                    </>
                  )}
                  {'icon' in row && (
                    <>
                      {field(index, 'title', '기술 이름', row.title)}
                      <label className="grid gap-2 text-sm font-medium">
                        아이콘
                        <select
                          className={input}
                          value={row.icon}
                          onChange={(event) =>
                            changeRow(index, 'icon', event.target.value)
                          }
                        >
                          {Object.keys(icons).map((icon) => (
                            <option key={icon} value={icon}>
                              {icon
                                .replace(/^(Fa|Si|Di|Ri|IoLogo)/, '')
                                .replace(/Fill$/, '')}
                            </option>
                          ))}
                        </select>
                      </label>
                    </>
                  )}
                  {'label' in row && (
                    <>
                      {field(index, 'label', '항목 이름', row.label)}
                      {field(
                        index,
                        'value',
                        '내용 (줄마다 한 항목)',
                        row.value,
                        true
                      )}
                    </>
                  )}
                </div>
              </section>
            ))}
            <div className="flex flex-wrap justify-between gap-3">
              <button
                type="button"
                className={button}
                disabled={tab.content.length >= 50}
                onClick={() =>
                  changeRows([
                    ...tab.content,
                    tabIndex < 2
                      ? { title: '', startDate: '', endDate: '', list: [] }
                      : tabIndex === 2
                        ? { title: '', icon: 'FaReact' }
                        : { label: '', value: '' },
                  ])
                }
              >
                항목 추가
              </button>
              <button
                type="submit"
                disabled={!dirty}
                className="min-h-11 rounded-xl bg-gray-950 px-6 py-2 font-medium text-white disabled:opacity-40"
              >
                {saving ? '저장 중…' : '모든 변경 저장'}
              </button>
            </div>
          </fieldset>
        </form>
      )}
    </main>
  );
}
