import { Post } from '@/types';
import { useCategories } from '@/utils/hooks';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import PostCard from './PostCard';
import PostCategoryTab from './PostCategoryTab';

export type Category = {
  id: number;
  name: string;
};

const PostList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDocs(collection(db, 'posts'));

      if (!docSnap.empty) {
        setPosts(
          docSnap.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              }) as Post
          )
        );
      } else {
        console.log('No documents found!');
      }
    };

    fetchData();
  }, [activeTab]);

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

  return (
    <>
      <div className="mb-6">
        <PostCategoryTab
          categories={categories}
          activeTab={activeTab}
          handleTabClick={setActiveTab}
        />
      </div>
      <div className="flex w-full flex-col flex-wrap gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
};

export default PostList;
