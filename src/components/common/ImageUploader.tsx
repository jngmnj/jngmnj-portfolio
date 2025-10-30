'use client';

import { uploadImage } from '@/utils/imageUpload';
import Image from 'next/image';
import { useCallback, useState } from 'react';

interface ImageUploaderProps {
  value?: string | string[];
  onChange: (urls: string | string[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

interface UploadProgress {
  [key: string]: number;
}

export default function ImageUploader({
  value,
  onChange,
  multiple = false,
  maxFiles = 5,
  maxSizeMB = 100,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  label = '이미지',
  required = false,
  disabled = false,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // 빈 문자열 필터링
  const imageUrls = Array.isArray(value)
    ? value.filter((url) => url && url.trim() !== '')
    : value && value.trim() !== ''
      ? [value]
      : [];

  const validateFile = (file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      return `지원하지 않는 파일 형식입니다. (${acceptedFormats.map((f) => f.split('/')[1]).join(', ')})`;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      return `파일 크기는 ${maxSizeMB}MB를 초과할 수 없습니다.`;
    }

    return null;
  };

  const handleFiles = async (files: FileList) => {
    setError('');

    const filesArray = Array.from(files);

    // 파일 개수 체크
    if (multiple && imageUrls.length + filesArray.length > maxFiles) {
      setError(`최대 ${maxFiles}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    if (!multiple && filesArray.length > 1) {
      setError('하나의 이미지만 업로드할 수 있습니다.');
      return;
    }

    // 파일 유효성 검사
    for (const file of filesArray) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setLoading(true);

    try {
      const uploadPromises = filesArray.map(async (file) => {
        // 진행률 시작
        setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

        // 업로드 시뮬레이션 (실제로는 Firebase에서 진행률을 받아올 수 있음)
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            const currentProgress = prev[file.name] || 0;
            if (currentProgress >= 90) {
              clearInterval(progressInterval);
              return prev;
            }
            return { ...prev, [file.name]: currentProgress + 10 };
          });
        }, 100);

        try {
          const result = await uploadImage(file, 'projects', (progress) => {
            setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
          });

          // 업로드 완료
          setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
          clearInterval(progressInterval);

          // 진행률 제거
          setTimeout(() => {
            setUploadProgress((prev) => {
              const newProgress = { ...prev };
              delete newProgress[file.name];
              return newProgress;
            });
          }, 1000);

          return result.url;
        } catch (error) {
          clearInterval(progressInterval);
          throw error;
        }
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      if (multiple) {
        onChange([...imageUrls, ...uploadedUrls]);
      } else {
        onChange(uploadedUrls[0]);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : '이미지 업로드 중 오류가 발생했습니다.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFiles(files);
      }
    },
    [disabled]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
    // Reset input
    e.target.value = '';
  };

  const handleRemoveImage = async (index: number) => {
    const urlToRemove = imageUrls[index];

    try {
      // Firebase Storage에서 이미지 삭제
      const fileName = urlToRemove.split('/').pop()?.split('?')[0];
      if (fileName) {
        await fetch(
          `/api/upload/image?filename=${encodeURIComponent(fileName)}`,
          {
            method: 'DELETE',
          }
        );
      }
    } catch (err) {
      console.error('이미지 삭제 중 오류:', err);
    }

    const newUrls = imageUrls.filter((_, i) => i !== index);
    onChange(multiple ? newUrls : '');
  };

  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    if (!multiple) return;

    const newUrls = [...imageUrls];
    const [movedItem] = newUrls.splice(fromIndex, 1);
    newUrls.splice(toIndex, 0, movedItem);
    onChange(newUrls);
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="mb-2 block text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
          isDragging
            ? 'border-seagull-500 bg-seagull-50'
            : 'border-gray-300 bg-gray-50'
        } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        <input
          type="file"
          id={`file-input-${label}`}
          multiple={multiple}
          accept={acceptedFormats.join(',')}
          onChange={handleFileInput}
          disabled={disabled || loading}
          className="hidden"
        />

        <label
          htmlFor={`file-input-${label}`}
          className={`block ${disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          <p className="mb-2 text-sm text-gray-700">
            <span className="text-seagull-600 font-semibold">
              클릭하여 업로드
            </span>{' '}
            또는 드래그 앤 드롭
          </p>
          <p className="text-xs text-gray-500">
            {acceptedFormats
              .map((f) => f.split('/')[1].toUpperCase())
              .join(', ')}{' '}
            (최대 {maxSizeMB}MB)
          </p>
          {multiple && (
            <p className="mt-1 text-xs text-gray-500">최대 {maxFiles}개 파일</p>
          )}
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([filename, progress]) => (
            <div key={filename} className="rounded-lg bg-gray-50 p-3">
              <div className="mb-1 flex items-center justify-between text-xs text-gray-600">
                <span className="truncate">{filename}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="bg-seagull-500 h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Images */}
      {imageUrls.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {imageUrls.map((url, index) => {
            if (!url || url.trim() === '') return null;
            
            // URL에서 파일명 추출하여 고유 key 생성
            const fileName = url.split('/').pop()?.split('?')[0] || `image-${index}`;
            const uniqueKey = `${fileName}-${index}`;
            
            return (
              <div
                key={uniqueKey}
                className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100"
              >
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />

                {/* Overlay Actions */}
                <div className="bg-opacity-0 group-hover:bg-opacity-50 absolute inset-0 flex items-center justify-center gap-2 bg-black opacity-0 transition-all group-hover:opacity-100">
                  {multiple && index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleMoveImage(index, index - 1)}
                      className="rounded-full bg-white p-2 text-gray-700 hover:bg-gray-100"
                      title="왼쪽으로 이동"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                  )}

                  {multiple && index < imageUrls.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleMoveImage(index, index + 1)}
                      className="rounded-full bg-white p-2 text-gray-700 hover:bg-gray-100"
                      title="오른쪽으로 이동"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
                    title="삭제"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Index Badge */}
                {multiple && (
                  <div className="bg-opacity-60 absolute top-2 left-2 rounded-full bg-black px-2 py-1 text-xs text-white">
                    {index + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
