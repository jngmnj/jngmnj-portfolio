'use client';
import { useEffect, useState } from 'react';
import {
  HomeSettings,
  homeSectionNames,
  isHomeSettings,
} from '@/data/homeSettings';
import { FirebaseProject } from '@/types';
const button =
  'min-h-11 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-sky-500';
export default function AdminHomePage() {
  const [settings, setSettings] = useState<HomeSettings | null>(null);
  const [projects, setProjects] = useState<FirebaseProject[]>([]);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    Promise.all(
      ['/api/home-settings', '/api/projects'].map(async (url) => {
        const response = await fetch(url, {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) throw Error();
        return response.json();
      })
    )
      .then(([data, list]) => {
        if (!isHomeSettings(data.settings) || !Array.isArray(list))
          throw Error();
        setSettings(data.settings);
        setProjects(list);
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setMessage('설정을 불러오지 못했습니다. 다시 시도해주세요.');
      });
    return () => controller.abort();
  }, [attempt]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  function update(next: HomeSettings) {
    setSettings(next);
    setDirty(true);
    setMessage('');
  }
  async function save() {
    if (!isHomeSettings(settings)) {
      setMessage(
        '최소 한 섹션을 켜주세요. 직접 선택 모드에서는 프로젝트를 1~3개 선택해주세요.'
      );
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      const response = await fetch('/api/home-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });
      const data = await response.json();
      if (!response.ok) throw Error(data.error || '저장하지 못했습니다.');
      setDirty(false);
      setMessage('저장했습니다. 메인 페이지를 새로 열면 반영됩니다.');
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : '저장하지 못했습니다.'
      );
    } finally {
      setSaving(false);
    }
  }
  return (
    <main className="mx-auto max-w-4xl p-5 sm:p-8">
      <h1 className="text-2xl font-semibold">메인페이지 관리</h1>
      <p className="mt-2 mb-6 text-sm leading-6 text-gray-500">
        섹션 사용 여부와 노출 순서, 대표 프로젝트를 설정합니다. 저장 전에는 공개
        페이지에 반영되지 않습니다.
      </p>
      <p role="status" className="mb-4 text-sm">
        {message ||
          (!settings
            ? '불러오는 중…'
            : dirty
              ? '저장하지 않은 변경 사항이 있습니다.'
              : '')}
      </p>
      {!settings && message && (
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
      {settings && (
        <fieldset disabled={saving} className="space-y-6 disabled:opacity-60">
          <section className="rounded-2xl border border-gray-200 p-5">
            <h2 className="mb-4 text-lg font-semibold">섹션 구성</h2>
            <ol className="space-y-3">
              {settings.sections.map((section, index) => (
                <li
                  key={section.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gray-50 p-3"
                >
                  <label className="flex min-h-11 items-center gap-3 text-sm font-medium">
                    <input
                      type="checkbox"
                      className="size-5"
                      checked={section.enabled}
                      onChange={(event) =>
                        update({
                          ...settings,
                          sections: settings.sections.map((s) =>
                            s.id === section.id
                              ? { ...s, enabled: event.target.checked }
                              : s
                          ),
                        })
                      }
                    />
                    {index + 1}. {homeSectionNames[section.id]}
                  </label>
                  <div className="flex gap-2">
                    {([-1, 1] as const).map((direction) => (
                      <button
                        key={direction}
                        className={button}
                        disabled={
                          index + direction < 0 ||
                          index + direction >= settings.sections.length
                        }
                        aria-label={`${homeSectionNames[section.id]} ${direction < 0 ? '위로' : '아래로'}`}
                        onClick={() => {
                          const sections = [...settings.sections];
                          [sections[index], sections[index + direction]] = [
                            sections[index + direction],
                            sections[index],
                          ];
                          update({ ...settings, sections });
                        }}
                      >
                        {direction < 0 ? '↑' : '↓'}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <section className="rounded-2xl border border-gray-200 p-5">
            <h2 className="mb-4 text-lg font-semibold">대표 프로젝트</h2>
            <div className="mb-5 flex flex-wrap gap-5">
              {(['latest', 'selected'] as const).map((mode) => (
                <label
                  key={mode}
                  className="flex min-h-11 items-center gap-2 text-sm"
                >
                  <input
                    type="radio"
                    name="project-mode"
                    checked={settings.projectMode === mode}
                    onChange={() => update({ ...settings, projectMode: mode })}
                  />
                  {mode === 'latest'
                    ? '최신 프로젝트 3개 자동 표시'
                    : '직접 선택 (최대 3개)'}
                </label>
              ))}
            </div>
            {settings.projectMode === 'selected' && (
              <>
                <ol className="mb-5 space-y-2">
                  {settings.projectIds.map((id, index) => (
                    <li
                      key={id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-sky-50 p-3"
                    >
                      <span className="min-w-0 flex-1 text-sm [overflow-wrap:anywhere] break-keep">
                        {index + 1}.{' '}
                        {projects.find((p) => p.id === id)?.title ||
                          '삭제되었거나 조회할 수 없는 프로젝트'}
                      </span>
                      <div className="flex gap-1">
                        {([-1, 1] as const).map((direction) => (
                          <button
                            key={direction}
                            className={button}
                            disabled={
                              index + direction < 0 ||
                              index + direction >= settings.projectIds.length
                            }
                            aria-label={`대표 프로젝트 ${index + 1} ${direction < 0 ? '위로' : '아래로'}`}
                            onClick={() => {
                              const projectIds = [...settings.projectIds];
                              [
                                projectIds[index],
                                projectIds[index + direction],
                              ] = [
                                projectIds[index + direction],
                                projectIds[index],
                              ];
                              update({ ...settings, projectIds });
                            }}
                          >
                            {direction < 0 ? '↑' : '↓'}
                          </button>
                        ))}
                        <button
                          className={button}
                          onClick={() =>
                            update({
                              ...settings,
                              projectIds: settings.projectIds.filter(
                                (item) => item !== id
                              ),
                            })
                          }
                        >
                          제외
                        </button>
                      </div>
                    </li>
                  ))}
                </ol>
                <label className="grid gap-2 text-sm">
                  프로젝트 추가
                  <select
                    className="min-h-11 min-w-0 rounded-xl border border-gray-200 p-3"
                    value=""
                    disabled={settings.projectIds.length >= 3}
                    onChange={(event) => {
                      if (event.target.value)
                        update({
                          ...settings,
                          projectIds: [
                            ...settings.projectIds,
                            event.target.value,
                          ],
                        });
                    }}
                  >
                    <option value="">프로젝트를 선택하세요</option>
                    {projects
                      .filter(
                        (p) => p.id && !settings.projectIds.includes(p.id)
                      )
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                  </select>
                </label>
                {!projects.length && (
                  <p className="mt-3 text-sm text-gray-500">
                    등록된 프로젝트가 없습니다.
                  </p>
                )}
              </>
            )}
          </section>
          <div className="flex justify-end">
            <button
              className="min-h-11 rounded-xl bg-gray-950 px-6 py-2 text-white disabled:opacity-40"
              disabled={!dirty}
              onClick={save}
            >
              {saving ? '저장 중…' : '설정 저장'}
            </button>
          </div>
        </fieldset>
      )}
    </main>
  );
}
