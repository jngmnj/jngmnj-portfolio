'use client';

import Input from '@/components/common/Input';
import { useFormContext } from 'react-hook-form';

export default function ProjectFormTeam() {
  const { register } = useFormContext();

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">Team</label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-gray-600">팀 크기</label>
          <Input
            type="number"
            {...register('detail.team.size', { valueAsNumber: true })}
            placeholder="1"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-600">역할</label>
          <Input
            type="text"
            {...register('detail.team.role')}
            placeholder="프론트엔드 개발자"
          />
        </div>
      </div>
    </div>
  );
}
