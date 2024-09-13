import PostCard from './PostCard';
import PostCategoryTab from './PostCategoryTab';

const PostList = () => {
  return (
    <div className="flex w-full flex-wrap gap-6">
      <PostCategoryTab />
      <PostCard
        id={''}
        title={''}
        category={''}
        content={''}
        created_at={''}
        preview_img_url={''}
      />
      <PostCard
        id={''}
        title={''}
        category={''}
        content={''}
        created_at={''}
        preview_img_url={''}
      />
      <PostCard
        id={''}
        title={''}
        category={''}
        content={''}
        created_at={''}
        preview_img_url={''}
      />
      <PostCard
        id={''}
        title={''}
        category={''}
        content={''}
        created_at={''}
        preview_img_url={''}
      />
      <PostCard
        id={''}
        title={''}
        category={''}
        content={''}
        created_at={''}
        preview_img_url={''}
      />
    </div>
  );
};

export default PostList;
