import { useEffect, useState } from 'react';
import PostCategoryTab from './PostCategoryTab';

export type Category = {
  id: number;
  name: string;
};

const PostList = async () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const { data } = await axios.get<Category[]>('/api/categories');
        const data = [
          { id: 0, name: '전체' },
          { id: 1, name: '개발' },
          { id: 2, name: '디자인' },
          { id: 3, name: '일상' },
        ];
        setCategories(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex w-full flex-wrap gap-6">
      <PostCategoryTab
        categories={categories}
        activeTab={activeTab}
        handleTabClick={setActiveTab}
      />
    </div>
  );
};

export default PostList;
