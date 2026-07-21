'use client';

import Button from '@/components/common/Button';
import ImageUploader from '@/components/common/ImageUploader';
import Input from '@/components/common/Input';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface ProjectFormImageUploadProps {
  label: string;
  fieldPath: string;
  multiple?: boolean;
  maxFiles?: number;
  required?: boolean;
  placeholder?: string;
}

export default function ProjectFormImageUpload({
  label,
  fieldPath,
  multiple = false,
  maxFiles = 10,
  required = false,
  placeholder = 'https://example.com/image.jpg',
}: ProjectFormImageUploadProps) {
  const { watch, setValue } = useFormContext();
  const [uploadType, setUploadType] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const value = watch(fieldPath);

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;

    if (multiple) {
      const currentUrls = Array.isArray(value) ? value : value ? [value] : [];
      setValue(fieldPath, [...currentUrls, urlInput.trim()]);
    } else {
      setValue(fieldPath, urlInput.trim());
    }
    setUrlInput('');
  };

  const handleRemoveUrl = (index: number) => {
    if (!Array.isArray(value)) return;
    setValue(
      fieldPath,
      value.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {required ? (
          <span className="text-xs font-medium text-red-600">필수</span>
        ) : (
          <span className="text-xs font-medium text-gray-400">선택</span>
        )}
      </div>
      <p className="mb-3 text-xs leading-5 break-keep text-gray-500">
        파일을 직접 업로드하거나 외부 이미지 URL을 입력할 수 있습니다.
      </p>

      {/* 업로드 방식 선택 탭 */}
      <div
        className="mb-4 inline-flex rounded-xl bg-gray-100 p-1"
        role="tablist"
        aria-label={`${label} 입력 방식`}
      >
        <button
          type="button"
          onClick={() => setUploadType('upload')}
          role="tab"
          aria-selected={uploadType === 'upload'}
          className={`min-h-10 rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
            uploadType === 'upload'
              ? 'text-seagull-700 bg-white'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          파일 업로드
        </button>
        <button
          type="button"
          onClick={() => setUploadType('url')}
          role="tab"
          aria-selected={uploadType === 'url'}
          className={`min-h-10 rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
            uploadType === 'url'
              ? 'text-seagull-700 bg-white'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          URL 입력
        </button>
      </div>

      {uploadType === 'upload' ? (
        <ImageUploader
          value={value}
          onChange={(val) => setValue(fieldPath, val)}
          label=""
          required={required}
          multiple={multiple}
          maxFiles={maxFiles}
        />
      ) : (
        <>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={placeholder}
              className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 flex-1 focus:ring-2 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddUrl();
                }
              }}
            />
            <Button
              type="button"
              onClick={handleAddUrl}
              color="secondary"
              className="min-h-11 w-full sm:w-auto"
            >
              {multiple ? '추가' : '적용'}
            </Button>
          </div>
          {multiple && Array.isArray(value) && value.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {value.map((url: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex max-w-full items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                >
                  {url.length > 40 ? `${url.substring(0, 40)}...` : url}
                  <button
                    type="button"
                    onClick={() => handleRemoveUrl(index)}
                    className="ml-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                    aria-label={`${index + 1}번째 이미지 URL 삭제`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
