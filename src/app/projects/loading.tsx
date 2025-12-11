// app/projects/loading.tsx
import ProjectsSkeleton from '@/components/projects/ProjectsSkeleton';

export default function Loading() {
  return (
    <div className="content container">
      <ProjectsSkeleton />
    </div>
  );
}
