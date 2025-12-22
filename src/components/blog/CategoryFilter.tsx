import { useCategories } from '@/utils/hooks';
import { DocumentData } from 'firebase/firestore';
import { useMemo } from 'react';
import PostCategoryTab from './PostCategoryTab';

export type Category = {
  id: number;
  name: string;
};

type CategoryFilterProps = {
  onCategoryChange: (categoryId: number) => void;
  activeCategoryId: number;
};

const CategoryFilter = ({
  onCategoryChange,
  activeCategoryId,
}: CategoryFilterProps) => {
  const { data, error, isLoading } = useCategories();

  // useMemo로 카테고리 데이터 변환 (derived state)
  const categories = useMemo(() => {
    if (!data) return [];
    return data.map((doc: DocumentData) => ({
      id: doc.category_id as number,
      name: doc.category_name as string,
    }));
  }, [data]);

  if (isLoading) {
    return (
      <div className="mb-6">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 w-20 animate-pulse rounded bg-gray-200"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || categories.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <PostCategoryTab
        categories={categories}
        activeTab={activeCategoryId}
        handleTabClick={onCategoryChange}
      />
    </div>
  );
};

export default CategoryFilter;
