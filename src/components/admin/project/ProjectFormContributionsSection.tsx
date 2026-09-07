'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

type ContributionDetail = {
  text: string;
  textEn?: string;
  link?: string;
  linkText?: string;
  linkTextEn?: string;
};

type Contribution = {
  title: string;
  titleEn?: string;
  details?: ContributionDetail[];
};

type ContributionDetailDraft = {
  text: string;
  textEn: string;
  link: string;
  linkText: string;
  linkTextEn: string;
};

export default function ProjectFormContributionsSection() {
  const { watch, setValue } = useFormContext();
  const [titleInput, setTitleInput] = useState('');
  const [titleEnInput, setTitleEnInput] = useState('');
  const [detailInputs, setDetailInputs] = useState<
    Record<number, ContributionDetailDraft>
  >({});

  const contributions = (watch('detail.contributions') || []) as Contribution[];

  const updateContributionTitle = (
    index: number,
    field: 'title' | 'titleEn',
    title: string
  ) => {
    const updated = [...contributions];
    updated[index] = {
      ...updated[index],
      [field]: title,
    };
    setValue('detail.contributions', updated);
  };

  const addContribution = () => {
    if (!titleInput.trim()) return;
    setValue('detail.contributions', [
      ...contributions,
      {
        title: titleInput.trim(),
        titleEn: titleEnInput.trim() || undefined,
        details: [],
      },
    ]);
    setTitleInput('');
    setTitleEnInput('');
  };

  const removeContribution = (index: number) => {
    setValue(
      'detail.contributions',
      contributions.filter((_item, i) => i !== index)
    );
    setDetailInputs((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const updateContributionDetailInput = (
    index: number,
    field: keyof ContributionDetailDraft,
    value: string
  ) => {
    setDetailInputs((prev) => ({
      ...prev,
      [index]: {
        text: prev[index]?.text ?? '',
        textEn: prev[index]?.textEn ?? '',
        link: prev[index]?.link ?? '',
        linkText: prev[index]?.linkText ?? '',
        linkTextEn: prev[index]?.linkTextEn ?? '',
        [field]: value,
      },
    }));
  };

  const addContributionDetail = (index: number) => {
    const draft = detailInputs[index];
    if (!draft?.text?.trim()) return;
    const updated = [...contributions];
    const details = updated[index]?.details || [];
    updated[index] = {
      ...updated[index],
      details: [
        ...details,
        {
          text: draft.text.trim(),
          textEn: draft.textEn.trim() || undefined,
          link: draft.link.trim() || undefined,
          linkText: draft.linkText.trim() || undefined,
          linkTextEn: draft.linkTextEn.trim() || undefined,
        },
      ],
    };
    setValue('detail.contributions', updated);
    setDetailInputs((prev) => ({
      ...prev,
      [index]: { text: '', textEn: '', link: '', linkText: '', linkTextEn: '' },
    }));
  };

  const removeContributionDetail = (index: number, detailIndex: number) => {
    const updated = [...contributions];
    const details = updated[index]?.details || [];
    updated[index] = {
      ...updated[index],
      details: details.filter((_detail, i) => i !== detailIndex),
    };
    setValue('detail.contributions', updated);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold text-gray-600">
              기여 주제
            </span>
            <Input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="예: 성능 최적화"
              className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 bg-white focus:ring-2 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addContribution();
                }
              }}
            />
          </label>
          <label className="block">
            <span className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-gray-600">
              Contribution title
              <span className="rounded bg-white px-1 py-0.5 text-[9px] font-bold tracking-wide text-gray-500">
                EN
              </span>
            </span>
            <Input
              type="text"
              value={titleEnInput}
              onChange={(e) => setTitleEnInput(e.target.value)}
              placeholder="Performance optimization"
              className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 bg-white focus:ring-2 focus:outline-none"
            />
          </label>
          <Button
            type="button"
            onClick={addContribution}
            color="secondary"
            className="min-h-11 w-full lg:w-auto"
          >
            주제 추가
          </Button>
        </div>
      </div>

      {contributions.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 px-4 py-7 text-center">
          <p className="text-sm break-keep text-gray-500">
            등록된 기여 내용이 없습니다. 먼저 기여 주제를 추가해 주세요.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {contributions.map((contribution: Contribution, index: number) => (
          <div
            key={index}
            className="space-y-4 rounded-xl border border-gray-200 p-4 sm:p-5"
          >
            <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-gray-600">
                  기여 주제 {index + 1}
                </span>
                <Input
                  type="text"
                  value={contribution.title}
                  onChange={(e) =>
                    updateContributionTitle(index, 'title', e.target.value)
                  }
                  placeholder="섹션 제목"
                  className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 focus:ring-2 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                  Contribution title
                  <span className="rounded bg-gray-100 px-1 py-0.5 text-[9px] font-bold tracking-wide text-gray-500">
                    EN
                  </span>
                </span>
                <Input
                  type="text"
                  value={contribution.titleEn ?? ''}
                  onChange={(e) =>
                    updateContributionTitle(index, 'titleEn', e.target.value)
                  }
                  placeholder="Section title (English)"
                  className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 focus:ring-2 focus:outline-none"
                />
              </label>
              <Button
                type="button"
                onClick={() => removeContribution(index)}
                color="danger"
                className="min-h-11 w-full lg:w-auto"
              >
                주제 삭제
              </Button>
            </div>

            <div className="space-y-3 border-t border-gray-100 pt-4">
              <p className="text-sm font-semibold text-gray-800">세부 내용</p>
              {contribution.details?.map((detail, detailIndex) => (
                <div
                  key={detailIndex}
                  className="flex flex-col gap-3 rounded-xl bg-gray-50 p-3 sm:flex-row sm:items-start"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="block text-sm leading-6 break-words text-gray-700">
                      {detail.text}
                    </span>
                    {detail.textEn && (
                      <span className="block text-sm leading-6 break-words text-gray-500">
                        {detail.textEn}
                      </span>
                    )}
                    {detail.link && (
                      <span className="text-seagull-700 block text-xs break-all">
                        ({detail.linkText || detail.link}
                        {detail.linkTextEn ? ` / ${detail.linkTextEn}` : ''})
                      </span>
                    )}
                  </div>
                  <Button
                    type="button"
                    onClick={() => removeContributionDetail(index, detailIndex)}
                    color="danger"
                    className="min-h-9 w-full px-3 py-1.5 text-xs sm:w-auto"
                  >
                    삭제
                  </Button>
                </div>
              ))}

              <div className="mt-2 space-y-4 rounded-xl bg-gray-50 p-3 sm:p-4">
                <div className="grid gap-3 lg:grid-cols-2">
                  <ContributionInput
                    label="세부 내용"
                    value={detailInputs[index]?.text ?? ''}
                    onChange={(value) =>
                      updateContributionDetailInput(index, 'text', value)
                    }
                    placeholder="구체적으로 기여한 내용을 입력하세요"
                  />
                  <ContributionInput
                    label="Detail"
                    language="en"
                    value={detailInputs[index]?.textEn ?? ''}
                    onChange={(value) =>
                      updateContributionDetailInput(index, 'textEn', value)
                    }
                    placeholder="Describe your contribution in English"
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  <ContributionInput
                    label="관련 링크"
                    type="url"
                    value={detailInputs[index]?.link ?? ''}
                    onChange={(value) =>
                      updateContributionDetailInput(index, 'link', value)
                    }
                    placeholder="https://..."
                  />
                  <ContributionInput
                    label="링크 이름"
                    value={detailInputs[index]?.linkText ?? ''}
                    onChange={(value) =>
                      updateContributionDetailInput(index, 'linkText', value)
                    }
                    placeholder="예: 관련 PR 보기"
                  />
                  <ContributionInput
                    label="Link label"
                    language="en"
                    value={detailInputs[index]?.linkTextEn ?? ''}
                    onChange={(value) =>
                      updateContributionDetailInput(index, 'linkTextEn', value)
                    }
                    placeholder="View pull request"
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => addContributionDetail(index)}
                  color="secondary"
                  className="min-h-11 w-full text-sm sm:w-auto"
                >
                  세부 내용 추가
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ContributionInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: 'text' | 'url';
  language?: 'ko' | 'en';
}

function ContributionInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  language = 'ko',
}: ContributionInputProps) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-gray-600">
        {label}
        {language === 'en' && (
          <span className="rounded bg-white px-1 py-0.5 text-[9px] font-bold tracking-wide text-gray-500">
            EN
          </span>
        )}
      </span>
      <Input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 bg-white focus:ring-2 focus:outline-none"
      />
    </label>
  );
}
