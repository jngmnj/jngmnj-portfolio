'use client';

import { useEffect, useState } from 'react';
import { Career, isCareerList } from '@/data/careers';

const fields: {
  key: Exclude<keyof Career, 'id'>;
  label: string;
  required?: boolean;
  placeholder?: string;
}[] = [
  { key: 'company', label: '회사명', required: true },
  { key: 'companyEn', label: '회사명 (영문)' },
  { key: 'title', label: '직무', required: true },
  { key: 'titleEn', label: '직무 (영문)' },
  { key: 'startDate', label: '입사일', required: true, placeholder: '2026.03' },
  {
    key: 'endDate',
    label: '퇴사일 (재직 중이면 비워두세요)',
    placeholder: '2026.12',
  },
];

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [dirty, setDirty] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/careers', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || !isCareerList(data.careers))
          throw new Error('경력을 불러오지 못했습니다.');
        setCareers(data.careers);
        setLoaded(true);
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setMessage('경력을 불러오지 못했습니다. 다시 시도해주세요.');
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

  function update(next: Career[]) {
    setCareers(next);
    setDirty(true);
    setMessage('');
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isCareerList(careers)) {
      setMessage(
        '회사명, 직무와 날짜(YYYY.MM)를 확인해주세요. 퇴사일은 입사일 이후여야 합니다.'
      );
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      const response = await fetch('/api/careers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ careers }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '저장하지 못했습니다.');
      setDirty(false);
      setMessage('저장했습니다. About 페이지에 반영됩니다.');
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : '저장하지 못했습니다.'
      );
    } finally {
      setSaving(false);
    }
  }

  const button =
    'min-h-11 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500';
  return (
    <main className="mx-auto max-w-4xl p-5 sm:p-8">
      <h1 className="text-2xl font-semibold">About 경력 관리</h1>
      <p className="mt-2 mb-6 text-sm leading-6 text-gray-500">
        표시 순서대로 회사명과 직무, 재직 기간을 관리합니다. 영문을 비워두면
        한국어 내용이 표시됩니다.
      </p>
      <p role="status" className="mb-4 text-sm text-gray-700">
        {message ||
          (!loaded
            ? '불러오는 중…'
            : dirty
              ? '저장하지 않은 변경 사항이 있습니다.'
              : '')}
      </p>
      {!loaded && message && (
        <button
          className={button}
          onClick={() => setAttempt((value) => value + 1)}
        >
          다시 불러오기
        </button>
      )}
      {loaded && (
        <form onSubmit={save}>
          <fieldset disabled={saving} className="space-y-5 disabled:opacity-60">
            {careers.length === 0 && (
              <p className="rounded-2xl bg-gray-50 p-6 text-gray-500">
                등록된 경력이 없습니다. 경력을 추가해주세요.
              </p>
            )}
            {careers.map((career, index) => (
              <section
                key={career.id}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-semibold">경력 {index + 1}</h2>
                  <div className="flex gap-2">
                    {([-1, 1] as const).map((direction) => (
                      <button
                        key={direction}
                        type="button"
                        className={button}
                        disabled={
                          index + direction < 0 ||
                          index + direction >= careers.length
                        }
                        aria-label={`경력 ${index + 1} ${direction < 0 ? '위로' : '아래로'}`}
                        onClick={() => {
                          const next = [...careers];
                          [next[index], next[index + direction]] = [
                            next[index + direction],
                            next[index],
                          ];
                          update(next);
                        }}
                      >
                        {direction < 0 ? '↑' : '↓'}
                      </button>
                    ))}
                    <button
                      type="button"
                      className={button}
                      aria-label={`경력 ${index + 1} 삭제`}
                      onClick={() => {
                        if (
                          window.confirm(
                            '이 경력을 삭제할까요? 저장 후 반영됩니다.'
                          )
                        )
                          update(careers.filter((row) => row.id !== career.id));
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {fields.map((field) => (
                    <label
                      key={field.key}
                      className="grid gap-2 text-sm font-medium text-gray-700"
                    >
                      {field.label}
                      <input
                        required={field.required}
                        maxLength={200}
                        value={career[field.key]}
                        placeholder={field.placeholder}
                        className="min-h-11 min-w-0 rounded-xl border border-gray-200 px-3 py-2 focus:border-sky-500 focus:outline-sky-500"
                        onChange={(event) =>
                          update(
                            careers.map((row) =>
                              row.id === career.id
                                ? { ...row, [field.key]: event.target.value }
                                : row
                            )
                          )
                        }
                      />
                    </label>
                  ))}
                </div>
              </section>
            ))}
            <div className="flex flex-wrap justify-between gap-3">
              <button
                type="button"
                className={button}
                disabled={careers.length >= 50}
                onClick={() =>
                  update([
                    ...careers,
                    {
                      id: crypto.randomUUID(),
                      company: '',
                      companyEn: '',
                      title: '',
                      titleEn: '',
                      startDate: '',
                      endDate: '',
                    },
                  ])
                }
              >
                경력 추가
              </button>
              <button
                type="submit"
                disabled={!dirty}
                className="min-h-11 rounded-xl bg-gray-950 px-6 py-2 font-medium text-white disabled:opacity-40"
              >
                {saving ? '저장 중…' : '저장'}
              </button>
            </div>
          </fieldset>
        </form>
      )}
    </main>
  );
}
