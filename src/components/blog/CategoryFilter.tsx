import { useCategories } from '@/utils/hooks';
import { useEffect, useState } from 'react';
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
  const [categories, setCategories] = useState<Category[]>([]);
  const { data, error, isLoading } = useCategories();

  // 카테고리 데이터가 로드되면 카테고리 목록을 설정
  useEffect(() => {
    if (data) {
      const categoriesData = data.map((doc: any) => ({
        id: doc.category_id,
        name: doc.category_name,
      }));
      setCategories(categoriesData);
    }
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
