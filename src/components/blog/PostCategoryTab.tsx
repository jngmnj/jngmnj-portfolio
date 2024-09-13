import { cn } from '@/utils/style';
import { useEffect, useState } from 'react';

type Category = {
  id: number;
  name: string;
};
const PostCategoryTab = ({}) => {
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
    <div className="flex w-full border-b border-b-gray-200">
      {categories.map((category, index) => (
        <button
          type="button"
          key={index}
          className={cn(
            activeTab === index
              ? 'text-seagull-500 after:h-2 after:bg-seagull-500'
              : 'after:bg-gray-200',
            "relative gap-2 rounded-xl px-6 py-3 text-center after:absolute after:bottom-0 after:left-0 after:z-10 after:block after:h-px after:w-full after:mix-blend-multiply after:content-[''] hover:after:w-full"
          )}
          onClick={() => setActiveTab(index)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default PostCategoryTab;
