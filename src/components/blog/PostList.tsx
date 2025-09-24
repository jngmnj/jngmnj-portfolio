import { Post } from '@/types';
import { useCategories } from '@/utils/hooks';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../firebaseConfig';
import PostCard from './PostCard';
import PostCategoryTab from './PostCategoryTab';

export type Category = {
  id: number;
  name: string;
};

type PostListProps = {
  tag?: string;
  category?: string;
};

const PostList = ({ category, tag }: PostListProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const postRef = collection(db, 'posts');

      let q = query(postRef);
      if (category) {
        q = query(postRef, where('category', '==', category));
      }
      if (tag) {
        q = query(postRef, where('tags', 'array-contains', tag));
      }

      const docSnap = await getDocs(q);

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
        console.error('No documents found!');
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
      {!category && !tag && (
        <div className="mb-6">
          <PostCategoryTab
            categories={categories}
            activeTab={activeTab}
            handleTabClick={setActiveTab}
          />
        </div>
      )}
      <div className="flex w-full flex-col gap-6 sm:gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
};

export default PostList;
