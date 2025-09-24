import { cn } from '@/utils/style';
import { Category } from './PostList';

type PostCategoryTabProps = {
  categories: Category[];
  handleTabClick: (index: number) => void;
  activeTab: number;
};

const PostCategoryTab = ({
  categories,
  handleTabClick,
  activeTab,
}: PostCategoryTabProps) => {
  return (
    <div className="flex w-full flex-wrap border-b border-b-gray-200 sm:flex-nowrap">
      {categories.map((category, index) => (
        <button
          type="button"
          key={index}
          className={cn(
            activeTab === index
              ? 'text-seagull-500 after:bg-seagull-500 after:h-2'
              : 'after:bg-gray-200',
            "relative gap-2 rounded-xl px-3 py-2 text-center text-sm after:absolute after:bottom-0 after:left-0 after:z-10 after:block after:h-px after:w-full after:mix-blend-multiply after:content-[''] hover:after:w-full sm:px-6 sm:py-3 sm:text-base"
          )}
          onClick={() => handleTabClick(index)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default PostCategoryTab;
