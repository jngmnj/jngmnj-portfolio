'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function ProjectFormContributionsSection() {
  const { watch, setValue } = useFormContext();
  const [titleInput, setTitleInput] = useState('');
  const [detailInputs, setDetailInputs] = useState<
    Record<number, { text: string; link: string; linkText: string }>
  >({});

  const contributions = watch('detail.contributions') || [];

  const updateContributionTitle = (index: number, title: string) => {
    const updated = [...contributions];
    updated[index] = {
      ...updated[index],
      title,
    };
    setValue('detail.contributions', updated);
  };

  const addContribution = () => {
    if (!titleInput.trim()) return;
    setValue('detail.contributions', [
      ...contributions,
      {
        title: titleInput.trim(),
        details: [],
      },
    ]);
    setTitleInput('');
  };

  const removeContribution = (index: number) => {
    setValue(
      'detail.contributions',
      contributions.filter((_item: any, i: number) => i !== index)
    );
    setDetailInputs((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const updateContributionDetailInput = (
    index: number,
    field: 'text' | 'link' | 'linkText',
    value: string
  ) => {
    setDetailInputs((prev) => ({
      ...prev,
      [index]: {
        text: prev[index]?.text ?? '',
        link: prev[index]?.link ?? '',
        linkText: prev[index]?.linkText ?? '',
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
          link: draft.link.trim() || undefined,
          linkText: draft.linkText.trim() || undefined,
        },
      ],
    };
    setValue('detail.contributions', updated);
    setDetailInputs((prev) => ({
      ...prev,
      [index]: { text: '', link: '', linkText: '' },
    }));
  };

  const removeContributionDetail = (index: number, detailIndex: number) => {
    const updated = [...contributions];
    const details = updated[index]?.details || [];
    updated[index] = {
      ...updated[index],
      details: details.filter((_detail: any, i: number) => i !== detailIndex),
    };
    setValue('detail.contributions', updated);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">Contributions</label>
      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="기여 섹션 제목 입력"
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addContribution();
              }
            }}
          />
          <Button
            type="button"
            onClick={addContribution}
            className="w-full sm:w-auto"
          >
            섹션 추가
          </Button>
        </div>

        {contributions.map(
          (
            contribution: {
              title: string;
              details?: { text: string; link?: string; linkText?: string }[];
            },
            index: number
          ) => (
            <div
              key={index}
              className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4"
            >
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={contribution.title}
                  onChange={(e) =>
                    updateContributionTitle(index, e.target.value)
                  }
                  placeholder="섹션 제목"
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={() => removeContribution(index)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  섹션 삭제
                </Button>
              </div>

              <div className="space-y-2 rounded bg-white p-3">
                <label className="text-xs font-medium text-gray-600">
                  상세 내용
                </label>
                {contribution.details?.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-start gap-2">
                    <div className="flex-1 space-y-1">
                      <span className="text-sm text-gray-700">
                        {detail.text}
                      </span>
                      {detail.link && (
                        <span className="text-xs text-blue-600">
                          ({detail.linkText || detail.link})
                        </span>
                      )}
                    </div>
                    <Button
                      type="button"
                      onClick={() =>
                        removeContributionDetail(index, detailIndex)
                      }
                      className="h-auto bg-red-500 px-2 py-1 text-xs hover:bg-red-600"
                    >
                      삭제
                    </Button>
                  </div>
                ))}

                <div className="mt-2 space-y-2 border-t pt-2">
                  <Input
                    type="text"
                    value={detailInputs[index]?.text ?? ''}
                    onChange={(e) =>
                      updateContributionDetailInput(
                        index,
                        'text',
                        e.target.value
                      )
                    }
                    placeholder="내용 입력"
                  />
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      value={detailInputs[index]?.link ?? ''}
                      onChange={(e) =>
                        updateContributionDetailInput(
                          index,
                          'link',
                          e.target.value
                        )
                      }
                      placeholder="링크 (선택)"
                      className="flex-1"
                    />
                    <Input
                      type="text"
                      value={detailInputs[index]?.linkText ?? ''}
                      onChange={(e) =>
                        updateContributionDetailInput(
                          index,
                          'linkText',
                          e.target.value
                        )
                      }
                      placeholder="링크 텍스트"
                      className="flex-1"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => addContributionDetail(index)}
                    className="w-full text-sm"
                  >
                    상세 내용 추가
                  </Button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
