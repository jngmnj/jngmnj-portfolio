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
      <label className="mb-2 block text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* 업로드 방식 선택 탭 */}
      <div className="mb-3 flex gap-2 overflow-x-auto border-b border-gray-200">
        <button
          type="button"
          onClick={() => setUploadType('upload')}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
            uploadType === 'upload'
              ? 'border-seagull-500 text-seagull-600 border-b-2'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          파일 업로드
        </button>
        <button
          type="button"
          onClick={() => setUploadType('url')}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
            uploadType === 'url'
              ? 'border-seagull-500 text-seagull-600 border-b-2'
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
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddUrl();
                }
              }}
            />
            {multiple && (
              <Button
                type="button"
                onClick={handleAddUrl}
                className="w-full sm:w-auto"
              >
                추가
              </Button>
            )}
          </div>
          {multiple && Array.isArray(value) && value.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {value.map((url: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700"
                >
                  {url.length > 40 ? `${url.substring(0, 40)}...` : url}
                  <button
                    type="button"
                    onClick={() => handleRemoveUrl(index)}
                    className="ml-1 text-yellow-700 hover:text-yellow-900"
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
