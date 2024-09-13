import { cn } from '@/utils/style';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Category = {
  id: number;
  name: string;
};
const PostCategoryTab = ({}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get<Category[]>('/api/categories');
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
            activeTab ? 'after:h-2 after:bg-seagull-500' : '',
            "relative gap-2 rounded-xl px-6 py-3 text-center after:absolute after:bottom-0 after:left-0 after:block after:h-px after:w-full after:bg-gray-200 after:mix-blend-multiply after:content-[''] hover:after:w-full"
          )}
          //   onClick={() => setTabIndex(index)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default PostCategoryTab;
