'use client';

import Input from '@/components/common/Input';
import { useFormContext } from 'react-hook-form';

export default function ProjectFormTeam() {
  const { register } = useFormContext();

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <p className="text-sm font-semibold text-gray-800">팀 구성</p>
        <span className="text-xs font-medium text-gray-400">선택</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            팀 인원
          </label>
          <Input
            type="number"
            {...register('detail.team.size', { valueAsNumber: true })}
            placeholder="1"
            min="1"
            className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 focus:ring-2 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            역할
          </label>
          <Input
            type="text"
            {...register('detail.team.role')}
            placeholder="프론트엔드 개발자"
            className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 focus:ring-2 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-600">
            Role
            <span className="rounded bg-gray-100 px-1 py-0.5 text-[9px] font-bold tracking-wide text-gray-500">
              EN
            </span>
          </label>
          <Input
            type="text"
            {...register('detail.team.roleEn')}
            placeholder="Frontend developer"
            className="focus:border-seagull-500 focus:ring-seagull-100 min-h-11 focus:ring-2 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
