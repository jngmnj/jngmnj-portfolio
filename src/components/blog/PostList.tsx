import { Post } from '@/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../firebaseConfig';
import CategoryFilter from './CategoryFilter';
import PostCard from './PostCard';

type PostListProps = {
  tag?: string;
  category?: string;
};

const PostList = ({ category, tag }: PostListProps) => {
  const [activeCategoryId, setActiveCategoryId] = useState(0);
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
  }, [activeCategoryId, category, tag]);

  const handleCategoryChange = (categoryId: number) => {
    setActiveCategoryId(categoryId);
  };

  return (
    <>
      {!category && !tag && (
        <CategoryFilter
          onCategoryChange={handleCategoryChange}
          activeCategoryId={activeCategoryId}
        />
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
